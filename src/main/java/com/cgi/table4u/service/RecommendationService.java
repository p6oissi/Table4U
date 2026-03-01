package com.cgi.table4u.service;

import com.cgi.table4u.dto.TableRecommendationResponse;
import com.cgi.table4u.model.RestaurantTable;
import com.cgi.table4u.repository.ReservationRepository;
import com.cgi.table4u.repository.TableRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class RecommendationService {

    public static final int PREFERENCE_BONUS = 3;

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public RecommendationService(TableRepository tableRepository, ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    /**
     * Tagastab kõik lauad koos soovituse skooriga.
     * Saadaval olevad lauad saavad skoori vastavalt suuruse sobivusele ja eelistustele.
     * Parim vaste on kõrgeima skooriga laud.
     */
    public List<TableRecommendationResponse> getRecommendedTables(
            LocalDate date,
            LocalTime time,
            int partySize,
            String zone,
            boolean window,
            boolean privateArea,
            boolean childFriendly
    ) {
        LocalTime endTime = time.plusHours(2);
        List<UUID> occupiedIds = reservationRepository.findOccupiedTableIds(
                date,
                time,
                endTime
        );
        List<RestaurantTable> allTables = tableRepository.findAll();

        List<ScoredTable> scored = allTables.stream()
                .map(table -> {
                    String status = determineStatus(
                            table,
                            occupiedIds,
                            partySize,
                            zone
                    );
                    int score = "AVAILABLE".equals(status) ?
                            calculateScore(
                                    table,
                                    partySize,
                                    window,
                                    privateArea,
                                    childFriendly) : 0;

                    return new ScoredTable(table, status, score);
                })
                .toList();

        int maxScore = scored.stream()
                .filter(s -> "AVAILABLE".equals(s.status()))
                .mapToInt(ScoredTable::score)
                .max()
                .orElse(Integer.MIN_VALUE);

        boolean hasAvailable = maxScore != Integer.MIN_VALUE;

        return scored.stream()
                .map(s -> new TableRecommendationResponse(
                        s.table(),
                        s.status(),
                        s.score(),
                        hasAvailable &&
                                "AVAILABLE".equals(s.status()) &&
                                s.score() == maxScore
                ))
                .toList();
    }

    /**
     * Arvutab laua soovituse skoori.
     * Skoor = eelistuste boonus - vale suuruse karistus.
     */
    private int calculateScore(RestaurantTable table,
                               int partySize,
                               boolean window,
                               boolean privateArea,
                               boolean childFriendly
    ) {
        int sizePenalty = table.getCapacity() - partySize;
        int preferenceBonus = 0;

        if (window && table.isWindowSeat()) preferenceBonus += PREFERENCE_BONUS;
        if (privateArea && table.isPrivateArea()) preferenceBonus += PREFERENCE_BONUS;
        if (childFriendly && table.isChildFriendly()) preferenceBonus += PREFERENCE_BONUS;

        return preferenceBonus - sizePenalty;
    }

    private String determineStatus(RestaurantTable table,
                                         List<UUID> occupiedIds,
                                         int partySize,
                                         String zone
    ) {
        boolean matchesZone = zone == null
                || zone.isEmpty()
                || table.getZone().name().equals(zone);

        boolean matchesSize = table.getCapacity() >= partySize;

        if (!matchesSize || !matchesZone) return "FILTERED_OUT";
        if (occupiedIds.contains(table.getId())) return "OCCUPIED";
        return "AVAILABLE";
    }

    private record ScoredTable(RestaurantTable table, String status, int score) {}
}

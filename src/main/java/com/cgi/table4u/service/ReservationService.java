package com.cgi.table4u.service;

import com.cgi.table4u.dto.ReservationRequest;
import com.cgi.table4u.dto.ReservationResponse;
import com.cgi.table4u.exception.BookingException;
import com.cgi.table4u.model.Reservation;
import com.cgi.table4u.model.RestaurantTable;
import com.cgi.table4u.repository.ReservationRepository;
import com.cgi.table4u.repository.TableRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ReservationService {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public ReservationService(TableRepository tableRepository, ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    /**
     * Broneerib laua vastavalt kliendi soovile.
     * Kontrollib, et laud oleks olemas, mahutaks seltskonna ja poleks valitud ajal juba broneeritud.
     * Broneering kestab alati 2 tundi alates algusajast.
     *
     * @param request broneeringu andmed (laua ID, kuupäev, kellaaeg, seltskonna suurus, kliendi andmed)
     * @return broneeringu andmed
     * @throws BookingException kui laud puudub, seltskond ei mahu lauda või valitud aeg on hõivatud
     */
    public ReservationResponse book(ReservationRequest request) {
        RestaurantTable table = tableRepository.findById(request.tableId())
                .orElseThrow(() -> new BookingException("Table not found."));

        if (table.getCapacity() < request.partySize()) {
            throw new BookingException("Party size exceeds table capacity.");
        }

        LocalTime endTime = request.startTime().plusHours(2);

        List<UUID> occupiedIds = reservationRepository.findOccupiedTableIds(
                request.date(),
                request.startTime(),
                endTime
        );

        if (occupiedIds.contains(request.tableId())){
            throw new BookingException("Table is already reserved at this time.");
        }

        Reservation reservation = reservationRepository.save(new Reservation(
                table,
                request.customerName(),
                request.customerEmail(),
                request.date(),
                request.startTime(),
                endTime,
                request.partySize()
        ));

        return new ReservationResponse(
                reservation.getId(),
                table.getId(),
                table.getTableNumber(),
                table.getZone().name(),
                reservation.getCustomerName(),
                reservation.getCustomerEmail(),
                reservation.getDate(),
                reservation.getStartTime(),
                reservation.getEndTime(),
                reservation.getPartySize()
        );
    }
}

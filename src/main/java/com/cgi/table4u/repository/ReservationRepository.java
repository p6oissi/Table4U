package com.cgi.table4u.repository;

import com.cgi.table4u.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface ReservationRepository extends JpaRepository<Reservation, UUID> {

    /**
     * Tagastab kõigi laudade ID-d, mis on antud kuupäeval ja ajavahemikus hõivatud.
     * Kaks ajavahemikku kattuvad, kui esimene algab enne teise lõppu JA lõpeb pärast teise algust.
     * Välistab nii täieliku kui ka osalise kattumise.
     *
     * @param date       broneeringu kuupäev
     * @param startTime  soovitud algusaeg
     * @param endTime    soovitud lõpuaeg (tavaliselt algusaeg + 2 tundi)
     * @return hõivatud laudade ID-de list
     */
    @Query("SELECT r.table.id " +
            "FROM Reservation r " +
            "WHERE r.date = :date " +
            "AND r.startTime < :endTime " +
            "AND r.endTime > :startTime")
    List<UUID> findOccupiedTableIds(@Param("date") LocalDate date,
                                    @Param("startTime") LocalTime startTime,
                                    @Param("endTime") LocalTime endTime);
}

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

    @Query("SELECT r.table.id " +
            "FROM Reservation r " +
            "WHERE r.date = :date " +
            "AND r.startTime < :endTime " +
            "AND r.endTime > :startTime")
    List<UUID> findOccupiedTableIds(@Param("date") LocalDate date,
                                    @Param("startTime") LocalTime startTime,
                                    @Param("endTime") LocalTime endTime);
}

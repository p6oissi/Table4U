package com.cgi.table4u.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record ReservationResponse(
        UUID id,
        UUID tableId,
        int tableNumber,
        String zone,
        String customerName,
        String customerEmail,
        LocalDate date,
        LocalTime startTime,
        LocalTime endTime,
        int partySize
) {}

package com.cgi.table4u.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record ReservationRequest(
        UUID tableId,
        String customerName,
        String customerEmail,
        LocalDate date,
        LocalTime startTime,
        int partySize
) {}

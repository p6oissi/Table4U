package com.cgi.table4u.controller;

import com.cgi.table4u.dto.ReservationRequest;
import com.cgi.table4u.dto.ReservationResponse;
import com.cgi.table4u.service.EmailService;
import com.cgi.table4u.service.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private static final Logger log = LoggerFactory.getLogger(ReservationController.class);

    private final ReservationService reservationService;
    private final EmailService emailService;

    public ReservationController(ReservationService reservationService,
                                 EmailService emailService) {
        this.reservationService = reservationService;
        this.emailService = emailService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReservationResponse book(@RequestBody ReservationRequest request) {
        ReservationResponse response = reservationService.book(request);

        try {
            emailService.sendBookingConfirmation(response);
        } catch (MailException e) {
            log.warn("Failed to send confirmation email for reservation {}: {}", response.id(), e.getMessage());
        }

        return response;
    }
}

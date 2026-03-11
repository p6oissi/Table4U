package com.cgi.table4u.controller;

import com.cgi.table4u.dto.ReservationRequest;
import com.cgi.table4u.dto.ReservationResponse;
import com.cgi.table4u.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReservationResponse book(@RequestBody ReservationRequest request){
        return reservationService.book(request);
    }
}

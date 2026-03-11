package com.cgi.table4u.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BookingException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleBookingException(BookingException ex) {
        return Map.of("error", ex.getMessage());
    }
}
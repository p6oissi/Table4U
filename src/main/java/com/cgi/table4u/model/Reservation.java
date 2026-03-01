package com.cgi.table4u.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "table_id")
    private RestaurantTable table;

    private String customerName;
    private String customerEmail;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private int partySize;

    public Reservation() {
    }

    public Reservation(RestaurantTable table, String customerName, String customerEmail, LocalDate date, LocalTime startTime, LocalTime endTime, int partySize) {
        this.table = table;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.partySize = partySize;
    }

    public UUID getId() {
        return id;
    }

    public RestaurantTable getTable() {
        return table;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public int getPartySize() {
        return partySize;
    }
}

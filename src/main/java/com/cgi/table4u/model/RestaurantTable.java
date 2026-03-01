package com.cgi.table4u.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private int tableNumber;
    private int capacity;

    @Enumerated(EnumType.STRING)
    private Zone zone;

    private int positionX;
    private int positionY;

    private boolean windowSeat;
    private boolean privateArea;
    private boolean childFriendly;

    public RestaurantTable() {
    }

    public RestaurantTable(int tableNumber,
                           int capacity,
                           Zone zone,
                           int positionX,
                           int positionY,
                           boolean windowSeat,
                           boolean privateArea,
                           boolean childFriendly) {
        this.tableNumber = tableNumber;
        this.capacity = capacity;
        this.zone = zone;
        this.positionX = positionX;
        this.positionY = positionY;
        this.windowSeat = windowSeat;
        this.privateArea = privateArea;
        this.childFriendly = childFriendly;
    }

    public UUID getId() {
        return id;
    }

    public int getTableNumber() {
        return tableNumber;
    }

    public int getCapacity() {
        return capacity;
    }

    public Zone getZone() {
        return zone;
    }

    public int getPositionX() {
        return positionX;
    }

    public int getPositionY() {
        return positionY;
    }

    public boolean isWindowSeat() {
        return windowSeat;
    }

    public boolean isPrivateArea() {
        return privateArea;
    }

    public boolean isChildFriendly() {
        return childFriendly;
    }
}

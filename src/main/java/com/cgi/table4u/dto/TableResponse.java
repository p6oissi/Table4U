package com.cgi.table4u.dto;

import com.cgi.table4u.model.RestaurantTable;
import com.cgi.table4u.model.Zone;

import java.util.UUID;

public record TableResponse(
        UUID id,
        int tableNumber,
        int capacity,
        Zone zone,
        int positionX,
        int positionY,
        boolean windowSeat,
        boolean privateArea,
        boolean childFriendly
) {
    public TableResponse(RestaurantTable table) {
        this(
                table.getId(),
                table.getTableNumber(),
                table.getCapacity(),
                table.getZone(),
                table.getPositionX(),
                table.getPositionY(),
                table.isWindowSeat(),
                table.isPrivateArea(),
                table.isChildFriendly()
        );
    }
}

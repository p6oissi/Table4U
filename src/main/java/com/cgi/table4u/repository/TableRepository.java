package com.cgi.table4u.repository;

import com.cgi.table4u.model.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TableRepository extends JpaRepository<RestaurantTable, UUID> {
}

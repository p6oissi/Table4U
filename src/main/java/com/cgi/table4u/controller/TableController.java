package com.cgi.table4u.controller;

import com.cgi.table4u.dto.TableResponse;
import com.cgi.table4u.model.Zone;
import com.cgi.table4u.service.TableService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class TableController {

    private final TableService tableService;

    public TableController(TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping
    public List<TableResponse> getAllTables(){
        return tableService.getAllTables();
    }

    @GetMapping("/zones")
    public Zone[] getZones(){
        return Zone.values();
    }

}

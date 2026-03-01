package com.cgi.table4u.controller;

import com.cgi.table4u.dto.TableRecommendationResponse;
import com.cgi.table4u.model.Zone;
import com.cgi.table4u.service.RecommendationService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class TableController {

    private final RecommendationService recommendationService;

    public TableController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/zones")
    public Zone[] getZones(){
        return Zone.values();
    }

    @GetMapping("/recommended")
    public List<TableRecommendationResponse> getRecommendedTables(
            @RequestParam LocalDate date,
            @RequestParam LocalTime time,
            @RequestParam int partySize,
            @RequestParam(required = false, defaultValue = "") String zone,
            @RequestParam(required = false, defaultValue = "false") boolean window,
            @RequestParam(required = false, defaultValue = "false") boolean privateArea,
            @RequestParam(required = false, defaultValue = "false") boolean childFriendly)
    {
        return recommendationService.getRecommendedTables(
                date,
                time,
                partySize,
                zone,
                window,
                privateArea,
                childFriendly);
    }
}

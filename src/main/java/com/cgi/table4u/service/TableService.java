package com.cgi.table4u.service;

import com.cgi.table4u.dto.TableResponse;
import com.cgi.table4u.repository.TableRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TableService {

    private final TableRepository tableRepository;

    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public List<TableResponse> getAllTables() {
        return tableRepository.findAll().stream()
                .map(TableResponse::new)
                .toList();
    }
}

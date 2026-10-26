package com.CampusColab.ExceptionHandler;

import com.CampusColab.DTO.DTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<DTO.ApiResponse> handleAppException(
            AppException ex) {

        return ResponseEntity
                .status(ex.getStatus())
                .body(new DTO.ApiResponse(ex.getMessage()));
    }
}

package com.CampusColab.ExceptionHandler;

import com.CampusColab.DTO.DTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(AppException.class)
    public ResponseEntity<DTO.ApiResponse> handleAppException(
            AppException ex) {

        if (ex.getStatus().is5xxServerError()) {
            log.error("Application error: {}", ex.getMessage(), ex);
        } else {
            log.warn("Request rejected: {}", ex.getMessage());
        }

        return ResponseEntity
                .status(ex.getStatus())
                .body(new DTO.ApiResponse(ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<DTO.ApiResponse> handleUnexpectedException(Exception ex) {
        log.error("Unhandled request exception", ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DTO.ApiResponse("An unexpected error occurred"));
    }
}

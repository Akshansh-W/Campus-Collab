package com.CampusColab.Repository;

import com.CampusColab.Model.Student;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByStudentEmail(String email);
    Student findByRollNumber(Long rollNumber);
}
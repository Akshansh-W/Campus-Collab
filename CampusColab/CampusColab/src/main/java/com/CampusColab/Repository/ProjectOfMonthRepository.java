package com.CampusColab.Repository;

import com.CampusColab.Model.ProjectOfMonth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectOfMonthRepository extends JpaRepository<ProjectOfMonth, Integer> {
    Optional<ProjectOfMonth> findTopByOrderBySelectedAtDesc();
}

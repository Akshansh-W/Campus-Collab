package com.CampusColab.Repository;

import com.CampusColab.Model.Project;
import com.CampusColab.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Project findByProjectId(int projectId);
    List<Project> findByAdmin(Student admin);
    @Query(value = """
    SELECT * FROM project p 
    WHERE p.created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') 
      AND p.created_at < DATE_TRUNC('month', CURRENT_DATE)
    """, nativeQuery = true)
    List<Project> findProjectsInsertedInPreviousMonth();
}

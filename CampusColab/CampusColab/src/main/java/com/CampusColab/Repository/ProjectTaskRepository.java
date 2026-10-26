package com.CampusColab.Repository;

import com.CampusColab.Model.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectTaskRepository extends JpaRepository<ProjectTask,Integer> {
    List<ProjectTask> findByProject_ProjectId(int projectId);
    List<ProjectTask> findByAssignedTo_RollNumber(long rollNumber);
    void deleteByProject_ProjectId(int projectId);
}

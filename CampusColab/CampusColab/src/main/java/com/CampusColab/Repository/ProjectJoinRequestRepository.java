package com.CampusColab.Repository;

import com.CampusColab.Model.Project;
import com.CampusColab.Model.ProjectJoinRequest;
import com.CampusColab.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectJoinRequestRepository extends JpaRepository<ProjectJoinRequest, Integer> {
    boolean existsByProjectAndStudentAndAppliedRole(Project project, Student student, String appliedRole);
    List<ProjectJoinRequest> findByProject_ProjectId(int projectId);
}

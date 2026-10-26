package com.CampusColab.Model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectId;
    private String projectName;
    @Column(columnDefinition = "TEXT")
    private String overview;
    @Column(columnDefinition = "TEXT")
    private String requirements;
    @Column(columnDefinition = "TEXT")
    private String techStack;
    private String status;
    private LocalDate created_at;

    @ElementCollection
    @CollectionTable(name = "project_ratings_submitted", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "student_roll_number")
    private Set<Long> ratingsSubmitted = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adminRollNo" , referencedColumnName =  "rollNumber")
    @JsonIgnoreProperties({"project", "activeProjects"})
    private Student admin;

    // Getters and Setters

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getOverview() {
        return overview;
    }

    public LocalDate getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDate created_at) {
        this.created_at = created_at;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public Student getAdmin() {
        return admin;
    }

    public void setAdmin(Student admin) {
        this.admin = admin;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getTechStack() {
        return techStack;
    }

    public void setTechStack(String techStack) {
        this.techStack = techStack;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<Long> getRatingsSubmitted() {
        return ratingsSubmitted;
    }

    public void setRatingsSubmitted(Set<Long> ratingsSubmitted) {
        this.ratingsSubmitted = ratingsSubmitted == null ? new HashSet<>() : ratingsSubmitted;
    }

    public boolean hasRatingFrom(long studentRollNumber) {
        return ratingsSubmitted.contains(studentRollNumber);
    }

    public void markRatingSubmitted(long studentRollNumber) {
        ratingsSubmitted.add(studentRollNumber);
    }}

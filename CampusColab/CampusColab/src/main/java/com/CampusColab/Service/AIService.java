package com.CampusColab.Service;

import com.CampusColab.Model.Project;
import com.CampusColab.Model.ProjectOfMonth;
import com.CampusColab.Model.Student;
import com.CampusColab.Repository.ProjectOfMonthRepository;
import com.CampusColab.Repository.ProjectRepository;
import com.CampusColab.Repository.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.Arrays;
import java.util.List;


@Service
public class AIService {

    private final Client client;
    private final StudentRepository studentRepository;
    private final ProjectRepository projectRepository;
    private final ProjectTaskService taskService;
    private final ObjectMapper objectMapper;
    private final ProjectOfMonthRepository monthRepository;

    public AIService(@Value("${gemini.api.key}") String api, StudentRepository sRepository,
                     ProjectRepository projectRepository, ProjectTaskService taskService,
                     ObjectMapper objectMapper, ProjectOfMonthRepository monthRepository){

        this.client = Client.builder().apiKey(api).build();
        studentRepository = sRepository;
        this.projectRepository = projectRepository;
        this.taskService = taskService;
        this.objectMapper = objectMapper;
        this.monthRepository = monthRepository;
    }


    public String generateOverview(String projectName, String techStack, String requirements){

        String prompt = """
                You are an AI assistant for a student collaboration platform.
                Generate a professional project overview based ONLY on the
                information provided below.
                Project Name:
                %s
                Technical Tags:
                %s
                Requirements:
                %s
                Rules:
                - Write around 100-150 words.
                - Explain what the project does.
                - Explain its main purpose.
                - Keep the language simple and professional.
                - Do not invent features that are not mentioned.
                - Return ONLY the project overview.
                """.formatted(projectName,techStack,requirements);

        GenerateContentResponse response = client.models.generateContent("gemini-3.5-flash",prompt,null);
        return response.text();
    }

    public int[] getRecommendedProjects(List<Project> projects, long rollNumber){
        StringBuilder projectData = new StringBuilder();
        for(Project project : projects){
            projectData.append(project.getProjectId())
                    .append(" : ")
                    .append(project.getTechStack())
                    .append(" , ");
        }
        Student student = studentRepository.findByRollNumber(rollNumber);

        String prompt =
                """
                    You are a project recommendation system which return the projectId of the projects with
                    matches the student Technical Interests, some projects are given below
                    Project description :
                    %s
                    Student TechStack :
                    %s
                    Give the response in only project id, for example :
                    response = 101,122,123
                    """.formatted(projectData,student.getTechnicalInterest());

        GenerateContentResponse response = client.models.generateContent("gemini-3.7-flash",prompt,null);


            return Arrays.stream(response.text().split(","))
                    .mapToInt(Integer::parseInt)
                    .toArray();
    }

    public String getBestProject(){
        List<Project> projects = projectRepository.findProjectsInsertedInPreviousMonth();
        String prompt = """
                Act as an expert Judge, you have the projectId, it's completed task and 
                the idea of the project. You have to give only 1 projectId from the following 
                project data. Give the response as 
                {"projectId" : "12",
                "reason" : "",
                }
                Below is the project data : 
                
                """;

        for(Project project : projects){
            prompt += project.getProjectId() + " "
                    + taskService.getCompletedTasks(project.getProjectId()) + " "
                    + project.getOverview() + "\n";
        }

        GenerateContentResponse response = client.models.generateContent("gemini-3.7-flash",prompt,null);
        return response.text();

    }

    public record AIProjectSelection(
            int projectId,
            String reason
    ) {}

    @Scheduled(cron = "0 0 0 1 * *")
    @Transactional
    public void selectProjectOfMonth() {
        try {
            // 1. Ask Gemini to select the best project
            String aiResponse = getBestProject();

            // 2. Convert Gemini JSON → Java object
            AIProjectSelection selection =
                    objectMapper.readValue(
                            aiResponse,
                            AIProjectSelection.class
                    );

            // 3. Find selected project
            Project project =
                    projectRepository.findByProjectId(
                            selection.projectId()
                    );

            if (project == null) {
                return;
            }

            // 4. Create ProjectOfMonth record
            ProjectOfMonth projectOfMonth =
                    new ProjectOfMonth();

            projectOfMonth.setProject(project);
            projectOfMonth.setReason(selection.reason());
            projectOfMonth.setMonth(LocalDate.now().getMonthValue());
            projectOfMonth.setYear(LocalDate.now().getYear());
            projectOfMonth.setSelectedAt(LocalDateTime.now());

            // 5. Save it
            monthRepository.save(projectOfMonth);

        } catch (Exception e) {

            e.printStackTrace();

            System.out.println(
                    "Failed to select Project of the Month"
            );
        }
    }

}

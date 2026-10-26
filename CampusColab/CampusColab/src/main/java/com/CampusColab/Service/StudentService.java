package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.Student;
import com.CampusColab.Repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtServices jwtServices;

    // Constructor Injection
    public StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder, JwtServices jwtServices){
        this.passwordEncoder = passwordEncoder;
        this.studentRepository=studentRepository;
        this.jwtServices = jwtServices;
    }

    public DTO.ResponseWithToken storeStudentInDb(Student student) {
        String password = student.getStudentPassword();
        //String hashPassword = passwordEncoder.encode(password);
        //student.setStudentPassword(hashPassword);
        Student savedStudent = studentRepository.save(student);

        //savedStudent.setStudentPassword(password);
        String token = jwtServices.generateJwt(student.getStudentEmail(),student.getRollNumber());
        return new DTO.ResponseWithToken(token,savedStudent);
    }

    public Student findStudent(String email) {
        return studentRepository.findByStudentEmail(email);
    }
    public Student findStudent(long rollNumber) {return studentRepository.findByRollNumber(rollNumber);}
    public void saveStudent(Student student){
        try{
            studentRepository.save(student);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

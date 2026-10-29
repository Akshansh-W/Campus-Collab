package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.Student;
import com.CampusColab.Repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class StudentService {

    private static final Logger log = LoggerFactory.getLogger(StudentService.class);

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
        log.info("Created student record");
        return new DTO.ResponseWithToken(token,savedStudent);
    }

    public Student findStudent(String email) {
        Student student = studentRepository.findByStudentEmail(email);
        log.debug("Student email lookup completed found={}", student != null);
        return student;
    }
    public Student findStudent(long rollNumber) {
        Student student = studentRepository.findByRollNumber(rollNumber);
        log.debug("Student roll-number lookup completed found={}", student != null);
        return student;
    }
    public void saveStudent(Student student){
        studentRepository.save(student);
        log.debug("Saved student record");
    }

}

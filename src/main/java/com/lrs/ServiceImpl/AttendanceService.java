package com.lrs.ServiceImpl;

import com.lrs.Controller.Stud;
import com.lrs.Entity.Attendance;
import com.lrs.Repository.AttendanceRepository;
import com.lrs.Repository.StudRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository repository;
    private StudRepository studRepository;

    public AttendanceService(AttendanceRepository repository,
                             StudRepository studRepository) {
        this.repository = repository;
        this.studRepository = studRepository;
    }

    public Attendance save(Attendance attendance) {
        return repository.save(attendance);
    }
    public List<Attendance> bulk(List<Attendance> attendance) {
        for (Attendance data:attendance) {
            repository.save(data);
        }
        return attendance;
    }

    public Attendance update(Attendance attendance) {
        return repository.save(attendance);
    }

    public List<Attendance> getAll() {
        return repository.findAll();
    }

    public Attendance getById(Long id) {
        return repository.findById(Math.toIntExact(id)).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(Math.toIntExact(id));
    }

    public List<Attendance> getByStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public Attendance getByStudentAndDate(Long studentId, LocalDate date) {
        return repository.findByStudentIdAndAttendanceDate(studentId, date);
    }

    public List<Attendance> getByStudentAndRange(Long studentId, LocalDate from, LocalDate to) {
        return repository.findByStudentIdAndAttendanceDateBetween(studentId, from, to);
    }

    public List<Attendance> getByDate(LocalDate date) {
        return repository.findByAttendanceDate(date);
    }
    public List<Attendance> getByDateAndStudent(LocalDate date,Long classId,Long sectionId) {
        List<Attendance> attendances = repository.findAttendanceByClassSectionAndDate(Math.toIntExact(classId), Math.toIntExact(sectionId),date);
        if(attendances.isEmpty()){
          List<Stud> stud = studRepository.findByClassIdAndSectionId(Integer.parseInt(String.valueOf(classId)),Integer.parseInt(String.valueOf(sectionId)));
       if(!stud.isEmpty()){
           for (Stud data:stud) {
               Attendance attendance = new Attendance();
               attendance.setStudentId(Long.valueOf(data.getStudentId()));
               attendance.setAttendanceDate(new Date());
               attendance.setRemarks("");
               attendance.setAttendanceStatus(null);
               attendances.add(attendance);
           }

       }
        }
        return attendances;
    }

    public long countPresent(LocalDate date) {
        return repository.countPresentByDate(date);
    }

    public long countAbsent(LocalDate date) {
        return repository.countAbsentByDate(date);
    }
}
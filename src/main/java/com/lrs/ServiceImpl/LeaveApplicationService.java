package com.lrs.ServiceImpl;

import com.lrs.Entity.LeaveApplication;
import com.lrs.Repository.LeaveApplicationRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveApplicationService {

    private final LeaveApplicationRepository repository;

    public LeaveApplicationService(LeaveApplicationRepository repository) {
        this.repository = repository;
    }

    public LeaveApplication save(LeaveApplication leave) {
        return repository.save(leave);
    }

    public LeaveApplication update(LeaveApplication leave) {
        return repository.save(leave);
    }

    public List<LeaveApplication> getAll() {
        return repository.findAll();
    }

    public LeaveApplication getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<LeaveApplication> getByStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public List<LeaveApplication> getByStatus(String status) {
        return repository.findByStatus(status);
    }

    public List<LeaveApplication> getByDateRange(LocalDate start, LocalDate end) {
        return repository.findByStartDateBetween(start, end);
    }

    public List<LeaveApplication> getPendingApprovals() {
        return repository.findByApprovedByIsNull();
    }
}
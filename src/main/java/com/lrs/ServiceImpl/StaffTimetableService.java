package com.lrs.ServiceImpl;

import com.lrs.Entity.StaffTimetable;
import com.lrs.Repository.StaffTimetableRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StaffTimetableService {

    private final StaffTimetableRepository repository;

    public StaffTimetableService(StaffTimetableRepository repository) {
        this.repository = repository;
    }

    public StaffTimetable save(StaffTimetable timetable) {
        return repository.save(timetable);
    }

    public StaffTimetable update(StaffTimetable timetable) {
        return repository.save(timetable);
    }

    public List<StaffTimetable> getAll() {
        return repository.findAll();
    }

    public StaffTimetable getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public List<StaffTimetable> getByStaff(String staffId) {
        return repository.findByStaffId(staffId);
    }

    public List<StaffTimetable> getByTimetable(String timetableId) {
        return repository.findByTimetableId(timetableId);
    }

    public List<StaffTimetable> getPrimaryAssignments() {
        return repository.findByIsPrimaryTeacherTrue();
    }

    public List<StaffTimetable> getByStatus(String status) {
        return repository.findByStatus(status);
    }
}
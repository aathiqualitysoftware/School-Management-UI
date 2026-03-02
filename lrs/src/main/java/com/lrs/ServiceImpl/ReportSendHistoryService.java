package com.lrs.ServiceImpl;

import com.lrs.Entity.ReportSendHistory;
import com.lrs.Repository.ReportSendHistoryRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportSendHistoryService {

    private final ReportSendHistoryRepository repository;

    public ReportSendHistoryService(ReportSendHistoryRepository repository) {
        this.repository = repository;
    }

    public ReportSendHistory save(ReportSendHistory history) {
        history.setSentDate(LocalDateTime.now());
        return repository.save(history);
    }

    public ReportSendHistory update(ReportSendHistory history) {
        return repository.save(history);
    }

    public List<ReportSendHistory> getAll() {
        return repository.findAll();
    }

    public ReportSendHistory getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public List<ReportSendHistory> getByStudent(Integer studentId) {
        return repository.findByStudentId(studentId);
    }

    public List<ReportSendHistory> getByAcademicYear(Integer yearId) {
        return repository.findByAcademicYearId(yearId);
    }

    public List<ReportSendHistory> getByClassAndSection(Integer classId, Integer sectionId) {
        return repository.findByClassIdAndSectionId(classId, sectionId);
    }

    public List<ReportSendHistory> getByReportPeriod(String period) {
        return repository.findByReportPeriod(period);
    }

    public List<ReportSendHistory> getByDateRange(LocalDateTime start, LocalDateTime end) {
        return repository.findBySentDateBetween(start, end);
    }

    public List<ReportSendHistory> getByQuarter(Integer quarterId) {
        return repository.findByQuarterId(quarterId);
    }
}
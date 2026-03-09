package com.lrs.ServiceImpl;

import com.lrs.Entity.ExamResult;
import com.lrs.Repository.ExamResultRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ExamResultService {

    private final ExamResultRepository repository;

    public ExamResultService(ExamResultRepository repository) {
        this.repository = repository;
    }

    public ExamResult save(ExamResult result) {
        result.setCreatedAt(LocalDate.now());
        return repository.save(result);
    }

    public ExamResult update(ExamResult result) {
        result.setUpdatedAt(LocalDate.now());
        return repository.save(result);
    }

    public List<ExamResult> getAll() {
        return repository.findAll();
    }

    public ExamResult getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<ExamResult> getByExam(Long examId) {
        return repository.findByExamId(examId);
    }

    public List<ExamResult> getByStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public ExamResult getByExamAndStudent(Long examId, Long studentId) {
        return repository.findByExamIdAndStudentId(examId, studentId);
    }

    public List<ExamResult> getByGrade(Long gradeId) {
        return repository.findByGradeId(gradeId);
    }
}
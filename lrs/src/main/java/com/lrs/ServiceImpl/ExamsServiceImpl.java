package com.lrs.ServiceImpl;

import com.lrs.Dto.ExamTypesUpdate;
import com.lrs.Dto.ExamsUpdate;
import com.lrs.Entity.ExamType;
import com.lrs.Entity.Exams;
import com.lrs.Entity.MaritalStatus;
import com.lrs.Repository.ExamRepository;
import com.lrs.Repository.ExamTypesRepository;
import com.lrs.Service.ExamTypesService;
import com.lrs.Service.ExamsService;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ExamsServiceImpl implements ExamsService {

    ExamRepository examRepository;

    @Autowired
    public ExamsServiceImpl(ExamRepository examRepository){

        this.examRepository = examRepository;
    }

    @Override
    public Exams insertExams(Exams exams) throws ServiceException {
        exams.setId(null);
        examRepository.save(exams);
        return exams;
    }

    @Override
    public Exams isExist(Long id) throws ServiceException {
       Optional<Exams> exam = examRepository.findById(id);
       if(exam.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0026);
       }
        return exam.get();
    }

    @Override
    public Exams examUpdate(Exams examsExist, ExamsUpdate examUpdate) throws ServiceException {
        examsExist.setUniqueExamCode(examUpdate.getUniqueExamCode());
        return examRepository.save(examsExist);
    }

    @Override
    public void examDelete(Long id) throws ServiceException {
        examRepository.deleteById(id);
    }

    @Override
    public List<Exams> getExams() throws ServiceException {
        List<Exams> exams = examRepository.findAll();
        if(exams.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0026);
        }
        return exams;
    }
    public Exams getByUniqueExamCode(String code) {
        return examRepository.findByUniqueExamCode(code);
    }

    public List<Exams> getByAcademicYear(Long yearId) {
        return examRepository.findByAcademicYearId(yearId);
    }

    public List<Exams> getByExamType(Long typeId) {
        return examRepository.findByExamTypeId(typeId);
    }

    public List<Exams> getByClassSubject(Long subjectId) {
        return examRepository.findByClassSubjectId(subjectId);
    }

    public List<Exams> getByDateRange(LocalDate start, LocalDate end) {
        return examRepository.findByStartDateBetween(start, end);
    }
    public Exams save(Exams status) {
        return examRepository.save(status);
    }

    public Exams update(Exams status) {
        return examRepository.save(status);
    }
    public void delete(Long id) {
        examRepository.deleteById(id);
    }
    public List<Exams> getAll() {
        return examRepository.findAll();
    }

    public Exams getById(Long id) {
        return examRepository.findById(id).orElse(null);
    }

}

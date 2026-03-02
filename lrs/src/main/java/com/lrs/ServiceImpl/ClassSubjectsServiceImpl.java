package com.lrs.ServiceImpl;

import com.lrs.Dto.ClassSubjectsUpdate;
import com.lrs.Dto.ExamsUpdate;
import com.lrs.Entity.ClassSubjects;
import com.lrs.Entity.Exams;
import com.lrs.Repository.ClassSubjectsRepository;
import com.lrs.Repository.ExamRepository;
import com.lrs.Service.ClassSubjectsService;
import com.lrs.Service.ExamsService;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ClassSubjectsServiceImpl implements ClassSubjectsService {

    ClassSubjectsRepository classSubjectsRepository;

    @Autowired
    public ClassSubjectsServiceImpl(ClassSubjectsRepository classSubjectsRepository){

        this.classSubjectsRepository = classSubjectsRepository;
    }

    @Override
    public ClassSubjects insertClassSubjects(ClassSubjects classSubjects) throws ServiceException {
        classSubjects.setId(null);
        classSubjectsRepository.save(classSubjects);
        return classSubjects;
    }

    @Override
    public ClassSubjects isExist(Long id) throws ServiceException {
       Optional<ClassSubjects> classSubjects = classSubjectsRepository.findById(id);
       if(classSubjects.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0030);
       }
        return classSubjects.get();
    }

    @Override
    public ClassSubjects classSubjectsUpdate(ClassSubjects classSubjectsExist, ClassSubjectsUpdate classSubjectsUpdate) throws ServiceException {
        classSubjectsExist.setStaffId(classSubjectsUpdate.getStaffId());
        return classSubjectsRepository.save(classSubjectsExist);
    }

    @Override
    public void classSubjectsDelete(Long id) throws ServiceException {
        classSubjectsRepository.deleteById(id);
    }

    @Override
    public List<ClassSubjects> getClassSubjects() throws ServiceException {
        List<ClassSubjects> classSubjects = classSubjectsRepository.findAll();
        if(classSubjects.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0030);
        }
        return classSubjects;
    }
}

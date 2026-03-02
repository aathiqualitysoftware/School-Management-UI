package com.lrs.ServiceImpl;

import com.lrs.Dto.ExamTypesUpdate;
import com.lrs.Dto.GradeInfoUpdate;
import com.lrs.Entity.ExamType;
import com.lrs.Entity.GradeInfo;
import com.lrs.Repository.ExamTypesRepository;
import com.lrs.Repository.GradeInfoRepository;
import com.lrs.Service.ExamTypesService;
import com.lrs.Service.GradeInfoService;
import com.lrs.Util.SecurityUtils;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ExamTpesServiceImpl implements ExamTypesService {

    ExamTypesRepository examTypesRepository;

    @Autowired
    public ExamTpesServiceImpl(ExamTypesRepository examTypesRepository){

        this.examTypesRepository = examTypesRepository;
    }

    @Override
    public ExamType insertExamType(ExamType examType) throws ServiceException {
        examType.setId(null);
        examTypesRepository.save(examType);
        return examType;
    }

    @Override
    public ExamType isExist(Long id) throws ServiceException {
       Optional<ExamType> examType = examTypesRepository.findById(id);
       if(examType.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0025);
       }
        return examType.get();
    }

    @Override
    public ExamType examTypeUpdate(ExamType examTypeExist, ExamTypesUpdate examTypeUpdate) throws ServiceException {
        examTypeExist.setName(examTypeUpdate.getName());
        return examTypesRepository.save(examTypeExist);
    }

    @Override
    public void examTypeDelete(Long id) throws ServiceException {
        examTypesRepository.deleteById(id);
    }

    @Override
    public List<ExamType> getExamType() throws ServiceException {
        List<ExamType> examTypes = examTypesRepository.findAll();
        if(examTypes.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0025);
        }
        return examTypes;
    }
    public ExamType getByName(String name) {
        return examTypesRepository.findByName(name);
    }

}

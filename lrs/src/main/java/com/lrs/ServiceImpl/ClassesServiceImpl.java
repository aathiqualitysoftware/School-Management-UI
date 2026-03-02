package com.lrs.ServiceImpl;

import com.lrs.Dto.ClassesUpdate;
import com.lrs.Entity.Classes;
import com.lrs.Repository.ClassesRepository;
import com.lrs.Service.ClassesService;
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
public class ClassesServiceImpl implements ClassesService {

    ClassesRepository classesRepository;

    @Autowired
    public ClassesServiceImpl(ClassesRepository classesRepository){

        this.classesRepository = classesRepository;
    }

    @Override
    public Classes insertClasses(Classes classes) throws ServiceException {
        classes.setId(null);
        classesRepository.save(classes);
        return classes;
    }

    @Override
    public Classes isExist(Long id) throws ServiceException {
       Optional<Classes> Classes = classesRepository.findById(id);
       if(Classes.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0032);
       }
        return Classes.get();
    }

    @Override
    public Classes ClassesUpdate(Classes classesExist, ClassesUpdate classesUpdate) throws ServiceException {
        classesExist.setIsActive(classesUpdate.getIsActive());
        // if you want update extra field add here
        return classesRepository.save(classesExist);
    }

    @Override
    public void ClassesDelete(Long id) throws ServiceException {
        classesRepository.deleteById(id);
    }

    @Override
    public List<Classes> getClasses() throws ServiceException {
        List<Classes> classes = classesRepository.findAll();
        if(classes.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0032);
        }
        return classes;
    }
}

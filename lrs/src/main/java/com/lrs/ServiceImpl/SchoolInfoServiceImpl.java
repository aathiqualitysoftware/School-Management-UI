package com.lrs.ServiceImpl;

import com.lrs.Entity.Roles;
import com.lrs.Entity.SchoolInfo;
import com.lrs.Repository.RolesRepository;
import com.lrs.Repository.SchoolInfoRepository;
import com.lrs.Service.RolesService;
import com.lrs.Service.SchoolInfoService;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
public class SchoolInfoServiceImpl implements SchoolInfoService {

    SchoolInfoRepository repository;
    @Autowired
    public SchoolInfoServiceImpl(SchoolInfoRepository repository){
        this.repository = repository;
    }

    @Override
    public List<SchoolInfo> getSchoolInfo() throws ServiceException {
        List<SchoolInfo> schoolInfos = repository.findAll();
        if(schoolInfos.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0023);
        }
        return schoolInfos;
    }
    public SchoolInfo save(SchoolInfo info) {
        info.setCreatedAt(LocalDate.now());
        return repository.save(info);
    }

    public SchoolInfo update(SchoolInfo info) {
        info.setUpdatedAt(LocalDate.now());
        return repository.save(info);
    }

    public List<SchoolInfo> getAll() {
        return repository.findAll();
    }

    public SchoolInfo getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public SchoolInfo getBySchoolName(String name) {
        return repository.findBySchoolName(name);
    }

    public SchoolInfo getByEmail(String email) {
        return repository.findByEmailId(email);
    }

    public SchoolInfo getByPhone(String phone) {
        return repository.findByPhoneNumber(phone);
    }

}

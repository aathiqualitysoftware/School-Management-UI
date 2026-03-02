package com.lrs.ServiceImpl;

import com.lrs.Entity.PreviousAcademicInfo;
import com.lrs.Repository.PreviousAcademicInfoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PreviousAcademicInfoService {

    private final PreviousAcademicInfoRepository repository;

    public PreviousAcademicInfoService(PreviousAcademicInfoRepository repository) {
        this.repository = repository;
    }

    public PreviousAcademicInfo save(PreviousAcademicInfo info) {
        return repository.save(info);
    }

    public PreviousAcademicInfo update(PreviousAcademicInfo info) {
        return repository.save(info);
    }

    public List<PreviousAcademicInfo> getAll() {
        return repository.findAll();
    }

    public PreviousAcademicInfo getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public List<PreviousAcademicInfo> getByLastAttendedClass(String className) {
        return repository.findByLastAttendedClass(className);
    }

    public List<PreviousAcademicInfo> getByPreviousSchool(String schoolName) {
        return repository.findByPreviousSchoolName(schoolName);
    }

    public PreviousAcademicInfo getByCertificateNumber(String certificateNumber) {
        return repository.findByTransferCertificateNumber(certificateNumber);
    }
}
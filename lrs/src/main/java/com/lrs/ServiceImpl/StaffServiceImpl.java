package com.lrs.ServiceImpl;

import com.lrs.Dto.StaffDetailsProjection;
import com.lrs.Dto.StaffUpdate;
import com.lrs.Entity.Staffs;
import com.lrs.Repository.*;
import com.lrs.Service.StaffService;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StaffServiceImpl implements StaffService {

    StaffsRepository staffsRepository;

    ClassesRepository classesRepository;
    SectionsRepository sectionsRepository;
    AcademicYearRepository academicYearRepository;
    GendersRepository gendersRepository;
    ReligionsRepository religionsRepository;
    CategoriesRepository categoriesRepository;
    BloodGroupsRepository bloodGroupsRepository;
    LanguagesRepository languagesRepository;
    NationalityRepository nationalityRepository;

    @Autowired
    public StaffServiceImpl(StaffsRepository staffsRepository,
                              ClassesRepository classesRepository,
                              SectionsRepository sectionsRepository,
                              AcademicYearRepository academicYearRepository,
                              GendersRepository gendersRepository,
                              ReligionsRepository religionsRepository,
                              CategoriesRepository categoriesRepository,
                              BloodGroupsRepository bloodGroupsRepository,
                              LanguagesRepository languagesRepository,
                              NationalityRepository nationalityRepository){

        this.staffsRepository = staffsRepository;
        this.classesRepository = classesRepository;
        this.sectionsRepository = sectionsRepository;
        this.academicYearRepository = academicYearRepository;
        this.gendersRepository = gendersRepository;
        this.religionsRepository = religionsRepository;
        this.categoriesRepository = categoriesRepository;
        this.bloodGroupsRepository = bloodGroupsRepository;
        this.languagesRepository = languagesRepository;
        this.nationalityRepository = nationalityRepository;
    }

    @Override
    public StaffDetailsProjection getByStaffId(Long id) throws ServiceException {

//        StaffDetailsProjection staff = staffsRepository.getByStaffDetails(id);
//        if(null==staff){
//            throw new ServiceException(ErrorCode.SVS_ERR_0006);
//        }
        return null;

    }

    @Override
    public Staffs insertStaff(Staffs staffs) throws ServiceException {
        return null;
    }

    @Override
    public Staffs isExist(Long id) throws ServiceException {
        Optional<Staffs> staffs = staffsRepository.findById(id);
        if(staffs.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0016);
        }
        return staffs.get();
    }

    @Override
    public Staffs staffUpdate(Staffs staffExist, StaffUpdate staffUpdate) throws ServiceException {
        return null;
    }

    @Override
    public void staffDelete(Long id) throws ServiceException {
        staffsRepository.deleteById(id);
    }
}
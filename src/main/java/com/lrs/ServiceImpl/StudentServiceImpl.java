package com.lrs.ServiceImpl;

import com.lrs.Dto.*;
import com.lrs.Entity.*;
import com.lrs.Repository.*;
import com.lrs.Service.StudentService;
import com.lrs.Util.SecurityUtils;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class StudentServiceImpl implements StudentService {

    StudentsRepository studentsRepository;
    ClassesRepository classesRepository;
    SectionsRepository sectionsRepository;
    AcademicYearRepository academicYearRepository;
    GendersRepository gendersRepository;
    ReligionsRepository religionsRepository;
    CategoriesRepository categoriesRepository;
    BloodGroupsRepository bloodGroupsRepository;
    LanguagesRepository languagesRepository;
    NationalityRepository nationalityRepository;
    RelationRepository relationRepository;
    EmploymentTypeRepository employmentTypeRepository;
    DepartmentRepository departmentRepository;
    DesignationRepository designationRepository;
    MaritalStatusRepository maritalStatusRepository;

    @Autowired
    public StudentServiceImpl(StudentsRepository studentsRepository,
                              ClassesRepository classesRepository,
                              SectionsRepository sectionsRepository,
                              AcademicYearRepository academicYearRepository,
                              GendersRepository gendersRepository,
                              ReligionsRepository religionsRepository,
                              CategoriesRepository categoriesRepository,
                              BloodGroupsRepository bloodGroupsRepository,
                              LanguagesRepository languagesRepository,
                              NationalityRepository nationalityRepository,
                              RelationRepository relationRepository,
                              EmploymentTypeRepository employmentTypeRepository,
                              DepartmentRepository departmentRepository,
                              DesignationRepository designationRepository,
                              MaritalStatusRepository maritalStatusRepository){

        this.studentsRepository = studentsRepository;
        this.maritalStatusRepository = maritalStatusRepository;
        this.designationRepository = designationRepository;
        this.relationRepository = relationRepository;
        this.employmentTypeRepository = employmentTypeRepository;
        this.classesRepository = classesRepository;
        this.sectionsRepository = sectionsRepository;
        this.departmentRepository = departmentRepository;
        this.academicYearRepository = academicYearRepository;
        this.gendersRepository = gendersRepository;
        this.religionsRepository = religionsRepository;
        this.categoriesRepository = categoriesRepository;
        this.bloodGroupsRepository = bloodGroupsRepository;
        this.languagesRepository = languagesRepository;
        this.nationalityRepository = nationalityRepository;
    }

    @Override
    public StudentDetailsProjection getByStudentId(Long id) throws ServiceException {
        StudentDetailsProjection students = studentsRepository.getByStudentDetails(id);
        if(null==students){
            throw new ServiceException(ErrorCode.SVS_ERR_0006);
        }
        return students;
    }

    @Override
    public MasterDataResponse getMasterData() throws ServiceException {
        MasterDataResponse masterDataResponse = new MasterDataResponse();
        List<Nationality> nationalityList = nationalityRepository.findAll();
        List<Classes> classesList = classesRepository.findAll();
        List<Sections> sectionsList=sectionsRepository.findAll();
        List<AcademicYear> academicYearList=academicYearRepository.findAll();
        List<Genders> gendersList=gendersRepository.findAll();
        List<Religions> religionsList=religionsRepository.findAll();
        List<Categories> categoriesList=categoriesRepository.findAll();
        List<BloodGroups> bloodGroupsList=bloodGroupsRepository.findAll();
        List<Languages> languagesList=languagesRepository.findAll();
        List<Department> departmentList=departmentRepository.findAll();
        List<Designation> designationList=designationRepository.findAll();
        List<MaritalStatus> maritalStatusList=maritalStatusRepository.findAll();
        List<EmploymentType> employmentTypeList=employmentTypeRepository.findAll();
        List<Relation> relationList=relationRepository.findAll();

        masterDataResponse.setDepartmentList(departmentList);
        masterDataResponse.setDesignationList(designationList);
        masterDataResponse.setMaritalStatusList(maritalStatusList);
        masterDataResponse.setEmploymentTypeList(employmentTypeList);
        masterDataResponse.setRelationList(relationList);

        masterDataResponse.setNationalityList(nationalityList);
        masterDataResponse.setClassesList(classesList);
        masterDataResponse.setSectionsList(sectionsList);
        masterDataResponse.setAcademicYearList(academicYearList);
        masterDataResponse.setGendersList(gendersList);
        masterDataResponse.setReligionsList(religionsList);
        masterDataResponse.setCategoriesList(categoriesList);
        masterDataResponse.setBloodGroupsList(bloodGroupsList);
        masterDataResponse.setLanguagesList(languagesList);
        return masterDataResponse;
    }

    @Override
    public MasterDataAllResponse getAllMasterData() throws ServiceException {
        MasterDataAllResponse masterDataAllResponse = new MasterDataAllResponse();
        List<AllMasterDataResponse> allMasterData = studentsRepository.getAllMasterData();

        List<AllMasterDataResponse> bloodgroups = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("BLOODGROUPS")).toList();
        masterDataAllResponse.setBloodGroupsList(bloodgroups);
        List<AllMasterDataResponse> categories = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("CATEGORIES")).toList();
        masterDataAllResponse.setCategoriesList(categories);
        List<AllMasterDataResponse> classes = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("CLASSES")).toList();
        masterDataAllResponse.setClassesList(classes);
        List<AllMasterDataResponse> departments = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("DEPARTMENTS")).toList();
        masterDataAllResponse.setDepartmentList(departments);
        List<AllMasterDataResponse> employmentTypes = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("EMPLOYMENT_TYPES")).toList();
        masterDataAllResponse.setEmploymentTypeList(employmentTypes);
        List<AllMasterDataResponse> examtypes = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("EXAMTYPES")).toList();
        masterDataAllResponse.setExamTypeList(examtypes);
        List<AllMasterDataResponse> feefiltervalues = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("FEEFILTERVALUES")).toList();
        masterDataAllResponse.setFeefiltervaluesList(feefiltervalues);
        List<AllMasterDataResponse> feestatus = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("FEESTATUS")).toList();
        masterDataAllResponse.setFeestatusList(feestatus);
        List<AllMasterDataResponse> genders = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("GENDERS")).toList();
        masterDataAllResponse.setGendersList(genders);
        List<AllMasterDataResponse> languages = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("LANGUAGES")).toList();
        masterDataAllResponse.setLanguagesList(languages);
        List<AllMasterDataResponse> maritalStatuses = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("MARITAL_STATUSES")).toList();
        masterDataAllResponse.setMaritalStatusList(maritalStatuses);
        List<AllMasterDataResponse> nationality = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("NATIONALITY")).toList();
        masterDataAllResponse.setNationalityList(nationality);
        List<AllMasterDataResponse> paymenttype = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("PAYMENTTYPE")).toList();
        masterDataAllResponse.setPaymenttypeList(paymenttype);
        List<AllMasterDataResponse> relations = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("RELATIONS")).toList();
        masterDataAllResponse.setRelationList(relations);
        List<AllMasterDataResponse> religions = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("RELIGIONS")).toList();
        masterDataAllResponse.setReligionsList(religions);
        List<AllMasterDataResponse> statuses = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("STATUSES")).toList();
        masterDataAllResponse.setStatusesList(statuses);
        List<AllMasterDataResponse> subjectTypes = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("SUBJECT_TYPES")).toList();
        masterDataAllResponse.setSubjectTypesList(subjectTypes);
        List<AllMasterDataResponse> weeks = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("WEEKS")).toList();
        masterDataAllResponse.setWeeksList(weeks);
        List<AllMasterDataResponse> qualification = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("QUALIFICATION")).toList();
        masterDataAllResponse.setQualificationList(qualification);
        List<AllMasterDataResponse> subjecttype = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("SUBJECTTYPE")).toList();
        masterDataAllResponse.setSubjecttypeList(subjecttype);
        List<AllMasterDataResponse> modeRelation = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("MODERELATION")).toList();
        masterDataAllResponse.setModeRelationList(modeRelation);
        List<AllMasterDataResponse> roleCategory = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("ROLECATEGORY")).toList();
        masterDataAllResponse.setRoleCategoryList(roleCategory);
        List<AllMasterDataResponse> educationType = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("EDUCATIONTYPE")).toList();
        masterDataAllResponse.setEducationTypeList(educationType);

        return masterDataAllResponse;
    }

    @Override
    public List<Students> getAll() throws ServiceException {
        List<Students> students = studentsRepository.findAll();
        if(null==students){
            throw new ServiceException(ErrorCode.SVS_ERR_0006);
        }
        return students;
    }

    @Override
    public Students insertStudent(Students student) throws ServiceException {
        validationClass(student.getClassId());
        validationSection(student.getSectionId(),student.getClassId());
        validationAcademicYear(student.getAcademicYearId());
        validationGender(student.getGenderId());
        validationReligin(student.getReligionId());
        validationCategory(student.getCasteCategoryId());
        validationBloodGroup(student.getBloodGroupId());
        validationNativeLanguage(student.getNativeLanguageId());
        validationNationality(student.getNationalityId());
        student.setId(null);
        student.setCreatedBy(SecurityUtils.getLogInUserName());
        student.setCreatedDateTime(new Timestamp(System.currentTimeMillis()));
        student.setUpdatedBy(SecurityUtils.getLogInUserName());
        student.setUpdatedDateTime(new Timestamp(System.currentTimeMillis()));
        studentsRepository.save(student);
        return student;
    }

    @Override
    public Students isExist(Long id) throws ServiceException {
       Optional<Students> students = studentsRepository.findById(id);
       if(students.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0016);
       }
        return students.get();
    }

    @Override
    public Students studentUpdate(Students studentExist, StudentUpdate studentUpdate) throws ServiceException {
        studentExist.setMobileNumber(studentUpdate.getMobileNumber());
        // if you want update extra field add here
        studentExist.setUpdatedBy(SecurityUtils.getLogInUserName());
        studentExist.setUpdatedDateTime(new Timestamp(System.currentTimeMillis()));
        return studentsRepository.save(studentExist);
    }

    @Override
    public void studentDelete(Long id) throws ServiceException {
        studentsRepository.deleteById(id);
    }

    @Override
    public StudentDetailsProjection getByUserId(Long id) throws ServiceException {
        return studentsRepository.findByUserId(id);
    }

    private void validationNationality(Long id) throws ServiceException {
        Optional<Nationality>  data = nationalityRepository.findById(id);
        if(data.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0015);
        }
    }
    private void validationNativeLanguage(Long id) throws ServiceException {
        Optional<Languages>  data = languagesRepository.findById(id);
        if(data.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0014);
        }
    }
    private void validationBloodGroup(Long id) throws ServiceException {
        Optional<BloodGroups>  data = bloodGroupsRepository.findById(id);
        if(data.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0013);
        }
    }
    private void validationCategory(Long id) throws ServiceException {
        Optional<Categories>  data = categoriesRepository.findById(id);
        if(data.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0012);
        }
    }
    private void validationReligin(Long id) throws ServiceException {
        Optional<Religions>  data = religionsRepository.findById(id);
        if(data.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0011);
        }
    }
    private void validationGender(Long id) throws ServiceException {
        Optional<Genders>  data = gendersRepository.findById(id);
        if(data.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0010);
        }
    }
    private void validationAcademicYear(Long id) throws ServiceException {
        Optional<AcademicYear>  data = academicYearRepository.findById(id);
        if(data.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0020);
        }
    }
    private void validationSection(Long sectionId,Long classId) throws ServiceException {
        Sections  sections = sectionsRepository.findByIdAndClassIdAndIsActive(sectionId,classId,true);
        if(null == sections){
            throw new ServiceException(ErrorCode.SVS_ERR_0017);
        }
    }
    private void validationClass(Long classId) throws ServiceException {
        Optional<Classes>  classes = classesRepository.findById(classId);
        if(classes.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0007);
        }
    }
}

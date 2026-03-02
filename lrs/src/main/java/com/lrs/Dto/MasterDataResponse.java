package com.lrs.Dto;

import com.lrs.Entity.*;
import lombok.Data;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Data
public class MasterDataResponse {
List<Nationality> nationalityList;
List<Classes> classesList;
List<Sections> sectionsList;
List<AcademicYear> academicYearList;
List<Genders> gendersList;
List<Religions> religionsList;
List<Categories> categoriesList;
List<BloodGroups> bloodGroupsList;
List<Languages> languagesList;
List<Department> departmentList;
List<Designation> designationList;
List<MaritalStatus> maritalStatusList;
List<EmploymentType> employmentTypeList;
List<Relation> relationList;
}

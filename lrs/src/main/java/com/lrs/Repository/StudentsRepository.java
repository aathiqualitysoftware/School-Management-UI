package com.lrs.Repository;
import com.lrs.Dto.AllMasterDataResponse;
import com.lrs.Dto.StudentDetailsProjection;
import com.lrs.Entity.AcademicYear;
import com.lrs.Entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface StudentsRepository extends JpaRepository<Students, Long> {
    List<Students> findAll();
    Optional<Students> findById(Long id);
    @Query(value = "SELECT CONCAT(s.FirstName, ' ', s.LastName) AS name, " +
            "s.StudentId AS studentId, s.DateOfBirth AS dob, " +
            "g.Name AS gender, r.Name AS religion, s.AadhaarCardNumber AS aadhaarCardNumber, " +
            "c.Name AS categorie, b.Name AS bloodgroup, s.PermanentAddress AS adress,cc.ClassName,ss.SectionName,cc.ClassId,ss.SectionId " +
            "FROM students s " +
            "INNER JOIN bloodgroups b ON s.BloodGroupId = b.Id " +
            "INNER JOIN categories c ON s.CasteCategoryId = c.Id " +
            "INNER JOIN religions r ON s.ReligionId = r.Id " +
            "INNER JOIN genders g ON s.GenderId = g.Id " +
            "INNER JOIN academicyear a ON s.AcademicYearId = a.Id " +
            "INNER JOIN sections ss ON s.SectionId = ss.SectionId " +
            "INNER JOIN classes cc ON s.ClassId = cc.ClassId " +
            "WHERE s.user_Id = :id",
            nativeQuery = true)
    StudentDetailsProjection findByUserId(Long id);
    @Query(value = "SELECT CONCAT(s.FirstName, ' ', s.LastName) AS name, " +
            "s.StudentId AS studentId, s.DateOfBirth AS dob, " +
            "g.Name AS gender, r.Name AS religion, s.AadhaarCardNumber AS aadhaarCardNumber, " +
            "c.Name AS categorie, b.Name AS bloodgroup, s.PermanentAddress AS adress,cc.ClassName,ss.SectionName,cc.ClassId,ss.SectionId " +
            "FROM students s " +
            "INNER JOIN bloodgroups b ON s.BloodGroupId = b.Id " +
            "INNER JOIN categories c ON s.CasteCategoryId = c.Id " +
            "INNER JOIN religions r ON s.ReligionId = r.Id " +
            "INNER JOIN genders g ON s.GenderId = g.Id " +
            "INNER JOIN academicyear a ON s.AcademicYearId = a.Id " +
            "INNER JOIN sections ss ON s.SectionId = ss.SectionId " +
            "INNER JOIN classes cc ON s.ClassId = cc.ClassId " +
            "WHERE s.StudentId = :id",
            nativeQuery = true)
    StudentDetailsProjection getByStudentDetails(@Param("id") Long id);

    @Query(value = "select mt.MasterTypeId as masterTypeId,m.MasterId as masterId,mt.TypeName as typeName,\n" +
            "mt.TypeCode as typeCode,m.Name as name,\n" +
            "mt.IsActive as masterTypeActive,m.IsActive as masterActive\n" +
            "from MasterType mt\n" +
            "inner join Master m\n" +
            "on mt.MasterTypeId =m.MasterTypeId",
            nativeQuery = true)
    List<AllMasterDataResponse> getAllMasterData();

}


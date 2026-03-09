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

            "g.Name AS gender, " +
            "r.Name AS religion, " +
            "s.AadhaarCardNumber AS aadhaarCardNumber, " +

            "c.Name AS categorie, " +
            "b.Name AS bloodgroup, " +

            "s.PermanentAddress AS adress, " +

            "cl.Name AS ClassName, " +
            "ss.SectionName, " +
            "cl.MasterId AS ClassId, " +
            "ss.SectionId " +

            "FROM students s " +

            // BLOODGROUPS
            "INNER JOIN master b ON s.BloodGroupId = b.MasterId " +
            "INNER JOIN mastertype mtb ON b.MasterTypeId = mtb.MasterTypeId AND mtb.TypeName = 'BLOODGROUPS' " +

            // CATEGORIES
            "INNER JOIN master c ON s.CasteCategoryId = c.MasterId " +
            "INNER JOIN mastertype mtc ON c.MasterTypeId = mtc.MasterTypeId AND mtc.TypeName = 'CATEGORIES' " +

            // RELIGIONS
            "INNER JOIN master r ON s.ReligionId = r.MasterId " +
            "INNER JOIN mastertype mtr ON r.MasterTypeId = mtr.MasterTypeId AND mtr.TypeName = 'RELIGIONS' " +

            // GENDERS
            "INNER JOIN master g ON s.GenderId = g.MasterId " +
            "INNER JOIN mastertype mtg ON g.MasterTypeId = mtg.MasterTypeId AND mtg.TypeName = 'GENDERS' " +


            "INNER JOIN academicyear a ON s.AcademicYearId = a.Id " +
//            "INNER JOIN master ay ON s.AcademicYearId = ay.MasterId " +
//            "INNER JOIN mastertype mtay ON ay.MasterTypeId = mtay.MasterTypeId AND mtay.TypeName = 'ACADEMICYEAR' " +

            // SECTION (unchanged)
            "INNER JOIN sections ss ON s.SectionId = ss.SectionId " +

            // CLASSES
            "INNER JOIN master cl ON s.ClassId = cl.MasterId " +
            "INNER JOIN mastertype mtcl ON cl.MasterTypeId = mtcl.MasterTypeId AND mtcl.TypeName = 'CLASSES' " +

            "WHERE s.user_id = :id",
            nativeQuery = true)
    StudentDetailsProjection findByUserId(Long id);

    @Query(value = "SELECT CONCAT(s.FirstName, ' ', s.LastName) AS name, " +
            "s.StudentId AS studentId, s.DateOfBirth AS dob, " +
            "g.Name AS gender, r.Name AS religion, s.AadhaarCardNumber AS aadhaarCardNumber, " +
            "c.Name AS categorie, b.Name AS bloodgroup, s.PermanentAddress AS adress, " +
            "cc.Name AS ClassName, ss.SectionName, cc.MasterId AS ClassId, ss.SectionId " +

            "FROM students s " +

            // BLOODGROUPS
            "INNER JOIN master b ON s.BloodGroupId = b.MasterId " +
            "INNER JOIN mastertype mtb ON b.MasterTypeId = mtb.MasterTypeId AND mtb.TypeName = 'BLOODGROUPS' " +

            // CATEGORIES
            "INNER JOIN master c ON s.CasteCategoryId = c.MasterId " +
            "INNER JOIN mastertype mtc ON c.MasterTypeId = mtc.MasterTypeId AND mtc.TypeName = 'CATEGORIES' " +

            // RELIGIONS
            "INNER JOIN master r ON s.ReligionId = r.MasterId " +
            "INNER JOIN mastertype mtr ON r.MasterTypeId = mtr.MasterTypeId AND mtr.TypeName = 'RELIGIONS' " +

            // GENDERS
            "INNER JOIN master g ON s.GenderId = g.MasterId " +
            "INNER JOIN mastertype mtg ON g.MasterTypeId = mtg.MasterTypeId AND mtg.TypeName = 'GENDERS' " +


            "INNER JOIN academicyear a ON s.AcademicYearId = a.Id " +
//            "INNER JOIN master a ON s.AcademicYearId = a.MasterId " +
//            "INNER JOIN mastertype mta ON a.MasterTypeId = mta.MasterTypeId AND mta.TypeName = 'ACADEMICYEAR' " +

            // SECTIONS
            "INNER JOIN sections ss ON s.SectionId = ss.SectionId " +

            // CLASSES
            "INNER JOIN master cc ON s.ClassId = cc.MasterId " +
            "INNER JOIN mastertype mtcl ON cc.MasterTypeId = mtcl.MasterTypeId AND mtcl.TypeName = 'CLASSES' " +

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


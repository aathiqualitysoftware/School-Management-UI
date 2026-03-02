package com.lrs.ServiceImpl;

import com.lrs.Dto.GradeInfoUpdate;
import com.lrs.Entity.GradeInfo;
import com.lrs.Repository.GradeInfoRepository;
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
public class GradeInfoServiceImpl implements GradeInfoService {

    GradeInfoRepository gradeInfoRepository;

    @Autowired
    public GradeInfoServiceImpl(GradeInfoRepository gradeInfoRepository){

        this.gradeInfoRepository = gradeInfoRepository;
    }

    @Override
    public GradeInfo insertGradeInfo(GradeInfo gradeInfo) throws ServiceException {
        gradeInfo.setId(null);
        gradeInfo.setCreatedBy(SecurityUtils.getLogInUserName());
//        gradeInfo.setCreatedDateTime(new Timestamp(System.currentTimeMillis()));
        gradeInfo.setUpdatedBy(SecurityUtils.getLogInUserName());
//        gradeInfo.setUpdatedDateTime(new Timestamp(System.currentTimeMillis()));
        gradeInfoRepository.save(gradeInfo);
        return gradeInfo;
    }

    @Override
    public GradeInfo isExist(Long id) throws ServiceException {
       Optional<GradeInfo> gradeInfo = gradeInfoRepository.findById(id);
       if(gradeInfo.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0024);
       }
        return gradeInfo.get();
    }

    @Override
    public GradeInfo gradeInfoUpdate(GradeInfo gradeInfoExist, GradeInfoUpdate gradeInfoUpdate) throws ServiceException {
        gradeInfoExist.setGradeName(gradeInfoUpdate.getGradeName());
        gradeInfoExist.setFromMark(gradeInfoUpdate.getFromMark());
        gradeInfoExist.setToMark(gradeInfoUpdate.getToMark());
        // if you want update extra field add here
        gradeInfoExist.setUpdatedBy(SecurityUtils.getLogInUserName());
//        gradeInfoExist.setUpdatedDateTime(new Timestamp(System.currentTimeMillis()));
        return gradeInfoRepository.save(gradeInfoExist);
    }

    @Override
    public void gradeInfoDelete(Long id) throws ServiceException {
        gradeInfoRepository.deleteById(id);
    }

    @Override
    public List<GradeInfo> getGradeInfo() throws ServiceException {
        List<GradeInfo> gradeInfos = gradeInfoRepository.findAll();
        if(gradeInfos.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0024);
        }
        return gradeInfos;
    }
}

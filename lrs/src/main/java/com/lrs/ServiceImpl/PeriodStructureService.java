package com.lrs.ServiceImpl;

import com.lrs.Entity.PeriodStructure;
import com.lrs.Repository.PeriodStructureRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalTime;

@Service
public class PeriodStructureService {

    private final PeriodStructureRepository repository;

    public PeriodStructureService(PeriodStructureRepository repository) {
        this.repository = repository;
    }

    public PeriodStructure save(PeriodStructure period) {
        return repository.save(period);
    }

    public PeriodStructure update(PeriodStructure period) {
        return repository.save(period);
    }

    public List<PeriodStructure> getAll() {
        return repository.findAll();
    }

    public PeriodStructure getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<PeriodStructure> getByConfig(String configId) {
        return repository.findByConfigId(configId);
    }

    public PeriodStructure getByPeriodNumber(Long number) {
        return repository.findByPeriodNumber(number);
    }

    public List<PeriodStructure> getBreaks() {
        return repository.findByIsBreakTrue();
    }

    public List<PeriodStructure> getTeachingPeriods() {
        return repository.findByIsBreakFalse();
    }

    public List<PeriodStructure> getByTimeRange(LocalTime start, LocalTime end) {
        return repository.findByStartTimeBetween(start, end);
    }
}
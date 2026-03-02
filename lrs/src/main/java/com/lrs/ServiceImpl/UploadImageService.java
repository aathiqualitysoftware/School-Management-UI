package com.lrs.ServiceImpl;

import com.lrs.Entity.UploadImage;
import com.lrs.Repository.UploadImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class UploadImageService {

    @Autowired
    private UploadImageRepository repository;

    // Save new image
    public UploadImage saveImage(MultipartFile file, String createdBy) throws IOException {
        UploadImage img = new UploadImage();
        img.setName(file.getOriginalFilename());
        img.setImageData(file.getBytes());
        img.setCreatedBy(createdBy != null ? createdBy : "SYSTEM");
        img.setUpdatedBy(createdBy != null ? createdBy : "SYSTEM");
        img.setCreatedAt(LocalDate.now());
        img.setUpdatedAt(LocalDate.now());
        return repository.save(img);
    }

    // Retrieve image by ID
    public UploadImage getImage(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Retrieve metadata only (without blob)
    public UploadImage getImageMeta(Long id) {
        UploadImage img = repository.findById(id).orElse(null);
        if (img != null) {
            img.setImageData(null); // exclude heavy binary
        }
        return img;
    }

    // Update image (replace file or metadata)
    public UploadImage updateImage(Long id, MultipartFile file, String updatedBy) throws IOException {
        UploadImage img = repository.findById(id).orElse(null);
        if (img != null) {
            if (file != null) {
                img.setName(file.getOriginalFilename());
                img.setImageData(file.getBytes());
            }
            img.setUpdatedBy(updatedBy != null ? updatedBy : "SYSTEM");
            img.setUpdatedAt(LocalDate.now());
            return repository.save(img);
        }
        return null;
    }

    // Delete image
    public boolean deleteImage(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    // List all images (metadata only)
    public List<UploadImage> listAllImages() {
        List<UploadImage> images = repository.findAll();
        images.forEach(img -> img.setImageData(null)); // exclude blob
        return images;
    }
}
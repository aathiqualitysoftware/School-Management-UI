package com.lrs.Controller;

import com.lrs.Entity.UploadImage;
import com.lrs.ServiceImpl.UploadImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class UploadImageController {

    @Autowired
    private UploadImageService service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam(value="createdBy", defaultValue="SYSTEM") String createdBy) throws IOException, IOException {
        UploadImage saved = service.saveImage(file, createdBy);
        return ResponseEntity.ok(saved.getId().toString());
    }

    @GetMapping("/{id}/meta")
    public ResponseEntity<UploadImage> getImageMeta(@PathVariable Long id) {
        UploadImage img = service.getImage(id);
        if (img == null) return ResponseEntity.notFound().build();
        img.setImageData(null); // exclude binary
        return ResponseEntity.ok(img);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
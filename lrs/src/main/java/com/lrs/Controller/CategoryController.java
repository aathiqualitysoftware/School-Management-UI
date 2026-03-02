package com.lrs.Controller;

import com.lrs.Entity.Categories;
import com.lrs.ServiceImpl.CategoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Categories create(@RequestBody Categories category) {
        return service.save(category);
    }

    // Update
    @PutMapping("/{id}")
    public Categories update(@PathVariable Long id, @RequestBody Categories category) {
        category.setId(id);
        return service.update(category);
    }

    // Get all
    @GetMapping
    public List<Categories> getAll() {
        return service.getAll();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Categories getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Get by Name
    @GetMapping("/name/{name}")
    public Categories getByName(@PathVariable String name) {
        return service.getByName(name);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
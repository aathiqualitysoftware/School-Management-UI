package com.lrs.Controller;
import com.lrs.Dto.AllMasterDataResponse;
import com.lrs.Dto.StudentDetailsProjection;
import com.lrs.Entity.Roles;
import com.lrs.Entity.Students;
import com.lrs.Entity.Users;
import com.lrs.Repository.StudentsRepository;
import com.lrs.Service.RolesService;
import com.lrs.Service.StudentService;
import com.lrs.Service.UserService;
import com.lrs.Util.JwtUtil;
import com.lrs.exception.ServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

record LoginRequest(String username, String password,String roleName) {}
record RegisterRequest(String username, String password) {}
record TokenResponse(String token) {}


@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final RolesService rolesService;
    private final StudentService studentService;
    private final JwtUtil jwtUtil;
    private StudentsRepository studentsRepository;

    public AuthController(UserService userService,
                          JwtUtil jwtUtil,
                          RolesService rolesService,
                          StudentService studentService,
                          StudentsRepository studentsRepository) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.rolesService = rolesService;
        this.studentService = studentService;
        this.studentsRepository =studentsRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        Users u = userService.register(req.username(), req.password());
        return ResponseEntity.ok(u.getUserName());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) throws ServiceException {
        Users u = userService.validate(req.username(), req.password(),req.roleName());
        if (u == null) return ResponseEntity.status(401).body("Invalid credentials");
        List<String> roles = new ArrayList<>();
//        List<Roles> rolesList= rolesService.getRoles(u.getRoleId());
//        for(Roles r : rolesList){
//            roles.add(r.getRoleName());
//        }

        List<AllMasterDataResponse> allMasterData = studentsRepository.getAllMasterData();

        List<AllMasterDataResponse> rolesList = allMasterData.stream()
                .filter(x->x.getTypeName().equalsIgnoreCase("ROLES")).toList();
        List<AllMasterDataResponse> filterRole = rolesList.stream()
                .filter(x -> Objects.equals(x.getMasterId(), u.getRoleId()))
                .toList();
        for(AllMasterDataResponse data: filterRole){
            roles.add(data.getName());
        }
        StudentDetailsProjection students = studentService.getByUserId(u.getUserId());
        String token = jwtUtil.generateToken(u.getUserName(), roles,students);
        return ResponseEntity.ok(new TokenResponse(token));
    }

    // Example protected endpoint
    @GetMapping("/protected")
    public ResponseEntity<String> protectedEndpoint() {
        return ResponseEntity.ok("Access granted to protected resource!");
    }
}
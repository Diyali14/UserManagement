package com.springbootfirstcurd.usermanagement.controller;

import com.springbootfirstcurd.usermanagement.dto.UserDto;
import com.springbootfirstcurd.usermanagement.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Build create user REST API
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto savedUser = userService.createUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    //Build Get user REST API
    @GetMapping("/{id}")
    public  ResponseEntity<UserDto> getUserById(@PathVariable Long id){
        UserDto userDto=userService.getUserById(id);
        return  ResponseEntity.ok(userDto);
    }

    //Build all users rest api
    @GetMapping
    public  ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //build update user rest api
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updatedUser(@PathVariable Long id,@RequestBody UserDto userDto){
        UserDto updatedUser=userService.uodateUser(id,userDto);
        return ResponseEntity.ok(updatedUser);
    }

    //Build delete user rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){

        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}

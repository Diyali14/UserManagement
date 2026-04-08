package com.springbootfirstcurd.usermanagement.service;

import com.springbootfirstcurd.usermanagement.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto getUserById(Long id);


    List<UserDto> getAllUsers();

    UserDto uodateUser(Long id,UserDto userDto);

    void deleteUser(Long id);
}

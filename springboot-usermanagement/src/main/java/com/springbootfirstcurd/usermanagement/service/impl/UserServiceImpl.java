package com.springbootfirstcurd.usermanagement.service.impl;

import com.springbootfirstcurd.usermanagement.dto.UserDto;
import com.springbootfirstcurd.usermanagement.entity.User;
import com.springbootfirstcurd.usermanagement.exception.ResourceNotFoundException;
import com.springbootfirstcurd.usermanagement.mapper.UsermAPPER;
import com.springbootfirstcurd.usermanagement.repository.UserRepository;
import com.springbootfirstcurd.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService {


    private  final UserRepository userRepository;
    private  final UsermAPPER userMapper;


    public UserServiceImpl(UserRepository userRepository,UsermAPPER userMapper){

        this.userRepository=userRepository;
        this.userMapper= userMapper;
    }


    @Override
    public UserDto createUser(UserDto userDto){
        User user=userMapper.toEntity(userDto);
        User savedUsed=userRepository.save(user);
        return userMapper.toDto(savedUsed);
    }

    @Override
    public  UserDto getUserById(Long id){

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not found with id: "+id));

        return userMapper.toDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map(userMapper::toDto)
                .toList();
    }

    @Override
    public UserDto uodateUser(Long id, UserDto userDto) {

        //for handling the exception
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not found with id: "+id));

        //fetching user data from userdto to user entity
        user.setFirstName(userDto.firstName());
        user.setLastName(userDto.lastName());
        user.setEmail(userDto.email());

        //now will update the data into DB table

        User updatedUser = userRepository.save(user);

        //converting this updatedUser into dto entity again
        // as it returns dto entity

        return userMapper.toDto(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {

        // if a user with given id
        //exists in the database or not if not then throw exception
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not found with id: "+id));

        userRepository.delete(user);
    }
}

package com.springbootfirstcurd.usermanagement.mapper;


import com.springbootfirstcurd.usermanagement.dto.UserDto;
import com.springbootfirstcurd.usermanagement.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UsermAPPER {

     public UserDto toDto(User user){
       return new UserDto(user.getId(),
               user.getFirstName(),
               user.getLastName(),
               user.getEmail()
       );

    }

    public User toEntity(UserDto userDto){
        User user = new User();
        user.setFirstName(userDto.firstName());
        user.setLastName(userDto.lastName());
        user.setEmail(userDto.email());

        return user;
    }
}



package com.broadcom.challenge.service;

import com.broadcom.challenge.entity.User;
import com.broadcom.challenge.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * Service class responsible to communicate with data layer and get required information
 */
@Service
public class UserService implements IUserService{

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    @Autowired
    UserRepository userRepository;
    @Override
    public Page<User> getUsers(String lastName, int age, Pageable pageable) {
        if(StringUtils.hasText(lastName) && age > 0){
            //Filter users based on last name and age
            return userRepository.findByLastNameAndAge(lastName, age, pageable);
        }else if(StringUtils.hasText(lastName)){
            //filter users based on last name
            return userRepository.findByLastName(lastName, pageable);
        }else if(age>0){
            //filter based on user age
            return userRepository.findByAge(age, pageable);
        }
        //default do not filter user
        return userRepository.findAll(pageable);
    }
}

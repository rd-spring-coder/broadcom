package com.broadcom.challenge.web.controller;

import com.broadcom.challenge.entity.User;
import com.broadcom.challenge.service.IUserService;
import com.broadcom.challenge.web.error.BadRequestAlertException;
import com.broadcom.challenge.web.error.ErrorConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    IUserService userService;
    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getUsers(@RequestParam(required = false, name = "lastname")String lastName,
                                               @RequestParam(required = false, name = "age", defaultValue = "0") Integer age,
                                               Pageable pageable) throws Exception {

        Page<User> users = userService.getUsers(lastName, age, pageable);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("X-Total-Count", String.valueOf(users.getTotalElements()));
        return new ResponseEntity<List<User>>(users.getContent(),httpHeaders, HttpStatus.OK);
    }

}

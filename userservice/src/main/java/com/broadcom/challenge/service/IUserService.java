package com.broadcom.challenge.service;

import com.broadcom.challenge.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {
    /**
     * This method will take optional lastName and age parameters and pull matching users
     * @param lastName
     * @param age
     * @param pageable
     * @return Page of result
     */
    public Page<User> getUsers(String lastName, int age, Pageable pageable);
}

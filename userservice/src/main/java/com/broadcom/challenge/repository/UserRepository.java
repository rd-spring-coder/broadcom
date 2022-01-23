package com.broadcom.challenge.repository;

import com.broadcom.challenge.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    /**
     * Method to filter based on user age
     * @param age
     * @param pageable
     */
    Page<User> findByAge(int age, Pageable pageable);

    /**
     * Method to filter users based on last name
     * @param lastName
     * @param pageable
     * @return
     */
    Page<User> findByLastName(String lastName, Pageable pageable);

    /**
     * Method to filter users based on last name and age
     * @param lastName
     * @param age
     * @param pageable
     * @return
     */
    Page<User> findByLastNameAndAge(String lastName, int age, Pageable pageable);
}

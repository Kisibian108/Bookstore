package com.example.service.impl;

import com.example.model.UserRole;
import com.example.repository.UserRepository;
import com.example.repository.UserRoleRepository;
import com.example.service.IUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserRoleService implements IUserRoleService {

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    UserRepository userRepository;

    /**
     * @return list UserRole (test list)
     * @creator LamNT
     * @day 12/09/2022
     */

    @Override
    public List<UserRole> findAll() {
        return userRoleRepository.findAll();
    }

    /**
     * @param userRole
     * @creator LamNT
     * @day 12/09/2022
     */

    @Override
    public void save(UserRole userRole) {
        userRoleRepository.save(userRole.getAppRole().getId(), userRole.getAppUser().getId());
    }

    @Override
    public void deleteUserRole(int id) {
        userRoleRepository.deleteUserRole(id);
    }
}

package com.example.repository;

import com.example.model.AppUser;
import com.example.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

    List<UserRole> findAllByAppUser(AppUser appUser);

    /**
     * @param id function deleteUserRole
     * @Creator LamNT
     * @Date 12/09/2022
     */
    @Transactional
    @Modifying
    @Query(value = "delete from user_role where user_id= :id",nativeQuery = true)
    void deleteUserRole(@Param("id") int id);

    /**
     * @return list UserRole
     * @creator LamNT
     * @day 12/09/2022
     */

    @Query(value = "select * from user_role", nativeQuery = true)
    List<UserRole> findAll();

    /**
     * @param roleId
     * @param userId
     * @creator LamNT
     * @day 12/09/2022
     */

    @Modifying
    @Query(value = "insert into user_role (is_deleted, role_id, user_id) values (0, :roleId, :userId)", nativeQuery = true)
    void save(@Param("roleId") Integer roleId, @Param("userId") Integer userId);
}

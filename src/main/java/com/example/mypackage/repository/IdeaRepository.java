package com.example.mypackage.repository;

import com.example.mypackage.domain.Idea;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Idea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {

}

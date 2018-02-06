package com.example.mypackage.repository;

import com.example.mypackage.domain.InnovationChallenge;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the InnovationChallenge entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InnovationChallengeRepository extends JpaRepository<InnovationChallenge, Long> {

}

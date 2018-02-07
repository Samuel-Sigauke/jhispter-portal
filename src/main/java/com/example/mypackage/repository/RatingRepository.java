package com.example.mypackage.repository;

import com.example.mypackage.domain.Rating;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Rating entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

List<Rating> findAllByRatedBy (String ratedBy)
}

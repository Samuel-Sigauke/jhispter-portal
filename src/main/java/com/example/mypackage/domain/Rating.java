package com.example.mypackage.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.example.mypackage.domain.enumeration.RatingPoints;

/**
 * A Rating.
 */
@Entity
@Table(name = "rating")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "rating_points")
    private RatingPoints ratingPoints;

    @Column(name = "rated_by")
    private String ratedBy;

    @Column(name = "date_rated")
    private ZonedDateTime dateRated;

    @ManyToOne
    private Idea idea;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RatingPoints getRatingPoints() {
        return ratingPoints;
    }

    public Rating ratingPoints(RatingPoints ratingPoints) {
        this.ratingPoints = ratingPoints;
        return this;
    }

    public void setRatingPoints(RatingPoints ratingPoints) {
        this.ratingPoints = ratingPoints;
    }

    public String getRatedBy() {
        return ratedBy;
    }

    public Rating ratedBy(String ratedBy) {
        this.ratedBy = ratedBy;
        return this;
    }

    public void setRatedBy(String ratedBy) {
        this.ratedBy = ratedBy;
    }

    public ZonedDateTime getDateRated() {
        return dateRated;
    }

    public Rating dateRated(ZonedDateTime dateRated) {
        this.dateRated = dateRated;
        return this;
    }

    public void setDateRated(ZonedDateTime dateRated) {
        this.dateRated = dateRated;
    }

    public Idea getIdea() {
        return idea;
    }

    public Rating idea(Idea idea) {
        this.idea = idea;
        return this;
    }

    public void setIdea(Idea idea) {
        this.idea = idea;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Rating rating = (Rating) o;
        if (rating.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rating.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rating{" +
            "id=" + getId() +
            ", ratingPoints='" + getRatingPoints() + "'" +
            ", ratedBy='" + getRatedBy() + "'" +
            ", dateRated='" + getDateRated() + "'" +
            "}";
    }
}

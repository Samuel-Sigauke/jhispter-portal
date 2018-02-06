package com.example.mypackage.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A InnovationChallenge.
 */
@Entity
@Table(name = "innovation_challenge")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InnovationChallenge implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "challenge_name")
    private String challengeName;

    @Column(name = "challenge_description")
    private String challengeDescription;

    @Column(name = "date_created")
    private ZonedDateTime dateCreated;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @Column(name = "created_by")
    private String createdBy;

    @ManyToOne
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChallengeName() {
        return challengeName;
    }

    public InnovationChallenge challengeName(String challengeName) {
        this.challengeName = challengeName;
        return this;
    }

    public void setChallengeName(String challengeName) {
        this.challengeName = challengeName;
    }

    public String getChallengeDescription() {
        return challengeDescription;
    }

    public InnovationChallenge challengeDescription(String challengeDescription) {
        this.challengeDescription = challengeDescription;
        return this;
    }

    public void setChallengeDescription(String challengeDescription) {
        this.challengeDescription = challengeDescription;
    }

    public ZonedDateTime getDateCreated() {
        return dateCreated;
    }

    public InnovationChallenge dateCreated(ZonedDateTime dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(ZonedDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public InnovationChallenge startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public InnovationChallenge endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public InnovationChallenge createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Category getCategory() {
        return category;
    }

    public InnovationChallenge category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
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
        InnovationChallenge innovationChallenge = (InnovationChallenge) o;
        if (innovationChallenge.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), innovationChallenge.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InnovationChallenge{" +
            "id=" + getId() +
            ", challengeName='" + getChallengeName() + "'" +
            ", challengeDescription='" + getChallengeDescription() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            "}";
    }
}

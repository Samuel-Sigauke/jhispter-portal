package com.example.mypackage.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Idea.
 */
@Entity
@Table(name = "idea")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Idea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idea_title")
    private String ideaTitle;

    @Column(name = "idea_summary")
    private String ideaSummary;

    @Column(name = "date_created")
    private ZonedDateTime dateCreated;

    @Column(name = "posted_by")
    private String postedBy;

    @ManyToOne
    private InnovationChallenge inovationChallenge;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdeaTitle() {
        return ideaTitle;
    }

    public Idea ideaTitle(String ideaTitle) {
        this.ideaTitle = ideaTitle;
        return this;
    }

    public void setIdeaTitle(String ideaTitle) {
        this.ideaTitle = ideaTitle;
    }

    public String getIdeaSummary() {
        return ideaSummary;
    }

    public Idea ideaSummary(String ideaSummary) {
        this.ideaSummary = ideaSummary;
        return this;
    }

    public void setIdeaSummary(String ideaSummary) {
        this.ideaSummary = ideaSummary;
    }

    public ZonedDateTime getDateCreated() {
        return dateCreated;
    }

    public Idea dateCreated(ZonedDateTime dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(ZonedDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public Idea postedBy(String postedBy) {
        this.postedBy = postedBy;
        return this;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }

    public InnovationChallenge getInovationChallenge() {
        return inovationChallenge;
    }

    public Idea inovationChallenge(InnovationChallenge innovationChallenge) {
        this.inovationChallenge = innovationChallenge;
        return this;
    }

    public void setInovationChallenge(InnovationChallenge innovationChallenge) {
        this.inovationChallenge = innovationChallenge;
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
        Idea idea = (Idea) o;
        if (idea.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), idea.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Idea{" +
            "id=" + getId() +
            ", ideaTitle='" + getIdeaTitle() + "'" +
            ", ideaSummary='" + getIdeaSummary() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", postedBy='" + getPostedBy() + "'" +
            "}";
    }
}

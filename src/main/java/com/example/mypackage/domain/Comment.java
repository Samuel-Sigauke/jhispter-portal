package com.example.mypackage.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;
//import moment from 'moment';

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "comment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comment_summary")
    private String commentSummary;

    @Column(name = "date_posted")
    private ZonedDateTime datePosted;

    @Column(name = "moment")
    private String moment;

    @Column(name = "commented_by")
    private String commentedBy;

    @ManyToOne
    private Idea idea;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentSummary() {
        return commentSummary;
    }

    public Comment commentSummary(String commentSummary) {
        this.commentSummary = commentSummary;
        return this;
    }

    public void setCommentSummary(String commentSummary) {
        this.commentSummary = commentSummary;
    }

    /* public String getmoment(){
      return moment;
    }

    public Comment moment(String moment){
      this.moment = moment;
      return this;
    } */

   public ZonedDateTime getDatePosted() {
        return datePosted;
    }

    public Comment datePosted(ZonedDateTime datePosted) {
        this.datePosted = datePosted;
        return this;
    }

    public void setDatePosted(ZonedDateTime datePosted) {
        this.datePosted = datePosted;
    }

    public String getCommentedBy() {
        return commentedBy;
    }

    public Comment commentedBy(String commentedBy) {
        this.commentedBy = commentedBy;
        return this;
    }

    public void setCommentedBy(String commentedBy) {
        this.commentedBy = commentedBy;
    }

    public Idea getIdea() {
        return idea;
    }

    public Comment idea(Idea idea) {
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
        Comment comment = (Comment) o;
        if (comment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Comment{" +
            "id=" + getId() +
            ", commentSummary='" + getCommentSummary() + "'" +
            ", datePosted='" + getDatePosted() + "'" +
            ", commentedBy='" + getCommentedBy() + "'" +
            //", moment='" + getmoment() + "'" +
            "}";
    }
}

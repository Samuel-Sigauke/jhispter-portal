package com.example.mypackage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.mypackage.domain.Idea;

import com.example.mypackage.repository.IdeaRepository;
import com.example.mypackage.web.rest.errors.BadRequestAlertException;
import com.example.mypackage.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Idea.
 */
@RestController
@RequestMapping("/api")
public class IdeaResource {

    private final Logger log = LoggerFactory.getLogger(IdeaResource.class);

    private static final String ENTITY_NAME = "idea";

    private final IdeaRepository ideaRepository;

    public IdeaResource(IdeaRepository ideaRepository) {
        this.ideaRepository = ideaRepository;
    }

    /**
     * POST  /ideas : Create a new idea.
     *
     * @param idea the idea to create
     * @return the ResponseEntity with status 201 (Created) and with body the new idea, or with status 400 (Bad Request) if the idea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ideas")
    @Timed
    public ResponseEntity<Idea> createIdea(@RequestBody Idea idea) throws URISyntaxException {
        log.debug("REST request to save Idea : {}", idea);
        if (idea.getId() != null) {
            throw new BadRequestAlertException("A new idea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Idea result = ideaRepository.save(idea);
        return ResponseEntity.created(new URI("/api/ideas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ideas : Updates an existing idea.
     *
     * @param idea the idea to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated idea,
     * or with status 400 (Bad Request) if the idea is not valid,
     * or with status 500 (Internal Server Error) if the idea couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ideas")
    @Timed
    public ResponseEntity<Idea> updateIdea(@RequestBody Idea idea) throws URISyntaxException {
        log.debug("REST request to update Idea : {}", idea);
        if (idea.getId() == null) {
            return createIdea(idea);
        }
        Idea result = ideaRepository.save(idea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, idea.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ideas : get all the ideas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ideas in body
     */
    @GetMapping("/ideas")
    @Timed
    public List<Idea> getAllIdeas() {
        log.debug("REST request to get all Ideas");
        return ideaRepository.findAll();
        }

    /**
     * GET  /ideas/:id : get the "id" idea.
     *
     * @param id the id of the idea to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the idea, or with status 404 (Not Found)
     */
    @GetMapping("/ideas/{id}")
    @Timed
    public ResponseEntity<Idea> getIdea(@PathVariable Long id) {
        log.debug("REST request to get Idea : {}", id);
        Idea idea = ideaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(idea));
    }

    /**
     * DELETE  /ideas/:id : delete the "id" idea.
     *
     * @param id the id of the idea to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ideas/{id}")
    @Timed
    public ResponseEntity<Void> deleteIdea(@PathVariable Long id) {
        log.debug("REST request to delete Idea : {}", id);
        ideaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

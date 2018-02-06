package com.example.mypackage.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.mypackage.domain.InnovationChallenge;

import com.example.mypackage.repository.InnovationChallengeRepository;
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
 * REST controller for managing InnovationChallenge.
 */
@RestController
@RequestMapping("/api")
public class InnovationChallengeResource {

    private final Logger log = LoggerFactory.getLogger(InnovationChallengeResource.class);

    private static final String ENTITY_NAME = "innovationChallenge";

    private final InnovationChallengeRepository innovationChallengeRepository;

    public InnovationChallengeResource(InnovationChallengeRepository innovationChallengeRepository) {
        this.innovationChallengeRepository = innovationChallengeRepository;
    }

    /**
     * POST  /innovation-challenges : Create a new innovationChallenge.
     *
     * @param innovationChallenge the innovationChallenge to create
     * @return the ResponseEntity with status 201 (Created) and with body the new innovationChallenge, or with status 400 (Bad Request) if the innovationChallenge has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/innovation-challenges")
    @Timed
    public ResponseEntity<InnovationChallenge> createInnovationChallenge(@RequestBody InnovationChallenge innovationChallenge) throws URISyntaxException {
        log.debug("REST request to save InnovationChallenge : {}", innovationChallenge);
        if (innovationChallenge.getId() != null) {
            throw new BadRequestAlertException("A new innovationChallenge cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InnovationChallenge result = innovationChallengeRepository.save(innovationChallenge);
        return ResponseEntity.created(new URI("/api/innovation-challenges/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /innovation-challenges : Updates an existing innovationChallenge.
     *
     * @param innovationChallenge the innovationChallenge to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated innovationChallenge,
     * or with status 400 (Bad Request) if the innovationChallenge is not valid,
     * or with status 500 (Internal Server Error) if the innovationChallenge couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/innovation-challenges")
    @Timed
    public ResponseEntity<InnovationChallenge> updateInnovationChallenge(@RequestBody InnovationChallenge innovationChallenge) throws URISyntaxException {
        log.debug("REST request to update InnovationChallenge : {}", innovationChallenge);
        if (innovationChallenge.getId() == null) {
            return createInnovationChallenge(innovationChallenge);
        }
        InnovationChallenge result = innovationChallengeRepository.save(innovationChallenge);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, innovationChallenge.getId().toString()))
            .body(result);
    }

    /**
     * GET  /innovation-challenges : get all the innovationChallenges.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of innovationChallenges in body
     */
    @GetMapping("/innovation-challenges")
    @Timed
    public List<InnovationChallenge> getAllInnovationChallenges() {
        log.debug("REST request to get all InnovationChallenges");
        return innovationChallengeRepository.findAll();
        }

    /**
     * GET  /innovation-challenges/:id : get the "id" innovationChallenge.
     *
     * @param id the id of the innovationChallenge to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the innovationChallenge, or with status 404 (Not Found)
     */
    @GetMapping("/innovation-challenges/{id}")
    @Timed
    public ResponseEntity<InnovationChallenge> getInnovationChallenge(@PathVariable Long id) {
        log.debug("REST request to get InnovationChallenge : {}", id);
        InnovationChallenge innovationChallenge = innovationChallengeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(innovationChallenge));
    }

    /**
     * DELETE  /innovation-challenges/:id : delete the "id" innovationChallenge.
     *
     * @param id the id of the innovationChallenge to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/innovation-challenges/{id}")
    @Timed
    public ResponseEntity<Void> deleteInnovationChallenge(@PathVariable Long id) {
        log.debug("REST request to delete InnovationChallenge : {}", id);
        innovationChallengeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

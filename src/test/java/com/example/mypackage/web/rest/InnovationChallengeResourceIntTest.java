package com.example.mypackage.web.rest;

import com.example.mypackage.InnovationPortalApp;

import com.example.mypackage.domain.InnovationChallenge;
import com.example.mypackage.repository.InnovationChallengeRepository;
import com.example.mypackage.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.example.mypackage.web.rest.TestUtil.sameInstant;
import static com.example.mypackage.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InnovationChallengeResource REST controller.
 *
 * @see InnovationChallengeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InnovationPortalApp.class)
public class InnovationChallengeResourceIntTest {

    private static final String DEFAULT_CHALLENGE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CHALLENGE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CHALLENGE_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_CHALLENGE_DESCRIPTION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    @Autowired
    private InnovationChallengeRepository innovationChallengeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInnovationChallengeMockMvc;

    private InnovationChallenge innovationChallenge;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InnovationChallengeResource innovationChallengeResource = new InnovationChallengeResource(innovationChallengeRepository);
        this.restInnovationChallengeMockMvc = MockMvcBuilders.standaloneSetup(innovationChallengeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InnovationChallenge createEntity(EntityManager em) {
        InnovationChallenge innovationChallenge = new InnovationChallenge()
            .challengeName(DEFAULT_CHALLENGE_NAME)
            .challengeDescription(DEFAULT_CHALLENGE_DESCRIPTION)
            .dateCreated(DEFAULT_DATE_CREATED)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .createdBy(DEFAULT_CREATED_BY);
        return innovationChallenge;
    }

    @Before
    public void initTest() {
        innovationChallenge = createEntity(em);
    }

    @Test
    @Transactional
    public void createInnovationChallenge() throws Exception {
        int databaseSizeBeforeCreate = innovationChallengeRepository.findAll().size();

        // Create the InnovationChallenge
        restInnovationChallengeMockMvc.perform(post("/api/innovation-challenges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(innovationChallenge)))
            .andExpect(status().isCreated());

        // Validate the InnovationChallenge in the database
        List<InnovationChallenge> innovationChallengeList = innovationChallengeRepository.findAll();
        assertThat(innovationChallengeList).hasSize(databaseSizeBeforeCreate + 1);
        InnovationChallenge testInnovationChallenge = innovationChallengeList.get(innovationChallengeList.size() - 1);
        assertThat(testInnovationChallenge.getChallengeName()).isEqualTo(DEFAULT_CHALLENGE_NAME);
        assertThat(testInnovationChallenge.getChallengeDescription()).isEqualTo(DEFAULT_CHALLENGE_DESCRIPTION);
        assertThat(testInnovationChallenge.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testInnovationChallenge.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testInnovationChallenge.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testInnovationChallenge.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
    }

    @Test
    @Transactional
    public void createInnovationChallengeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = innovationChallengeRepository.findAll().size();

        // Create the InnovationChallenge with an existing ID
        innovationChallenge.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInnovationChallengeMockMvc.perform(post("/api/innovation-challenges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(innovationChallenge)))
            .andExpect(status().isBadRequest());

        // Validate the InnovationChallenge in the database
        List<InnovationChallenge> innovationChallengeList = innovationChallengeRepository.findAll();
        assertThat(innovationChallengeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInnovationChallenges() throws Exception {
        // Initialize the database
        innovationChallengeRepository.saveAndFlush(innovationChallenge);

        // Get all the innovationChallengeList
        restInnovationChallengeMockMvc.perform(get("/api/innovation-challenges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(innovationChallenge.getId().intValue())))
            .andExpect(jsonPath("$.[*].challengeName").value(hasItem(DEFAULT_CHALLENGE_NAME.toString())))
            .andExpect(jsonPath("$.[*].challengeDescription").value(hasItem(DEFAULT_CHALLENGE_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(sameInstant(DEFAULT_DATE_CREATED))))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())));
    }

    @Test
    @Transactional
    public void getInnovationChallenge() throws Exception {
        // Initialize the database
        innovationChallengeRepository.saveAndFlush(innovationChallenge);

        // Get the innovationChallenge
        restInnovationChallengeMockMvc.perform(get("/api/innovation-challenges/{id}", innovationChallenge.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(innovationChallenge.getId().intValue()))
            .andExpect(jsonPath("$.challengeName").value(DEFAULT_CHALLENGE_NAME.toString()))
            .andExpect(jsonPath("$.challengeDescription").value(DEFAULT_CHALLENGE_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dateCreated").value(sameInstant(DEFAULT_DATE_CREATED)))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInnovationChallenge() throws Exception {
        // Get the innovationChallenge
        restInnovationChallengeMockMvc.perform(get("/api/innovation-challenges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInnovationChallenge() throws Exception {
        // Initialize the database
        innovationChallengeRepository.saveAndFlush(innovationChallenge);
        int databaseSizeBeforeUpdate = innovationChallengeRepository.findAll().size();

        // Update the innovationChallenge
        InnovationChallenge updatedInnovationChallenge = innovationChallengeRepository.findOne(innovationChallenge.getId());
        // Disconnect from session so that the updates on updatedInnovationChallenge are not directly saved in db
        em.detach(updatedInnovationChallenge);
        updatedInnovationChallenge
            .challengeName(UPDATED_CHALLENGE_NAME)
            .challengeDescription(UPDATED_CHALLENGE_DESCRIPTION)
            .dateCreated(UPDATED_DATE_CREATED)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .createdBy(UPDATED_CREATED_BY);

        restInnovationChallengeMockMvc.perform(put("/api/innovation-challenges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInnovationChallenge)))
            .andExpect(status().isOk());

        // Validate the InnovationChallenge in the database
        List<InnovationChallenge> innovationChallengeList = innovationChallengeRepository.findAll();
        assertThat(innovationChallengeList).hasSize(databaseSizeBeforeUpdate);
        InnovationChallenge testInnovationChallenge = innovationChallengeList.get(innovationChallengeList.size() - 1);
        assertThat(testInnovationChallenge.getChallengeName()).isEqualTo(UPDATED_CHALLENGE_NAME);
        assertThat(testInnovationChallenge.getChallengeDescription()).isEqualTo(UPDATED_CHALLENGE_DESCRIPTION);
        assertThat(testInnovationChallenge.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testInnovationChallenge.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testInnovationChallenge.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testInnovationChallenge.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingInnovationChallenge() throws Exception {
        int databaseSizeBeforeUpdate = innovationChallengeRepository.findAll().size();

        // Create the InnovationChallenge

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInnovationChallengeMockMvc.perform(put("/api/innovation-challenges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(innovationChallenge)))
            .andExpect(status().isCreated());

        // Validate the InnovationChallenge in the database
        List<InnovationChallenge> innovationChallengeList = innovationChallengeRepository.findAll();
        assertThat(innovationChallengeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInnovationChallenge() throws Exception {
        // Initialize the database
        innovationChallengeRepository.saveAndFlush(innovationChallenge);
        int databaseSizeBeforeDelete = innovationChallengeRepository.findAll().size();

        // Get the innovationChallenge
        restInnovationChallengeMockMvc.perform(delete("/api/innovation-challenges/{id}", innovationChallenge.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InnovationChallenge> innovationChallengeList = innovationChallengeRepository.findAll();
        assertThat(innovationChallengeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InnovationChallenge.class);
        InnovationChallenge innovationChallenge1 = new InnovationChallenge();
        innovationChallenge1.setId(1L);
        InnovationChallenge innovationChallenge2 = new InnovationChallenge();
        innovationChallenge2.setId(innovationChallenge1.getId());
        assertThat(innovationChallenge1).isEqualTo(innovationChallenge2);
        innovationChallenge2.setId(2L);
        assertThat(innovationChallenge1).isNotEqualTo(innovationChallenge2);
        innovationChallenge1.setId(null);
        assertThat(innovationChallenge1).isNotEqualTo(innovationChallenge2);
    }
}

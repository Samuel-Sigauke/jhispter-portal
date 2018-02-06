package com.example.mypackage.web.rest;

import com.example.mypackage.InnovationPortalApp;

import com.example.mypackage.domain.Idea;
import com.example.mypackage.repository.IdeaRepository;
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
 * Test class for the IdeaResource REST controller.
 *
 * @see IdeaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InnovationPortalApp.class)
public class IdeaResourceIntTest {

    private static final String DEFAULT_IDEA_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_IDEA_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_IDEA_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_IDEA_SUMMARY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_POSTED_BY = "AAAAAAAAAA";
    private static final String UPDATED_POSTED_BY = "BBBBBBBBBB";

    @Autowired
    private IdeaRepository ideaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIdeaMockMvc;

    private Idea idea;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IdeaResource ideaResource = new IdeaResource(ideaRepository);
        this.restIdeaMockMvc = MockMvcBuilders.standaloneSetup(ideaResource)
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
    public static Idea createEntity(EntityManager em) {
        Idea idea = new Idea()
            .ideaTitle(DEFAULT_IDEA_TITLE)
            .ideaSummary(DEFAULT_IDEA_SUMMARY)
            .dateCreated(DEFAULT_DATE_CREATED)
            .postedBy(DEFAULT_POSTED_BY);
        return idea;
    }

    @Before
    public void initTest() {
        idea = createEntity(em);
    }

    @Test
    @Transactional
    public void createIdea() throws Exception {
        int databaseSizeBeforeCreate = ideaRepository.findAll().size();

        // Create the Idea
        restIdeaMockMvc.perform(post("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(idea)))
            .andExpect(status().isCreated());

        // Validate the Idea in the database
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeCreate + 1);
        Idea testIdea = ideaList.get(ideaList.size() - 1);
        assertThat(testIdea.getIdeaTitle()).isEqualTo(DEFAULT_IDEA_TITLE);
        assertThat(testIdea.getIdeaSummary()).isEqualTo(DEFAULT_IDEA_SUMMARY);
        assertThat(testIdea.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testIdea.getPostedBy()).isEqualTo(DEFAULT_POSTED_BY);
    }

    @Test
    @Transactional
    public void createIdeaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ideaRepository.findAll().size();

        // Create the Idea with an existing ID
        idea.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIdeaMockMvc.perform(post("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(idea)))
            .andExpect(status().isBadRequest());

        // Validate the Idea in the database
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIdeas() throws Exception {
        // Initialize the database
        ideaRepository.saveAndFlush(idea);

        // Get all the ideaList
        restIdeaMockMvc.perform(get("/api/ideas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(idea.getId().intValue())))
            .andExpect(jsonPath("$.[*].ideaTitle").value(hasItem(DEFAULT_IDEA_TITLE.toString())))
            .andExpect(jsonPath("$.[*].ideaSummary").value(hasItem(DEFAULT_IDEA_SUMMARY.toString())))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(sameInstant(DEFAULT_DATE_CREATED))))
            .andExpect(jsonPath("$.[*].postedBy").value(hasItem(DEFAULT_POSTED_BY.toString())));
    }

    @Test
    @Transactional
    public void getIdea() throws Exception {
        // Initialize the database
        ideaRepository.saveAndFlush(idea);

        // Get the idea
        restIdeaMockMvc.perform(get("/api/ideas/{id}", idea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(idea.getId().intValue()))
            .andExpect(jsonPath("$.ideaTitle").value(DEFAULT_IDEA_TITLE.toString()))
            .andExpect(jsonPath("$.ideaSummary").value(DEFAULT_IDEA_SUMMARY.toString()))
            .andExpect(jsonPath("$.dateCreated").value(sameInstant(DEFAULT_DATE_CREATED)))
            .andExpect(jsonPath("$.postedBy").value(DEFAULT_POSTED_BY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIdea() throws Exception {
        // Get the idea
        restIdeaMockMvc.perform(get("/api/ideas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIdea() throws Exception {
        // Initialize the database
        ideaRepository.saveAndFlush(idea);
        int databaseSizeBeforeUpdate = ideaRepository.findAll().size();

        // Update the idea
        Idea updatedIdea = ideaRepository.findOne(idea.getId());
        // Disconnect from session so that the updates on updatedIdea are not directly saved in db
        em.detach(updatedIdea);
        updatedIdea
            .ideaTitle(UPDATED_IDEA_TITLE)
            .ideaSummary(UPDATED_IDEA_SUMMARY)
            .dateCreated(UPDATED_DATE_CREATED)
            .postedBy(UPDATED_POSTED_BY);

        restIdeaMockMvc.perform(put("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIdea)))
            .andExpect(status().isOk());

        // Validate the Idea in the database
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeUpdate);
        Idea testIdea = ideaList.get(ideaList.size() - 1);
        assertThat(testIdea.getIdeaTitle()).isEqualTo(UPDATED_IDEA_TITLE);
        assertThat(testIdea.getIdeaSummary()).isEqualTo(UPDATED_IDEA_SUMMARY);
        assertThat(testIdea.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testIdea.getPostedBy()).isEqualTo(UPDATED_POSTED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingIdea() throws Exception {
        int databaseSizeBeforeUpdate = ideaRepository.findAll().size();

        // Create the Idea

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIdeaMockMvc.perform(put("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(idea)))
            .andExpect(status().isCreated());

        // Validate the Idea in the database
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIdea() throws Exception {
        // Initialize the database
        ideaRepository.saveAndFlush(idea);
        int databaseSizeBeforeDelete = ideaRepository.findAll().size();

        // Get the idea
        restIdeaMockMvc.perform(delete("/api/ideas/{id}", idea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Idea.class);
        Idea idea1 = new Idea();
        idea1.setId(1L);
        Idea idea2 = new Idea();
        idea2.setId(idea1.getId());
        assertThat(idea1).isEqualTo(idea2);
        idea2.setId(2L);
        assertThat(idea1).isNotEqualTo(idea2);
        idea1.setId(null);
        assertThat(idea1).isNotEqualTo(idea2);
    }
}

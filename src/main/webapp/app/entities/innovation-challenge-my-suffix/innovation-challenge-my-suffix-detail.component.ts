import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationChallengeMySuffix } from './innovation-challenge-my-suffix.model';
import { InnovationChallengeMySuffixService } from './innovation-challenge-my-suffix.service';

@Component({
    selector: 'jhi-innovation-challenge-my-suffix-detail',
    templateUrl: './innovation-challenge-my-suffix-detail.component.html'
})
export class InnovationChallengeMySuffixDetailComponent implements OnInit, OnDestroy {

    innovationChallenge: InnovationChallengeMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private innovationChallengeService: InnovationChallengeMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInnovationChallenges();
    }

    load(id) {
        this.innovationChallengeService.find(id).subscribe((innovationChallenge) => {
            this.innovationChallenge = innovationChallenge;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInnovationChallenges() {
        this.eventSubscriber = this.eventManager.subscribe(
            'innovationChallengeListModification',
            (response) => this.load(this.innovationChallenge.id)
        );
    }
}

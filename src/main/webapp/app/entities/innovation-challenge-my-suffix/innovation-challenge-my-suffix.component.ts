import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InnovationChallengeMySuffix } from './innovation-challenge-my-suffix.model';
import { InnovationChallengeMySuffixService } from './innovation-challenge-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-innovation-challenge-my-suffix',
    templateUrl: './innovation-challenge-my-suffix.component.html'
})
export class InnovationChallengeMySuffixComponent implements OnInit, OnDestroy {
innovationChallenges: InnovationChallengeMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private innovationChallengeService: InnovationChallengeMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.innovationChallengeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.innovationChallenges = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInnovationChallenges();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InnovationChallengeMySuffix) {
        return item.id;
    }
    registerChangeInInnovationChallenges() {
        this.eventSubscriber = this.eventManager.subscribe('innovationChallengeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

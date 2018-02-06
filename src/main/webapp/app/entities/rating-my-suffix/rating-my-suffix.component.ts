import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RatingMySuffix } from './rating-my-suffix.model';
import { RatingMySuffixService } from './rating-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rating-my-suffix',
    templateUrl: './rating-my-suffix.component.html'
})
export class RatingMySuffixComponent implements OnInit, OnDestroy {
ratings: RatingMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ratingService: RatingMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ratingService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ratings = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRatings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RatingMySuffix) {
        return item.id;
    }
    registerChangeInRatings() {
        this.eventSubscriber = this.eventManager.subscribe('ratingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

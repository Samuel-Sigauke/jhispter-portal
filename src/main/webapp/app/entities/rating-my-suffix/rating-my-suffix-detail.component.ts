import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RatingMySuffix } from './rating-my-suffix.model';
import { RatingMySuffixService } from './rating-my-suffix.service';

@Component({
    selector: 'jhi-rating-my-suffix-detail',
    templateUrl: './rating-my-suffix-detail.component.html'
})
export class RatingMySuffixDetailComponent implements OnInit, OnDestroy {

    rating: RatingMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ratingService: RatingMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRatings();
    }

    load(id) {
        this.ratingService.find(id).subscribe((rating) => {
            this.rating = rating;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRatings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ratingListModification',
            (response) => this.load(this.rating.id)
        );
    }
}

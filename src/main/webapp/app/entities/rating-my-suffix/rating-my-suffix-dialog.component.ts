import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RatingMySuffix } from './rating-my-suffix.model';
import { RatingMySuffixPopupService } from './rating-my-suffix-popup.service';
import { RatingMySuffixService } from './rating-my-suffix.service';
import { IdeaMySuffix, IdeaMySuffixService } from '../idea-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rating-my-suffix-dialog',
    templateUrl: './rating-my-suffix-dialog.component.html'
})
export class RatingMySuffixDialogComponent implements OnInit {

    rating: RatingMySuffix;
    isSaving: boolean;

    ideas: IdeaMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ratingService: RatingMySuffixService,
        private ideaService: IdeaMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ideaService.query()
            .subscribe((res: ResponseWrapper) => { this.ideas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rating.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ratingService.update(this.rating));
        } else {
            this.subscribeToSaveResponse(
                this.ratingService.create(this.rating));
        }
    }

    private subscribeToSaveResponse(result: Observable<RatingMySuffix>) {
        result.subscribe((res: RatingMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RatingMySuffix) {
        this.eventManager.broadcast({ name: 'ratingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackIdeaById(index: number, item: IdeaMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rating-my-suffix-popup',
    template: ''
})
export class RatingMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratingPopupService: RatingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ratingPopupService
                    .open(RatingMySuffixDialogComponent as Component, params['id']);
            } else {
                this.ratingPopupService
                    .open(RatingMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

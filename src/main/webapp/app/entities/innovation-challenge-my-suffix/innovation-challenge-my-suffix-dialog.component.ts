import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InnovationChallengeMySuffix } from './innovation-challenge-my-suffix.model';
import { InnovationChallengeMySuffixPopupService } from './innovation-challenge-my-suffix-popup.service';
import { InnovationChallengeMySuffixService } from './innovation-challenge-my-suffix.service';
import { CategoryMySuffix, CategoryMySuffixService } from '../category-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-innovation-challenge-my-suffix-dialog',
    templateUrl: './innovation-challenge-my-suffix-dialog.component.html'
})
export class InnovationChallengeMySuffixDialogComponent implements OnInit {

    innovationChallenge: InnovationChallengeMySuffix;
    isSaving: boolean;

    categories: CategoryMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private innovationChallengeService: InnovationChallengeMySuffixService,
        private categoryService: CategoryMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoryService.query()
            .subscribe((res: ResponseWrapper) => { this.categories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.innovationChallenge.id !== undefined) {
            this.subscribeToSaveResponse(
                this.innovationChallengeService.update(this.innovationChallenge));
        } else {
            this.subscribeToSaveResponse(
                this.innovationChallengeService.create(this.innovationChallenge));
        }
    }

    private subscribeToSaveResponse(result: Observable<InnovationChallengeMySuffix>) {
        result.subscribe((res: InnovationChallengeMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: InnovationChallengeMySuffix) {
        this.eventManager.broadcast({ name: 'innovationChallengeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryById(index: number, item: CategoryMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-innovation-challenge-my-suffix-popup',
    template: ''
})
export class InnovationChallengeMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private innovationChallengePopupService: InnovationChallengeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.innovationChallengePopupService
                    .open(InnovationChallengeMySuffixDialogComponent as Component, params['id']);
            } else {
                this.innovationChallengePopupService
                    .open(InnovationChallengeMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

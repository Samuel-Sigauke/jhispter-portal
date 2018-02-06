import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RatingMySuffix } from './rating-my-suffix.model';
import { RatingMySuffixPopupService } from './rating-my-suffix-popup.service';
import { RatingMySuffixService } from './rating-my-suffix.service';

@Component({
    selector: 'jhi-rating-my-suffix-delete-dialog',
    templateUrl: './rating-my-suffix-delete-dialog.component.html'
})
export class RatingMySuffixDeleteDialogComponent {

    rating: RatingMySuffix;

    constructor(
        private ratingService: RatingMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ratingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ratingListModification',
                content: 'Deleted an rating'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rating-my-suffix-delete-popup',
    template: ''
})
export class RatingMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratingPopupService: RatingMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ratingPopupService
                .open(RatingMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

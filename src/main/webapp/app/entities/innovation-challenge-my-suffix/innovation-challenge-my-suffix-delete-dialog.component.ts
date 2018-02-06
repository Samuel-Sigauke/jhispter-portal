import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InnovationChallengeMySuffix } from './innovation-challenge-my-suffix.model';
import { InnovationChallengeMySuffixPopupService } from './innovation-challenge-my-suffix-popup.service';
import { InnovationChallengeMySuffixService } from './innovation-challenge-my-suffix.service';

@Component({
    selector: 'jhi-innovation-challenge-my-suffix-delete-dialog',
    templateUrl: './innovation-challenge-my-suffix-delete-dialog.component.html'
})
export class InnovationChallengeMySuffixDeleteDialogComponent {

    innovationChallenge: InnovationChallengeMySuffix;

    constructor(
        private innovationChallengeService: InnovationChallengeMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.innovationChallengeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'innovationChallengeListModification',
                content: 'Deleted an innovationChallenge'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-innovation-challenge-my-suffix-delete-popup',
    template: ''
})
export class InnovationChallengeMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private innovationChallengePopupService: InnovationChallengeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.innovationChallengePopupService
                .open(InnovationChallengeMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

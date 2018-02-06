import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProcessImprovementMySuffix } from './process-improvement-my-suffix.model';
import { ProcessImprovementMySuffixPopupService } from './process-improvement-my-suffix-popup.service';
import { ProcessImprovementMySuffixService } from './process-improvement-my-suffix.service';

@Component({
    selector: 'jhi-process-improvement-my-suffix-delete-dialog',
    templateUrl: './process-improvement-my-suffix-delete-dialog.component.html'
})
export class ProcessImprovementMySuffixDeleteDialogComponent {

    processImprovement: ProcessImprovementMySuffix;

    constructor(
        private processImprovementService: ProcessImprovementMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.processImprovementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'processImprovementListModification',
                content: 'Deleted an processImprovement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-process-improvement-my-suffix-delete-popup',
    template: ''
})
export class ProcessImprovementMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private processImprovementPopupService: ProcessImprovementMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.processImprovementPopupService
                .open(ProcessImprovementMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

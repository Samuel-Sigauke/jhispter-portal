import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProcessImprovementMySuffix } from './process-improvement-my-suffix.model';
import { ProcessImprovementMySuffixPopupService } from './process-improvement-my-suffix-popup.service';
import { ProcessImprovementMySuffixService } from './process-improvement-my-suffix.service';

@Component({
    selector: 'jhi-process-improvement-my-suffix-dialog',
    templateUrl: './process-improvement-my-suffix-dialog.component.html'
})
export class ProcessImprovementMySuffixDialogComponent implements OnInit {

    processImprovement: ProcessImprovementMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private processImprovementService: ProcessImprovementMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.processImprovement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.processImprovementService.update(this.processImprovement));
        } else {
            this.subscribeToSaveResponse(
                this.processImprovementService.create(this.processImprovement));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProcessImprovementMySuffix>) {
        result.subscribe((res: ProcessImprovementMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProcessImprovementMySuffix) {
        this.eventManager.broadcast({ name: 'processImprovementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-process-improvement-my-suffix-popup',
    template: ''
})
export class ProcessImprovementMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private processImprovementPopupService: ProcessImprovementMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.processImprovementPopupService
                    .open(ProcessImprovementMySuffixDialogComponent as Component, params['id']);
            } else {
                this.processImprovementPopupService
                    .open(ProcessImprovementMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

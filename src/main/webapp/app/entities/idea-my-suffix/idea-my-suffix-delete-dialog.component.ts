import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IdeaMySuffix } from './idea-my-suffix.model';
import { IdeaMySuffixPopupService } from './idea-my-suffix-popup.service';
import { IdeaMySuffixService } from './idea-my-suffix.service';

@Component({
    selector: 'jhi-idea-my-suffix-delete-dialog',
    templateUrl: './idea-my-suffix-delete-dialog.component.html'
})
export class IdeaMySuffixDeleteDialogComponent {

    idea: IdeaMySuffix;

    constructor(
        private ideaService: IdeaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ideaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ideaListModification',
                content: 'Deleted an idea'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-idea-my-suffix-delete-popup',
    template: ''
})
export class IdeaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ideaPopupService: IdeaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ideaPopupService
                .open(IdeaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

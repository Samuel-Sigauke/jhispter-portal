import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommentMySuffix } from './comment-my-suffix.model';
import { CommentMySuffixPopupService } from './comment-my-suffix-popup.service';
import { CommentMySuffixService } from './comment-my-suffix.service';

@Component({
    selector: 'jhi-comment-my-suffix-delete-dialog',
    templateUrl: './comment-my-suffix-delete-dialog.component.html'
})
export class CommentMySuffixDeleteDialogComponent {

    comment: CommentMySuffix;

    constructor(
        private commentService: CommentMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commentListModification',
                content: 'Deleted an comment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comment-my-suffix-delete-popup',
    template: ''
})
export class CommentMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commentPopupService
                .open(CommentMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

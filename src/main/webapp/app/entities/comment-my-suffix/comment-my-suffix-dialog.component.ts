import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommentMySuffix } from './comment-my-suffix.model';
import { CommentMySuffixPopupService } from './comment-my-suffix-popup.service';
import { CommentMySuffixService } from './comment-my-suffix.service';
import { IdeaMySuffix, IdeaMySuffixService } from '../idea-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-comment-my-suffix-dialog',
    templateUrl: './comment-my-suffix-dialog.component.html'
})
export class CommentMySuffixDialogComponent implements OnInit {

    comment: CommentMySuffix;
    isSaving: boolean;

    ideas: IdeaMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private commentService: CommentMySuffixService,
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
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(
                this.commentService.create(this.comment));
        }
    }

    private subscribeToSaveResponse(result: Observable<CommentMySuffix>) {
        result.subscribe((res: CommentMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CommentMySuffix) {
        this.eventManager.broadcast({ name: 'commentListModification', content: 'OK'});
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
    selector: 'jhi-comment-my-suffix-popup',
    template: ''
})
export class CommentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commentPopupService
                    .open(CommentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.commentPopupService
                    .open(CommentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

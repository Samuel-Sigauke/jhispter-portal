import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommentMySuffix } from './comment-my-suffix.model';
import { CommentMySuffixService } from './comment-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-comment-my-suffix',
    templateUrl: './comment-my-suffix.component.html'
})
export class CommentMySuffixComponent implements OnInit, OnDestroy {
    comments: CommentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private commentService: CommentMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.commentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.comments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInComments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CommentMySuffix) {
        return item.id;
    }
    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe('commentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

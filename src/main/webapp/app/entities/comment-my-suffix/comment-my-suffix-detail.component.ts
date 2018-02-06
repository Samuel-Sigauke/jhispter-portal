import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CommentMySuffix } from './comment-my-suffix.model';
import { CommentMySuffixService } from './comment-my-suffix.service';

@Component({
    selector: 'jhi-comment-my-suffix-detail',
    templateUrl: './comment-my-suffix-detail.component.html'
})
export class CommentMySuffixDetailComponent implements OnInit, OnDestroy {

    comment: CommentMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commentService: CommentMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComments();
    }

    load(id) {
        this.commentService.find(id).subscribe((comment) => {
            this.comment = comment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commentListModification',
            (response) => this.load(this.comment.id)
        );
    }
}

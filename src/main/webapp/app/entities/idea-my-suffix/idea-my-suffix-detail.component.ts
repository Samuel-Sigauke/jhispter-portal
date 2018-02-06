import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IdeaMySuffix } from './idea-my-suffix.model';
import { IdeaMySuffixService } from './idea-my-suffix.service';
import {AccountService, ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';
import {CommentMySuffix} from '../comment-my-suffix/comment-my-suffix.model';
import {CommentMySuffixService} from '../comment-my-suffix/comment-my-suffix.service';

@Component({
    selector: 'jhi-idea-my-suffix-detail',
    templateUrl: './idea-my-suffix-detail.component.html'
})
export class IdeaMySuffixDetailComponent implements OnInit, OnDestroy {
    newComment: string;
    idea: IdeaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    loginUser: any;

    constructor(
        private eventManager: JhiEventManager,
        private ideaService: IdeaMySuffixService,
        private route: ActivatedRoute,
        private accountService: AccountService,
        private commentMySuffixService:CommentMySuffixService,
    ) {
        accountService.get().subscribe((resp)=> {
        this.loginUser=resp;
        console.log(this.loginUser=resp)
      });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIdeas();
    }

    load(id) {
        this.ideaService.find(id).subscribe((idea) => {
            this.idea = idea;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
    sendComment(idea){
      console.log("Method Being called")
      let comment = new CommentMySuffix(
        null,
        this.newComment,
        new Date(),
        this.loginUser.login,
        this.idea,


      );

      this.commentMySuffixService.create(comment).subscribe((resp) => {
          console.log(resp);
      });

    }

    registerChangeInIdeas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ideaListModification',
            (response) => this.load(this.idea.id)
        );
    }
}

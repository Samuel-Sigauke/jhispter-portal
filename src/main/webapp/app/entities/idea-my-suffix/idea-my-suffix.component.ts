import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IdeaMySuffix } from './idea-my-suffix.model';
import { IdeaMySuffixService } from './idea-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';
import {CommentMySuffix} from '../comment-my-suffix/comment-my-suffix.model';
import {CommentMySuffixService} from '../comment-my-suffix/comment-my-suffix.service';
import {RatingMySuffix, RatingPoints} from '../rating-my-suffix/rating-my-suffix.model';
import {RatingMySuffixService} from '../rating-my-suffix/rating-my-suffix.service';

@Component({
    selector: 'jhi-idea-my-suffix',
    templateUrl: './idea-my-suffix.component.html'
})
export class IdeaMySuffixComponent implements OnInit, OnDestroy {
ideas: IdeaMySuffix[];
comments:CommentMySuffix[];
countComments: any;
countRating: any;
    currentAccount: any;
    eventSubscriber: Subscription;





    constructor(
        private ideaService: IdeaMySuffixService,
      //  private ideaMySuffixService: IdeaMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private commentMySuffixService:CommentMySuffixService,
        private ratingMySuffixService:RatingMySuffixService

    ) {
    }
    loadAll() {
        this.ideaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ideas = res.json;
               this.sortingIdeas();
               this.loadComments();
               this.loadRatings();
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIdeas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IdeaMySuffix) {
        return item.id;
    }
    registerChangeInIdeas() {
        this.eventSubscriber = this.eventManager.subscribe('ideaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    sortingIdeas(){
      this.ideaService.query().subscribe((resp)=>{
        console.log('rter', resp.json);
        this.ideas = resp.json.filter((idea) => {
          return this.ideas;
        });
        this.ideas.sort(
          (ide1, ide2) => { return ide1.dateCreated < ide2.dateCreated ? 1 : -1; }
        );
      });
    }

    loadComments() {
        this.commentMySuffixService.query().subscribe((resp)=> {
          console.log('AllComments',resp.json);
          let ideaCommentsLength = { }
          for (let comment of resp.json ){
            if ( ideaCommentsLength[comment.idea.id] ){
              ideaCommentsLength[comment.idea.id] += 1
            }else {
              ideaCommentsLength[comment.idea.id] = 1
            }
          }
          console.log('New Map', ideaCommentsLength);
          this.countComments = ideaCommentsLength;
        });

      }

      loadRatings() {
          this.ratingMySuffixService.query().subscribe((resp)=> {
            console.log('AllRatings',resp.json);
            let ideaRatingsLength = { }
            for (let rating of resp.json ){
              if ( ideaRatingsLength[rating.idea.id] ){
                ideaRatingsLength[rating.idea.id] += 1
              }else {
                ideaRatingsLength[rating.idea.id] = 1
              }
            }
            console.log('Rating Map', ideaRatingsLength);
            this.countRating = ideaRatingsLength;
          });

        }

    /*sendDate(){
        let newdate = new IdeaMySuffix(
          null,
          new Date()
        );
        this.IdeaMySuffixService.create(newdate).subscribe((resp) => {
            console.log(resp);
        });
    }*/

}

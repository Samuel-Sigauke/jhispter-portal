import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';
import { IdeaMySuffix } from './idea-my-suffix.model';
import { IdeaMySuffixService } from './idea-my-suffix.service';
import {AccountService, ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';
import {CommentMySuffix} from '../comment-my-suffix/comment-my-suffix.model';
import {CommentMySuffixService} from '../comment-my-suffix/comment-my-suffix.service';
import { OnRatingChangeEven } from 'angular-star-rating';
import {RatingMySuffix, RatingPoints} from '../rating-my-suffix/rating-my-suffix.model';
import {RatingMySuffixService} from '../rating-my-suffix/rating-my-suffix.service';


@Component({
    selector: 'jhi-idea-my-suffix-detail',
    templateUrl: './idea-my-suffix-detail.component.html'
})
export class IdeaMySuffixDetailComponent implements OnInit, OnDestroy {
    newComment: string;
    newRating = 1;
    idea: IdeaMySuffix;
    comments:CommentMySuffix[];
    ratings:RatingMySuffix[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    loginUser: any;
    myrating: any;

    constructor(
        private eventManager: JhiEventManager,
        private ideaService: IdeaMySuffixService,
        private route: ActivatedRoute,
        private accountService: AccountService,
        private commentMySuffixService:CommentMySuffixService,
        private ratingMySuffixService:RatingMySuffixService,

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
            this.loadComments();
            this.loadRatings();


        });
    }
    previousState() {
        window.history.back();
    }

    loadRatings(){
    this.ratingMySuffixService.query().subscribe((resp)=>{
      console.log('RATINGS', resp.json);
      this.ratings = resp.json.filter((rating)=>{
       return rating.idea.id=== this.idea.id;
     });
     console.log("RATE ONCE", this.ratings);
     /*for (let rating of this.ratings) {
       if (rating.ratedBy === this.loginUser.login){
         this.myrating = rating;
          console.log("rated By Me", this.myrating);
         break;
       }
     }*/
   });

    }

   loadComments(){
    this.commentMySuffixService.query().subscribe((resp)=>{
      console.log('rter', resp.json);
      this.comments = resp.json.filter((comment) => {
        return comment.idea.id===this.idea.id;

      });
      this.comments.sort(
        (cmt1, cmt2) => { return cmt1.datePosted < cmt2.datePosted ? 1 : -1; }
      );

    });
  }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
    sendComment(idea){
        console.log('Method Being called')
        let comment = new CommentMySuffix(
          null,
          this.newComment,
          new Date(),
          //moment().startOf('hour').fromNow(),
          this.loginUser.login,
          this.idea,

        );
        this.commentMySuffixService.create(comment).subscribe((resp) => {
            console.log(resp);
            this.loadComments();
            this.newComment = '';
        });
    }
    onRatingChange = ($event:OnRatingChangeEven) => {
        console.log('onRatingUpdated $event: ', $event);
        console.log('Event.Rating: ', $event.rating);
        console.log('AAAAAAAAAAAAAAAAAA', RatingPoints.ONE)
        if(this.myrating ){ // the logged in user has rated this idea so we are updating instead of creating new
          this.ratingMySuffixService.update(this.myrating).subscribe((resp) => {
            console.log(resp);
            this.loadRatings();
          //this.newRating = null;
          });
        }
        this.newRating = $event.rating;
        console.log('New Rates',this.newRating)
        let rating = new RatingMySuffix(
          null,
          this.newRating-1,
          this.loginUser.login,
          new Date(),
          this.idea
        );
      this.ratingMySuffixService.create(rating).subscribe((resp) => {
        console.log(resp);
        this.loadRatings();
      //this.newRating = null;
      });


      /*  let rating = new RatingMySuffix(
          null,
          this.new
        )*/
    }
    registerChangeInIdeas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ideaListModification',
            (response) => this.load(this.idea.id)
        );
    }
}

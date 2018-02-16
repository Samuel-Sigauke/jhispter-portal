import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IdeaMySuffix } from './idea-my-suffix.model';
import { IdeaMySuffixPopupService } from './idea-my-suffix-popup.service';
import { IdeaMySuffixService } from './idea-my-suffix.service';
import { InnovationChallengeMySuffix, InnovationChallengeMySuffixService } from '../innovation-challenge-my-suffix';
// import { ResponseWrapper } from '../../shared';
import {AccountService, ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';
@Component({
    selector: 'jhi-idea-my-suffix-dialog',
    templateUrl: './idea-my-suffix-dialog.component.html'
})
export class IdeaMySuffixDialogComponent implements OnInit {

    idea: IdeaMySuffix;
    isSaving: boolean;
    loginUser: any;

    innovationchallenges: InnovationChallengeMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ideaService: IdeaMySuffixService,
        private innovationChallengeService: InnovationChallengeMySuffixService,
        private eventManager: JhiEventManager,
        private accountService: AccountService
    ) {

        accountService.get().subscribe((resp)=> {
             this.loginUser=resp;
             console.log(this.loginUser=resp)
             this.idea.postedBy = this.loginUser.login;
      });
    }

    ngOnInit() {
        this.isSaving = false;
        this.idea.dateCreated = new Date();




        this.innovationChallengeService.query()
            .subscribe((res: ResponseWrapper) => { this.innovationchallenges = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;

        if (this.idea.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ideaService.update(this.idea));
        } else {

          console.log("date", this.idea)
          console.log("postedby", this.idea)
            this.subscribeToSaveResponse(
                this.ideaService.create(this.idea));
        }
    }

    private subscribeToSaveResponse(result: Observable<IdeaMySuffix>) {
        result.subscribe((res: IdeaMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: IdeaMySuffix) {
        this.eventManager.broadcast({ name: 'ideaListModification', content: 'OK'});
        this.isSaving = false;
        new Date();
        this.loginUser.login;
        this.activeModal.dismiss(result);

    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInnovationChallengeById(index: number, item: InnovationChallengeMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-idea-my-suffix-popup',
    template: ''
})
export class IdeaMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ideaPopupService: IdeaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ideaPopupService
                    .open(IdeaMySuffixDialogComponent as Component, params['id']);
            } else {
                this.ideaPopupService
                    .open(IdeaMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

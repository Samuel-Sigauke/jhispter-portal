import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IdeaMySuffix } from './idea-my-suffix.model';
import { IdeaMySuffixService } from './idea-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-idea-my-suffix',
    templateUrl: './idea-my-suffix.component.html'
})
export class IdeaMySuffixComponent implements OnInit, OnDestroy {
ideas: IdeaMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ideaService: IdeaMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ideaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ideas = res.json;
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
}

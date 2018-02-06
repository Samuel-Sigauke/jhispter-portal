import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProcessImprovementMySuffix } from './process-improvement-my-suffix.model';
import { ProcessImprovementMySuffixService } from './process-improvement-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-process-improvement-my-suffix',
    templateUrl: './process-improvement-my-suffix.component.html'
})
export class ProcessImprovementMySuffixComponent implements OnInit, OnDestroy {
processImprovements: ProcessImprovementMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private processImprovementService: ProcessImprovementMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.processImprovementService.query().subscribe(
            (res: ResponseWrapper) => {
                this.processImprovements = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProcessImprovements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProcessImprovementMySuffix) {
        return item.id;
    }
    registerChangeInProcessImprovements() {
        this.eventSubscriber = this.eventManager.subscribe('processImprovementListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

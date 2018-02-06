import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProcessImprovementMySuffix } from './process-improvement-my-suffix.model';
import { ProcessImprovementMySuffixService } from './process-improvement-my-suffix.service';

@Component({
    selector: 'jhi-process-improvement-my-suffix-detail',
    templateUrl: './process-improvement-my-suffix-detail.component.html'
})
export class ProcessImprovementMySuffixDetailComponent implements OnInit, OnDestroy {

    processImprovement: ProcessImprovementMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private processImprovementService: ProcessImprovementMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProcessImprovements();
    }

    load(id) {
        this.processImprovementService.find(id).subscribe((processImprovement) => {
            this.processImprovement = processImprovement;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProcessImprovements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'processImprovementListModification',
            (response) => this.load(this.processImprovement.id)
        );
    }
}

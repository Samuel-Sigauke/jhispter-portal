import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryMySuffix } from './category-my-suffix.model';
import { CategoryMySuffixPopupService } from './category-my-suffix-popup.service';
import { CategoryMySuffixService } from './category-my-suffix.service';

@Component({
    selector: 'jhi-category-my-suffix-dialog',
    templateUrl: './category-my-suffix-dialog.component.html'
})
export class CategoryMySuffixDialogComponent implements OnInit {

    category: CategoryMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private categoryService: CategoryMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoryService.update(this.category));
        } else {
            this.subscribeToSaveResponse(
                this.categoryService.create(this.category));
        }
    }

    private subscribeToSaveResponse(result: Observable<CategoryMySuffix>) {
        result.subscribe((res: CategoryMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CategoryMySuffix) {
        this.eventManager.broadcast({ name: 'categoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-category-my-suffix-popup',
    template: ''
})
export class CategoryMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoryPopupService
                    .open(CategoryMySuffixDialogComponent as Component, params['id']);
            } else {
                this.categoryPopupService
                    .open(CategoryMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryMySuffix } from './category-my-suffix.model';
import { CategoryMySuffixPopupService } from './category-my-suffix-popup.service';
import { CategoryMySuffixService } from './category-my-suffix.service';

@Component({
    selector: 'jhi-category-my-suffix-delete-dialog',
    templateUrl: './category-my-suffix-delete-dialog.component.html'
})
export class CategoryMySuffixDeleteDialogComponent {

    category: CategoryMySuffix;

    constructor(
        private categoryService: CategoryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoryListModification',
                content: 'Deleted an category'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-category-my-suffix-delete-popup',
    template: ''
})
export class CategoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoryPopupService
                .open(CategoryMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

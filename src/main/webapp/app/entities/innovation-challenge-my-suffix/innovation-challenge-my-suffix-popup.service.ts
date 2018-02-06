import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { InnovationChallengeMySuffix } from './innovation-challenge-my-suffix.model';
import { InnovationChallengeMySuffixService } from './innovation-challenge-my-suffix.service';

@Injectable()
export class InnovationChallengeMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private innovationChallengeService: InnovationChallengeMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.innovationChallengeService.find(id).subscribe((innovationChallenge) => {
                    innovationChallenge.dateCreated = this.datePipe
                        .transform(innovationChallenge.dateCreated, 'yyyy-MM-ddTHH:mm:ss');
                    innovationChallenge.startDate = this.datePipe
                        .transform(innovationChallenge.startDate, 'yyyy-MM-ddTHH:mm:ss');
                    innovationChallenge.endDate = this.datePipe
                        .transform(innovationChallenge.endDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.innovationChallengeModalRef(component, innovationChallenge);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.innovationChallengeModalRef(component, new InnovationChallengeMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    innovationChallengeModalRef(component: Component, innovationChallenge: InnovationChallengeMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.innovationChallenge = innovationChallenge;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

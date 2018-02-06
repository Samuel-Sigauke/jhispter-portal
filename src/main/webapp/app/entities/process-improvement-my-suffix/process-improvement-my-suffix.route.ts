import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProcessImprovementMySuffixComponent } from './process-improvement-my-suffix.component';
import { ProcessImprovementMySuffixDetailComponent } from './process-improvement-my-suffix-detail.component';
import { ProcessImprovementMySuffixPopupComponent } from './process-improvement-my-suffix-dialog.component';
import { ProcessImprovementMySuffixDeletePopupComponent } from './process-improvement-my-suffix-delete-dialog.component';

export const processImprovementRoute: Routes = [
    {
        path: 'process-improvement-my-suffix',
        component: ProcessImprovementMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.processImprovement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'process-improvement-my-suffix/:id',
        component: ProcessImprovementMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.processImprovement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const processImprovementPopupRoute: Routes = [
    {
        path: 'process-improvement-my-suffix-new',
        component: ProcessImprovementMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.processImprovement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'process-improvement-my-suffix/:id/edit',
        component: ProcessImprovementMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.processImprovement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'process-improvement-my-suffix/:id/delete',
        component: ProcessImprovementMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.processImprovement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

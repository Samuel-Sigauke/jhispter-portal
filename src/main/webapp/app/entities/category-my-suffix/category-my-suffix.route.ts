import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CategoryMySuffixComponent } from './category-my-suffix.component';
import { CategoryMySuffixDetailComponent } from './category-my-suffix-detail.component';
import { CategoryMySuffixPopupComponent } from './category-my-suffix-dialog.component';
import { CategoryMySuffixDeletePopupComponent } from './category-my-suffix-delete-dialog.component';

export const categoryRoute: Routes = [
    {
        path: 'category-my-suffix',
        component: CategoryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'category-my-suffix/:id',
        component: CategoryMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-my-suffix-new',
        component: CategoryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-my-suffix/:id/edit',
        component: CategoryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-my-suffix/:id/delete',
        component: CategoryMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

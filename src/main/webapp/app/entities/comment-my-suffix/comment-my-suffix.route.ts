import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CommentMySuffixComponent } from './comment-my-suffix.component';
import { CommentMySuffixDetailComponent } from './comment-my-suffix-detail.component';
import { CommentMySuffixPopupComponent } from './comment-my-suffix-dialog.component';
import { CommentMySuffixDeletePopupComponent } from './comment-my-suffix-delete-dialog.component';

export const commentRoute: Routes = [
    {
        path: 'comment-my-suffix',
        component: CommentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comment-my-suffix/:id',
        component: CommentMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentPopupRoute: Routes = [
    {
        path: 'comment-my-suffix-new',
        component: CommentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-my-suffix/:id/edit',
        component: CommentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-my-suffix/:id/delete',
        component: CommentMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'innovationPortalApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

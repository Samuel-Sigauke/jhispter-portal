import './vendor.ts';
import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { InnovationPortalSharedModule, UserRouteAccessService } from './shared';
import { InnovationPortalAppRoutingModule} from './app-routing.module';
import { InnovationPortalHomeModule } from './home/home.module';
import { InnovationPortalAdminModule } from './admin/admin.module';
import { InnovationPortalAccountModule } from './account/account.module';
import { InnovationPortalEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        InnovationPortalAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        InnovationPortalSharedModule,
        InnovationPortalHomeModule,
        InnovationPortalAdminModule,
        InnovationPortalAccountModule,
        InnovationPortalEntityModule,
        MomentModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class InnovationPortalAppModule {}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AutoComponent} from './auto/auto.component';
import {PlaceComponent} from './place/place.component';
import {GoodsComponent} from './goods/goods.component';
import {DriversComponent} from './drivers/drivers.component';
import {ListComponent} from './list/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RequestsComponent} from './requests/requests.component';
import { LoginComponent } from './login/login.component';
import { ClientOrdersListComponent } from './client-orders-list/client-orders-list.component';
import { ClientRequestsComponent } from './client-requests/client-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AutoComponent,
    PlaceComponent,
    GoodsComponent,
    DriversComponent,
    ListComponent,
    RequestsComponent,
    LoginComponent,
    ClientOrdersListComponent,
    ClientRequestsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: MainPageComponent},
      {path: 'auto', component: AutoComponent},
      {path: 'place', component: PlaceComponent},
      {path: 'goods', component: GoodsComponent},
      {path: 'drivers', component: DriversComponent},
      {path: 'list', component: ListComponent},
      {path: 'requests', component: RequestsComponent},
      {path: 'crequests', component: ClientRequestsComponent},
      {path: 'clist', component: ClientOrdersListComponent}
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

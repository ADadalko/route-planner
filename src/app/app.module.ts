import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import { AutoComponent } from './auto/auto.component';
import { PlaceComponent } from './place/place.component';
import { GoodsComponent } from './goods/goods.component';
import { DriversComponent } from './drivers/drivers.component';
import { ListComponent } from './list/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AutoComponent,
    PlaceComponent,
    GoodsComponent,
    DriversComponent,
    ListComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: '', component: MainPageComponent},
            {path: 'auto', component: AutoComponent},
            {path: 'place', component: PlaceComponent},
            {path: 'goods', component: GoodsComponent},
            {path: 'drivers', component: DriversComponent},
            {path: 'list', component: ListComponent}
        ]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

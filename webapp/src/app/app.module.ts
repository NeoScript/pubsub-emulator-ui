import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopicsComponent } from './components/topics/topics.component';

import {HttpClientModule} from '@angular/common/http';
import { IndexComponent } from './components/index/index.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    IndexComponent,
    SubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

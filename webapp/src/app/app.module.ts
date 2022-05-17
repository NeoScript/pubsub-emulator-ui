import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SubscriptionDetailsComponent } from './components/subscription-details/subscription-details.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { TopicDetailsComponent } from './components/topic-details/topic-details.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { NewTopicDialogComponent } from './components/topic-list/new-topic-dialog/new-topic-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProjectsComponent,
    NavbarComponent,
    TopicListComponent,
    SubscriptionListComponent,
    SubscriptionDetailsComponent,
    TopicDetailsComponent,
    NewTopicDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

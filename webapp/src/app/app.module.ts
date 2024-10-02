import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SubscriptionDetailsComponent } from './components/subscription-details/subscription-details.component';
import { NewSubscriptionDialogComponent } from './components/subscription-list/new-subscription-dialog/new-subscription-dialog.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { TopicDetailsComponent } from './components/topic-details/topic-details.component';
import { NewTopicDialogComponent } from './components/topic-list/new-topic-dialog/new-topic-dialog.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';




@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatStepperModule, IndexComponent,
        ProjectsComponent,
        NavbarComponent,
        TopicListComponent,
        SubscriptionListComponent,
        SubscriptionDetailsComponent,
        TopicDetailsComponent,
        NewTopicDialogComponent,
        NewSubscriptionDialogComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

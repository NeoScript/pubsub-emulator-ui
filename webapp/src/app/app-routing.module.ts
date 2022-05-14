import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './components/topics/topics.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'topics', component: TopicsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {path: '', loadComponent: () => import('./components/index/index.component').then(m => m.IndexComponent)},
  {path: 'project', loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

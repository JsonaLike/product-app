import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { AppComponent } from './app.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ProductAddComponent } from './product-add/product-add.component';

const routes: Routes = [
  {path:'',component:ProductListComponent},
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-add', component: ProductAddComponent },
  {path:'product-edit/:id',component:ProductEditComponent},
  {path:'category-list',component:CategoryListComponent},
  {path:'category-add',component:CategoryAddComponent},
  {path:'category-edit/:id',component:CategoryEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

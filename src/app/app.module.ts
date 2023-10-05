import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModalDemo } from './product-list/dialog-modal-demo/dialog-modal-demo.component';
import { DialogModule } from 'primeng/dialog';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        DialogModalDemo,
        CategoryListComponent,
        CategoryEditComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        BrowserModule,
        TableModule,
        FileUploadModule,
        DropdownModule,
        DialogModule
    ]
})
export class AppModule { }

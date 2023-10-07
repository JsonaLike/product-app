import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/app.component';
import { CategoryService } from 'src/app/category.service';
import { Product, ProductServiceService } from 'src/app/product.service';

@Component({
    selector: 'dialogM',
    templateUrl: './dialog-modal-demo.component.html',
  styleUrls: ['dialog-modal-demo.component.scss']
})
export class DialogModalDemo {
    constructor(private formBuilder: FormBuilder,private productService:ProductServiceService){}
    visible: boolean = false;
  selectedFile: File | null = null;
  selectedCategory: Category | null = null;
  @Input() products!:Product[];
  @Input() categories!:Category[];
  
    
      onFileSelected(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
          this.selectedFile = inputElement.files[0];
        }
      }
      
  dragOverHandler(event: any) {
    event.preventDefault();
  }
      myUploader(event: any) {
        event.preventDefault();
        event.stopPropagation();
        console.log('reached1');
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          this.selectedFile = files[0];
          console.log('Dropped file:', this.selectedFile);
        }
      }
     
    showDialog(): void {
      this.visible = true;
    }
}

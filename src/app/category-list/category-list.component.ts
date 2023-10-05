import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../app.component';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  categories!: Category[];
  categoryForm!: FormGroup;
  categoryModalOpen = false;


constructor(private categoryService:CategoryService,private formBuilder:FormBuilder){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.categories=this.categoryService.getAllCategories();
  this.categoryForm = this.formBuilder.group({
    id: [1, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
}
addCategory( formDirective: FormGroupDirective) {
  console.log('triggered')
  if (!this.categoryForm.valid) {
    return;
  }
  console.log('triggered2')

  // Find the maximum ID in the existing categories
  const maxId = Math.max(...this.categories.map(category => category.id), 0);

  // Generate a new unique ID by incrementing the maximum ID
  const newCategoryId = maxId + 1;

  const newCategory: Category = {
    id: newCategoryId,
    name: this.categoryForm.value.name,
    description: this.categoryForm.value.description,
    image: 'null'
  };

  this.categoryService.addCategory(newCategory);
  this.resetForm();
  this.closeModal();
}
removeCategory(id: number): void {
  this.categoryService.removeCategoryById(id);
 this.resetForm();
}
resetForm(){
  this.categoryForm = this.formBuilder.group({
    id: [1, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required]
  });
}
closeModal() {
  this.categoryModalOpen = false;
}

}

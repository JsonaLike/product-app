import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @ViewChild('dropZone', { static: false }) dropZoneElement: ElementRef | undefined;


  categoryForm!: FormGroup;
  product: Product | null = null;
  categories!: Category[];
  productModalOpen = false;
  categoryModalOpen = false;
  initialcategory: Category = { id: 1, name: 'General', description: 'created and traded to meet the diverse needs and wants of consumers', image: 'null' };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      id: [1, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.categories = [this.initialcategory];

 
  }

 
  openProductModal() {
    this.productModalOpen = true;
  }

  openCategoryModal() {
    this.categoryModalOpen = true;
  }

  closeModal() {
    this.productModalOpen = false;
    this.categoryModalOpen = false;
  }




  products: Product[] = [
    { id: 1, name: 'Product 1', price: 10, image: 'https://placehold.co/600x400', description: 'This is a Product Description', category: this.initialcategory }
  ];

  addCategory() {
    if (!this.categoryForm.valid) {
      return;
    }
  
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
  
    this.categories.push(newCategory);
    this.categoryForm.reset();
    this.closeModal();
  }
  
  }
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}


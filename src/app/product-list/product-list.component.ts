import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../app.component';
import { CategoryService } from '../category.service';
import { Product, ProductServiceService } from '../product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @ViewChild('dropZone', { static: false }) dropZoneElement: ElementRef | undefined;


  categoryForm!: FormGroup;
  products!:Product[];
  product: Product | null = null;

  @Input() categories!: Category[];
  productModalOpen = false;
  categoryModalOpen = false;

  constructor(private formBuilder: FormBuilder,private categoryService:CategoryService,private productService:ProductServiceService) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      id: [1, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.categories=this.categoryService.getAllCategories();
    this.products=this.productService.getAllProducts();
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

  
  }


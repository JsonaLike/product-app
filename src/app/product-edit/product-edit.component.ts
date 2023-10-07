import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductServiceService } from '../product.service';
import {  CategoryService } from '../category.service';
import { Category } from '../app.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  product!: Product;
  categories: Category[] = [];
  isProductFormSubmitted:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductServiceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
     private router: Router
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(productId)!;
    this.categories = this.categoryService.getAllCategories();

    this.productForm = this.formBuilder.group({
      id: [this.product ? this.product.id : null, Validators.required], 
      name: [this.product ? this.product.name : '', Validators.required],
      description: [this.product ? this.product.description : '', Validators.required],
      price: [this.product ? this.product.price : 0, Validators.required],
      categoryId: [this.product && this.product.category ? this.product.category : null, Validators.required]
    });
  }

  updateProduct(): void {
    this.isProductFormSubmitted=true;
    if (this.productForm.valid && this.productForm.value.id !== null && this.product) {
      console.log('reached')
      const updatedProduct: Product = {
        id: this.productForm.value.id,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        image: this.product ? this.product.image : '',
        category: this.categories.find(category => category.id === Number(this.productForm.value.categoryId))?.id!
      };
      console.log(JSON.stringify(this.categories.find(category => category.id === Number(this.productForm.value.categoryId))!))
      console.log(JSON.stringify(this.productForm.value.categoryId!))
      this.productService.updateProduct(updatedProduct);
      this.router.navigate(['/product-list']);
    }

  }
}

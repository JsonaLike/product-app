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
  selectedFile: File | null = null;

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
    const reader = new FileReader();
    var img;
    reader.onload = (event: any) => {
      img = event.target.result;

      const newProduct: Product = {
          id: this.product.id,
          name: this.productForm.value.name,
          price: this.productForm.value.price,
          description: this.productForm.value.description,
          image: img,
          category: this.categories.find(category => category.id === Number(this.productForm.value.categoryId))?.id!
      };
      this.productService.updateProduct(newProduct);
      this.isProductFormSubmitted = false;
      this.productForm.reset({
          id: this.product.id,
          name: 'Product',
          price: 23,
          description: 'This is a Product Description',
          image: 'null',
          category: this.categories.find(category => category.id === Number(this.productForm.value.categoryId))?.id!
      });
  };

  if (this.selectedFile) {
    reader.readAsDataURL(this.selectedFile);
    console.log('reached22');

}else{
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
    }
 }
 this.router.navigate(['/product-list']);
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
  dragOverHandler(event: any) {
    event.preventDefault();
  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
 
}

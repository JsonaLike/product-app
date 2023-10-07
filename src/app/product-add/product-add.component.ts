import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductServiceService } from '../product.service';
import { CategoryService } from '../category.service';
import { Category } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  isProductFormSubmitted:boolean=false;
  productForm!: FormGroup;
  products!:Product[];
  product!:Product;
  categories!:Category[];
  selectedFile: File | null = null;
  visible!: boolean;
  selectedCategory: Category | null = null;

  constructor(private formBuilder: FormBuilder,private categoryService:CategoryService,private productService:ProductServiceService,private router:Router) { }

  ngOnInit(): void {
    this.categories=this.categoryService.getAllCategories();
    this.products=this.productService.getAllProducts();
    this.productForm = this.formBuilder.group({
      name: [this.product ? this.product.name : '', Validators.required],
      description: [this.product ? this.product.description : '', Validators.required],
      price: [this.product ? this.product.price : 0, Validators.required],
      categoryId: [this.product && this.product.category ? this.product.category : null, Validators.required]
    });
    
  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
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
  addProduct() {
    console.log('reached23154');
console.log('selecedcat'+ this.productForm.value.categoryId);

    this.isProductFormSubmitted = true;
    if (!this.productForm.valid) {
        return;
    }
    console.log('reached154');

    let newProductId: number;
    if (this.products.length > 0) {
        newProductId = Math.max(...this.products.map(product => product.id), 0) + 1;
    } else {
        newProductId = 1;
    }

    const reader = new FileReader();
    let img: string = '';
    let selectedCat = this.productForm.value.categoryId;
    console.log('reached145');
console.log('cat'+selectedCat);

    reader.onload = (event: any) => {
        img = event.target.result;

        const newProduct: Product = {
            id: newProductId,
            name: this.productForm.value.name,
            price: this.productForm.value.price,
            description: this.productForm.value.description,
            image: img,
            category: selectedCat.id
        };

        this.productService.addProduct(newProduct);
        this.isProductFormSubmitted = false;

        this.productForm.reset({
            id: newProductId,
            name: 'Product',
            price: 23,
            description: 'This is a Product Description',
            image: 'null',
            category: selectedCat.id
        });
    };

    if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
        console.log('reached22');

    } else {
        img = 'https://placehold.co/600x400';

        const newProduct: Product = {
            id: newProductId,
            name: this.productForm.value.name,
            price: this.productForm.value.price,
            description: this.productForm.value.description,
            image: img,
            category: selectedCat.id
        };
        console.log('reached12');
        
        this.productService.addProduct(newProduct);
        this.isProductFormSubmitted = false;

        this.productForm.reset({
            id: newProductId,
            name: 'Product',
            price: 23,
            description: 'This is a Product Description',
            image: 'null',
            category: this.productForm.value.selectedCategory
        });
    }
    this.router.navigate(['/product-list']);
}
}

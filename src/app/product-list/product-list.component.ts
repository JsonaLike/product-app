import { Component } from '@angular/core';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  product: Product | null = null;
  selectedFile: File | null = null;

  addProduct() {
    this.product = {...this.newProduct};
    
    this.products.push(this.product); // Add the new product to the products array
  }
  newProduct: Product={id:34,name:'Product',price:23,description:'This is a Product Description'}; // Object to store new product data
   onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
  products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    // Add more products as needed
    
  ];

}

export interface Product {
  id: number;
  name: string;
  price: number;
  description:string
  // Add more properties as needed
}
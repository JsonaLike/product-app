import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  addProduct() {
    this.products.push({...this.newProduct}); // Add the new product to the products array
  }
  newProduct: Product={id:34,name:'Product',price:23,description:'This is a Product Description'}; // Object to store new product data
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
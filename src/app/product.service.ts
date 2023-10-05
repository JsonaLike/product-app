import { Injectable } from '@angular/core';
import { Category } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private products: Product[] = [];

  constructor() {
    // Load products from localStorage during service initialization
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  // Create a new product
  addProduct(product: Product): void {
    this.products.push(product);
    this.updateLocalStorage();
  }

  // Get all products
  getAllProducts(): Product[] {
    return this.products;
  }

  // Get product by ID
  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  // Update product
  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.updateLocalStorage();
    }
  }

  // Remove product by ID
  removeProductById(id: number): void {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  // Update products data in localStorage
  private updateLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
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

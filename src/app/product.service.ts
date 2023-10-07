import { Injectable } from '@angular/core';
import { Category } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private products: Product[] = [];
  private productsKey = 'products';
  constructor() {
    const storedProducts = localStorage.getItem(this.productsKey);
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.updateLocalStorage();
  }
  getAllProducts(): Product[] {
    return this.products;
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    console.log('index'+index);
    
    if (index !== -1) {
      this.products[index] = updatedProduct;
      localStorage.setItem(this.productsKey, JSON.stringify(this.products));
    }
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  updateProductCategory(CategoryId: number, newCategory: Category): void {

    for (const product of this.products) {
        if (product.category === CategoryId) {
          console.log('readh');
          
            product.category = newCategory.id;
        }
    }
    this.updateLocalStorage();
}

  removeProductById(id: number): void {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.updateLocalStorage();
    }
  }

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
  category: number;
}

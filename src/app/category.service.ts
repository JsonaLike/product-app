import { Injectable } from '@angular/core';
import { Category } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private STORAGE_KEY = 'categories'; // Key to store categories in localStorage
  categories!: Category[];
  constructor() {
    // Load categories from localStorage during service initialization
    const storedCategories = localStorage.getItem(this.STORAGE_KEY);
    this.categories = storedCategories ? JSON.parse(storedCategories) : [{ id: 1, name: 'General', description: 'created and traded to meet the diverse needs and wants of consumers', image: 'null' }];
  }

  private saveToLocalStorage(): void {
    // Save categories to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.categories));
  }

  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: number): Category | undefined {
    return this.categories.find(category => category.id === id);
  }

  removeCategoryById(id: number): void {
    const index = this.categories.findIndex(category => category.id === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
      this.saveToLocalStorage(); // Save changes to localStorage after removal
    }
  }

  addCategory(category: Category): void {
    this.categories.push(category);
    this.saveToLocalStorage(); // Save changes to localStorage after addition
  }
}

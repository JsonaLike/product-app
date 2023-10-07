import { Component } from '@angular/core';
import { Category } from '../app.component';
import { Product, ProductServiceService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  
  category: Category = {
    id: 0,
    name: '',
    description: '',
    image: ''
  };
  categories!:Category[];
  products!:Product[];
  categoryForm!: FormGroup;
  submitted:boolean=false;
  
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,private productService: ProductServiceService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.categoryForm = this.formBuilder.group({
      name: [this.category.name, Validators.required],
      description: [this.category.description, Validators.required],
      image: [this.category.image]
    });
    this.categories=this.categoryService.getAllCategories();
    this.products=this.productService.getAllProducts();
    
  }
  addCategory(): void {
    this.submitted=true;
    if (this.categoryForm.valid) {
      const highestId = Math.max(...this.categories.map(category => category.id), 0);
      const newCategory: Category = {
        id: Number(highestId)+1,
        name: this.categoryForm.value.name,
        description: this.categoryForm.value.description,
        image: this.categoryForm.value.image
      };
      this.categoryService.addCategory(newCategory);
      this.router.navigate(['/category-list']);
    }
  }
}

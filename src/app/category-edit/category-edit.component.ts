import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Category } from '../app.component';
import { Product, ProductServiceService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
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
    const categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.category=this.categoryService.getCategoryById(categoryId)!;

    this.categoryForm = this.formBuilder.group({
      id: [this.category.id, Validators.required],
      name: [this.category.name , Validators.required],
      description: [this.category.description, Validators.required],
      image: [this.category.image]
    });
    console.log('test');
    
    this.products=this.productService.getAllProducts();
  }

  updateCategory(): void {
    this.submitted=true;
    if (this.categoryForm.valid && this.category) {

      const updatedCategory: Category = {
        id: this.categoryForm.value.id,
        name: this.categoryForm.value.name,
        description: this.categoryForm.value.description,
        image: this.categoryForm.value.image
      };
      this.categoryService.updateCategory(updatedCategory);
      this.products.forEach(product => {
        console.log('pstringified'+product.category);
        console.log('cstringified'+updatedCategory);
        
        if (product?.category === updatedCategory.id) {
          console.log('reached23')
          this.productService.updateProductCategory(updatedCategory.id,{ ...updatedCategory });
        }
      });

      this.router.navigate(['/category-list']);
    }
   

  }
}

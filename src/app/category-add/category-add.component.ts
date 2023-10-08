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
  selectedFile: File | null = null;

  
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
    let newCategoryId: number;
    if (this.products.length > 0) {
        newCategoryId = Math.max(...this.categories.map(category => category.id), 0) + 1;
    } else {
        newCategoryId = 1;
    }
    const reader = new FileReader();
    var img;
    let selectedCat = this.categoryForm.value.categoryId;
     reader.onload = (event: any) => {
        img = event.target.result;

        const newCategory: Category = {
            id: newCategoryId,
            name: this.categoryForm.value.name,
            description: this.categoryForm.value.description,
            image: img,
        };

        this.categoryService.addCategory(newCategory);
        this.submitted = false;

        this.categoryForm.reset({
            id: newCategoryId,
            name: 'Product',
            price: 23,
            description: 'This is a Product Description',
        });
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
      console.log('reached22');

  }else{
    if (this.categoryForm.valid) {
      img = 'https://placehold.co/600x400';
      const highestId = Math.max(...this.categories.map(category => category.id), 0);
      const newCategory: Category = {
        id: Number(highestId)+1,
        name: this.categoryForm.value.name,
        description: this.categoryForm.value.description,
        image: img
      };
      this.categoryService.addCategory(newCategory);
    }
  }
  this.router.navigate(['/category-list']);

  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
}

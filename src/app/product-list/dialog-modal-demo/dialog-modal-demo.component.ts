import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Product } from '../product-list.component';

@Component({
    selector: 'dialogM',
    templateUrl: './dialog-modal-demo.component.html',
  styleUrls: ['dialog-modal-demo.component.scss']
})
export class DialogModalDemo {
    constructor(private formBuilder: FormBuilder){}
    productForm!: FormGroup;
    visible: boolean = false;
  selectedFile: File | null = null;
  selectedCategory: Category | null = null;
  @Input() products!:Product[];
  @Input() categories!:Category[];
  
  isProductFormSubmitted:boolean=false;

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.productForm = this.formBuilder.group({
            name: ['Product', Validators.required],
            price: [23, Validators.required],
            description: ['This is a Product Description', Validators.required],
            selectedCategory: [null, Validators.required]
          });
    }
    addProduct() {
        this.isProductFormSubmitted = true;
        if (!this.productForm.valid) {
            return;
        }
    
        let newProductId: number;
        // Find the last used product ID and increment it for the new product
        if (this.products.length > 0) {
            newProductId = Math.max(...this.products.map(product => product.id), 0) + 1;
        } else {
            // If no products exist, start with ID 1
            newProductId = 1;
        }
    
        const reader = new FileReader();
        let img: string = '';
        let selectedCat = this.productForm.value.selectedCategory;
        reader.onload = (event: any) => {
            img = event.target.result;
    
            const newProduct: Product = {
                id: newProductId,
                name: this.productForm.value.name,
                price: this.productForm.value.price,
                description: this.productForm.value.description,
                image: img,
                category: selectedCat
            };
    
            this.products.push(newProduct);
            this.isProductFormSubmitted = false;
    
            // Reset form with an incremental ID
            this.productForm.reset({
                id: newProductId,
                name: 'Product',
                price: 23,
                description: 'This is a Product Description',
                image: 'null',
                category: this.productForm.value.selectedCategory
            });
        };
    
        if (this.selectedFile) {
            reader.readAsDataURL(this.selectedFile);
        } else {
            // If no image is selected, use a placeholder URL
            img = 'https://placehold.co/600x400';
    
            const newProduct: Product = {
                id: newProductId,
                name: this.productForm.value.name,
                price: this.productForm.value.price,
                description: this.productForm.value.description,
                image: img,
                category: this.productForm.value.selectedCategory
            };
    
            this.products.push(newProduct);
            this.isProductFormSubmitted = false;
    
            // Reset form with an incremental ID
            this.productForm.reset({
                id: newProductId,
                name: 'Product',
                price: 23,
                description: 'This is a Product Description',
                image: 'null',
                category: this.productForm.value.selectedCategory
            });
        }
    }
    
      onFileSelected(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
          this.selectedFile = inputElement.files[0];
        }
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
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  showMessage: boolean = false;
  message: string = '';
  addStatus: 'initial' | 'loading' | 'success' | 'error' = 'initial';
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      price: [
        0,
        [
          Validators.required,
          Validators.pattern(/^\d{1,15}(\.\d{1,2})?$/), 
          this.priceGreaterThanZeroValidator,
        ],
      ],
      description: [''],
    });
  }

  isFieldInvalid(field: string) {
    const formField = this.productForm.get(field);
    return formField!.invalid && (formField!.dirty || formField!.touched);
  }

  getErrorMessage(field: string) {
    const formField = this.productForm.get(field);
    if (formField && formField.hasError('required')) {
      return 'This field is required.';
    }
    if (formField && formField.hasError('maxlength')) {
      return 'Exceeded maximum length.';
    }
    if (formField && formField.hasError('pattern')) {
      return 'Invalid format.';
    }
    if (formField && formField.hasError('priceGreaterThanZero')) {
      return 'Price must be greater than zero.';
    }
    return '';
  }

  priceGreaterThanZeroValidator(control: AbstractControl) {
    const price = control.value;
    if (price <= 0) {
      return { priceGreaterThanZero: true };
    }
    return null;
  }

  submitForm() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: '0',
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
      };
      this.addStatus = 'loading';
      this.productService.addProduct(newProduct).subscribe({
        next: (_response) => {
          this.addStatus = 'success';
          this.showMessage = true;
          this.message = 'Product added successfully!';
          setTimeout(() => {
            this.showMessage = false;
            this.message = '';
            this.addStatus = 'initial';
          }, 3000);
          this.productForm.reset();
        },
        error: (error) => {
          this.addStatus = 'error';
          this.showMessage = true;
          this.message = 'Error adding product. Please try again.';
          console.log(error)
        },
      });
    }
  }
}

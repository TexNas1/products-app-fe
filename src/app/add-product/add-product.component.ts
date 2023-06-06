import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      price: [
        0,
        [
          Validators.required,
          Validators.pattern('[0-9]+(.[0-9]{1,2})?'),
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
        id: 0,
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
      };
      console.log({ newProduct });
    }
  }
}

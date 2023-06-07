import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productForm!: FormGroup;
  // productId!: number;
  // product!: Product;
  productId: number = 0;
  product: Product | undefined;
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2' },
    { id: 3, name: 'Product 3', price: 30, description: 'Description 3' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    // Fetch the product details from bk
    this.route.params.subscribe((params) => {
      this.productId = +params['id']; 
      this.product = this.getProductById(this.productId);
    });

    // initial values for the form fields
    this.productForm = this.formBuilder.group({
      name: [
        this.product?.name,
        [Validators.required, Validators.maxLength(255)],
      ],
      price: [
        this.product?.price,
        [
          Validators.required,
          Validators.pattern('[0-9]+(.[0-9]{1,2})?'),
          this.priceGreaterThanZeroValidator,
        ],
      ],
      description: [this.product?.description],
    });
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  updateProduct(product: Product) {
    // update the product
    console.log('Product updated:', product);
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
      const updatedProduct: Product = {
        id: this.productId,
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
      };
      console.log({ updatedProduct });
    }
  }
}

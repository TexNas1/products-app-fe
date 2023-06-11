import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productForm!: FormGroup;
  product: Product | undefined;
  productId: string = '0';
  showMessage: boolean = false;
  message: string = '';
  updateStatus: 'initial' | 'loading' | 'success' | 'error' = 'initial';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.getProductDetails(id);
          this.productId = id;
        }
      },
    });

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

  getProductDetails(id: string) {
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    });
  }

  updateProduct() {
    if (this.productForm.valid && this.product) {
      const updatedProduct: Product = {
        id: this.productId,
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
      };

      this.updateStatus = 'loading';
      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          this.updateStatus = 'success';
          this.showMessage = true;
          this.message = 'Product updated successfully!';
          setTimeout(() => {
            this.showMessage = false;
            this.message = '';
            this.updateStatus = 'initial';
            this.router.navigate(['/product-list']); 
          }, 2000);
        },
        error: (error) => {
          console.log('Error updating product:', error);
          this.updateStatus = 'error';
          this.showMessage = true;
          this.message = 'Error updating product. Please try again.';
        },
      });
    }
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
}

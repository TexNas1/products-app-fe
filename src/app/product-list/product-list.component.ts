import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {
  isGridView: boolean = true;
  constructor(private router: Router) {}
  showConfirmationPopup: boolean = false;
  productToDelete: Product | null = null;

  deleteProduct(product: Product) {
    this.productToDelete = product;
    this.showConfirmationPopup = true;
  }

  confirmDelete() {
    if (this.productToDelete) {
      // Perform the delete operation here
      console.log('Deleting product:', this.productToDelete);
      
      // Clear the productToDelete and hide the confirmation popup
      this.productToDelete = null;
      this.showConfirmationPopup = false;
    }
  }

  cancelDelete() {
    // Clear the productToDelete and hide the confirmation popup
    this.productToDelete = null;
    this.showConfirmationPopup = false;
  }

  toggleView() {
    this.isGridView = !this.isGridView;
  }

  editProduct(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }

  products: Product[] = [
    {id: 1, name: 'Product 1', price: 10, description: 'Description 1' },
    {id: 2, name: 'Product 2', price: 20, description: 'Description 2' },
    {id: 3, name: 'Product 3', price: 30, description: 'Description 3' },
  ];
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  isGridView: boolean = true;
  showConfirmationPopup: boolean = false;
  productToDelete: Product | null = null;
  products: Product[] = [];
  getStatus: 'initial' | 'loading' = 'loading';

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.getStatus = 'loading';
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.getStatus = 'initial';
      },
      error: (error) => {
        console.log('Error fetching products:', error);
        this.getStatus = 'initial';
      }
    });
  }

  deleteProduct(product: Product) {
    this.productToDelete = product;
    this.showConfirmationPopup = true;
  }

  confirmDelete() {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete.id).subscribe({
        next: () => {
          this.productToDelete = null;
          this.showConfirmationPopup = false;
          this.fetchProducts(); 
        },
        error: (error) => {
          console.log('Error deleting product:', error);
          this.productToDelete = null;
          this.showConfirmationPopup = false;
        }
      });
    }
  }

  cancelDelete() {
    this.productToDelete = null;
    this.showConfirmationPopup = false;
  }

  toggleView() {
    this.isGridView = !this.isGridView;
  }

  editProduct(productId: string) {
    this.router.navigate(['/product-detail', productId]);
  }
}

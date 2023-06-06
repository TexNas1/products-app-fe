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

  toggleView() {
    this.isGridView = !this.isGridView;
  }

  editProduct(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }

  deleteProduct(productId: number) {
    console.log({productId})
  }

  products: Product[] = [
    {id: 1, name: 'Product 1', price: 10, description: 'Description 1' },
    {id: 2, name: 'Product 2', price: 20, description: 'Description 2' },
    {id: 3, name: 'Product 3', price: 30, description: 'Description 3' },
  ];
}

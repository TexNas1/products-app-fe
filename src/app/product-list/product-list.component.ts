import { Component } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  isGridView: boolean = true;
  // Rest of your code

  toggleView() {
    this.isGridView = !this.isGridView;
  }
  products: Product[] = [
    {id: 1, name: 'Product 1', price: 10, description: 'Description 1' },
    {id: 2, name: 'Product 2', price: 20, description: 'Description 2' },
    {id: 3, name: 'Product 3', price: 30, description: 'Description 3' },
    // Add more products as needed
  ];
}

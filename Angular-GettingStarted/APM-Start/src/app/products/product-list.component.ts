import {Component, OnInit} from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
pageTitle: string ='Products List';
imageWidth:number=50;
imageMargin: number=2;
  showImage: boolean = false;
  errorMessage: string = '';
// listFilter :string ='cart';
_listFilter :string ;
get listFilter(): string{
  return this._listFilter;
}

set listFilter(value :string){
   this._listFilter=value;
   this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter): this.products;
  }
  filteredProducts: IProduct[];

  onRatingClicked(message: string): void {
    this.pageTitle = "Prodduct list :" + message;
  }
products: IProduct[]=[];
constructor(private productService : ProductService){
  
  
}
performFilter(filterBy : string): IProduct[]{
  filterBy= filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) => 
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}
toggleImage(): void{
    this.showImage=!this.showImage;
}
ngOnInit():void{
  console.log('In OnInit Hook');
  this.productService.getProducts().subscribe({
    next: product => {
    this.products = product,
    this.filteredProducts = this.products;
    },
    error: err => { this.errorMessage=err}
  });
  
}

}

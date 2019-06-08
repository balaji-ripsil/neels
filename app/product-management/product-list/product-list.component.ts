import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Observable, } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Filter } from './filter.model';
import { MatSnackBar } from '@angular/material';
import {Cart} from '../../shared/model/cart.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  message;
  action;
  productModel: any;
  productModel$: Observable<string>;
  catid: string;
  cart: Cart;
  cartModel: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  filterPrice;
  filterColor;
  filterMaterial;
  sortBy = [{
    type: 'lowtohigh',
    value: 'Price - Low To High'
  }, {
    type: 'hightolow',
    value: 'Price -  High To Low'
  }];
  selectedCheckBox;
  selectedMaterialCheckBox;
  selectedPriceCheckBox;
  selectedSortVal;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  filterModel: Filter;
  resultdata: any;
  userId: string;
  constructor(public productService: ProductService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {

  }
  ngOnInit() {
    localStorage.removeItem('filterMaterial');
    localStorage.removeItem('minimumPriceFilter');
    localStorage.removeItem('maximumPriceFilter');
    localStorage.removeItem('filterColor');
    this.productModel$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.catid = params.get('catId');
        this.getProducts();
        /* this.viewCategory(); */
        /* this.onLoadSortType(); */
        return this.catid;
      })
    );
    this.userId = sessionStorage.getItem('userId');
    /* this.getProducts(); */

  }
  getProducts() {
    this.productService.getProducts(this.catid).subscribe(data => {
      this.productModel = data;
    }, err => {
      console.log(err);
    });
  }
 /*  getFilterMenu() {
    this.productService.getFilterData().subscribe(data => {
      console.log('filter menu', data);
      this.productSettingsModel = data;
    }, err => {
      console.log(err);
    });
  } */

  sortType(val) {
    this.selectedSortVal = val;
    localStorage.setItem('productSortType', val);
    if (val === 'lowtohigh') {
      this.lowToHigh();
    } else if (val === 'hightolow') {
      this.highToLow();
    }
  }
  highToLow() {
    this.productModel.sort((a, b) => {
      return b.price - a.price;
    });
  }
  viewCategory() {
    this.productService.getViewCategory(this.catid).subscribe(data => {
      this.productModel.paginator = this.paginator;
      this.productModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  lowToHigh() {

    this.productModel.sort((a, b) => {
      return a.price - b.price;
    });
  }
  public handlePage(e: any) {
    console.log('paginator', e);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.productModel = part;
  }
  viewSingleProduct(id) {
    this.router.navigate(['/product/productview', id]);
  }
  // filter by price


  addToCart(product) {
    if (JSON.parse(sessionStorage.getItem('login'))) {
        this.addToCartServer(this.userId, product);
    } else {
      this.addToCartLocal(product);
    }
  }
  addToCartServer(userId, product) {
    this.message = 'Product Added To Cart';
    console.log(product.price);
    const item = {
      productId: product._id,
      productName: product.productName,
      productDescription: product.productDescription,
      productImageName: product.productImageName[0],
     price: product.price,
     /*   subTotal: product.price * 1, */
      set: 1,
      moq: product.moq,
      ID: product.productId,
    };
    const totalItem = [];
    totalItem.push(item);
    this.cart = new Cart();
    this.cart.userId = userId;
    this.cart.product = totalItem;
    this.productService.addToCart(this.cart).subscribe(data => {
      this.cartModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      /* this.router.navigate(['product/shopping']); */
    }, error => {
      console.log(error);
    });
  }

  addToCartLocal(product) {
    console.log(product);
    this.message = 'Product Added To Cart';
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      const item = {
        productId: product._id,
        productName: product.productName,
        productDescription: product.productDescription,
        productImageName: product.productImageName[0],
    price: product.price,
    ID: product.productId,
       /*      subTotal: product.price * 1, */
        set: 1,
        moq: product.moq
      };
      cart.push(item);
      sessionStorage.setItem('cart', JSON.stringify(cart));
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    } else {
      const item = cart.find(ite => {
        return ite.productId === product._id;
      });
      if (item) { // check if is not new item
        item.qty++;
        item.subTotal = item.price * item.qty;
        sessionStorage.setItem('cart', JSON.stringify(cart));
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      } else {
        const items = {
          productId: product._id,
          productName: product.productName,
          productDescription: product.productDescription,
          productImageName: product.productImageName[0],
       price: product.price,
         /*     subTotal: product.price * 1, */
          set: 1,
          moq: product.moq,
          ID: product.productId,
        };
        cart.push(items);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      }
    }
  }


}

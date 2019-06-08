import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../shared/model/product.model';
import {AddressModel} from '../../account-info/address/address.model';
import {Order} from '../../shared/model/order.model';
import {Inventory} from './inventory.model';
import { from } from 'rxjs';



@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orderForm: FormGroup;
  id;
  productModel: Product;
  orderModel: Order;
  message;
  action;
  moqModel;
  changingQty;
  totalValue;
  calculatedPrice;
  loginStatus;
  userID;
  billingDetails: any;
  addAddressDetails: boolean;
  addressHolder: AddressModel;
  orderSummary: any;
  sumValue: any;
  serviceUrl;
  inventoryModel: Inventory;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private productService: ProductService,
              private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.createForm();
    /* this.viewSingleProduct(); */
    this.loginStatus = sessionStorage.getItem('login');
    this.userID = sessionStorage.getItem('userId');
    this.orderSummary = JSON.parse(sessionStorage.getItem('orderSummary'));
    this.getCustomerDetails();
  }
  createForm() {
    this.orderForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      emailId: [''],
      streetAddress: [''],
      building: [''],
      landmark: [''],
      city: [''],
      state: [''],
      pincode: [''],
      qty: [''],
      productPrice: [''],
      totalPrice: ['']
    });
  }

 /*  viewSingleProduct() {
    this.orderMgmtService.singleProduct(this.id).subscribe(data => {
      this.productModel = data;
    }, err => {
      console.log(err);
    });
  } */
getCustomerDetails() {
  this.productService.getCustomerDetails(this.userID).subscribe(data => {
    this.billingDetails = data.addressDetails;
    if ( data.addressDetails === undefined) {
this.addAddressDetails = true;
    } else {
      this.addAddressDetails = false;
    }
  }, err => {
    console.log(err);
  });

}
onSubmit() {
  this.addressHolder = new AddressModel();
  this.addressHolder.streetAddress = this.orderForm.controls.streetAddress.value;
  this.addressHolder.building = this.orderForm.controls.building.value;
  this.addressHolder.landmark = this.orderForm.controls.landmark.value;
  this.addressHolder.city = this.orderForm.controls.city.value;
  this.addressHolder.state = this.orderForm.controls.state.value;
  this.addressHolder.pincode = this.orderForm.controls.pincode.value;
  this.addressHolder.name = this.orderForm.controls.firstName.value;
  this.addressHolder.mobileNumber = this.orderForm.controls.phoneNumber.value;
  this.productService.getaddressDetails(this.addressHolder, this.userID).subscribe(data => {
    this.addressHolder = data;
  }, error => {
    console.log(error);
  }
  );
  /* console.log(this.regForm); */


}
  placeOrder(total) {
    this.message = 'Order Placed  successfully';
    this.orderModel = new Order();
    this.orderModel.products = this.orderSummary;
    this.orderModel.total = this.totalValue;
    this.orderModel.addressDetails = this.billingDetails;
    this.orderModel.customerId = this.userID;
    this.inventoryModel = new Inventory();
    this.inventoryModel.products = this.orderSummary;
    this.inventoryModel.domainName = this.serviceUrl;
    this.productService.placeOrder(this.orderModel).subscribe(data => {
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.removeCart();
      this.inventoryUpdate(this.inventoryModel);
      this.router.navigate(['/home']);
      }, err => {
    console.log(err);
  });
  }
  inventoryUpdate(inventory) {
    this.productService.inventoryUpdate(inventory).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  removeCart() {
    this.productService.clearCart(this.userID).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  reduceQty(qty, price) {
    this.changingQty = +qty - this.moqModel.moqQuantity;
    this.calculatedPrice = +price * this.changingQty;
  }
  increaseQty(qty, price) {
    this.changingQty = +qty + this.moqModel.moqQuantity;
    this.calculatedPrice = +price * this.changingQty;
  }
  total() {
    let sum = 0;
    this.orderSummary.map(item => {
        sum += item.set * item.price;
      });
    this.totalValue = sum;
    return sum;

  }
}

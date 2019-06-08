import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  images = [
    { image: '../../../assets/img/Categories/2.jpg'},
    { image: '../../../assets/img/Categories/1.jpg'},
    { image: '../../../assets/img/Categories/3.jpg'},
    { image: '../../../assets/img/Categories/4.jpg'},


  ];
  constructor() { }

  ngOnInit() {
  }

}

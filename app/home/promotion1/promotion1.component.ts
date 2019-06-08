import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Promotion } from './promotion.model';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-promotion1',
  templateUrl: './promotion1.component.html',
  styleUrls: ['./promotion1.component.css']
})
export class Promotion1Component implements OnInit {

  promotion = [
    {img: '../../../assets/img/Categories/1.jpg'},
    {img: '../../../assets/img/Categories/2.jpg'},
    {img: '../../../assets/img/Images/beautiful-cute-daylight-1468379.jpg'},
    {img: '../../../assets/img/Images/4M6A9255.jpg'},
  ];
  promotionsModel: Promotion;
  constructor(private fb: FormBuilder, private router: Router, private homeService: HomeService) { }

  ngOnInit() {
    this.getPromotions();
  }
  getPromotions() {
    this.homeService.getPromotions().subscribe(data => {
      this.promotionsModel = data;
    }, err => {
      console.log(err);
    });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
 public name = 'krishnan';
 public newClass = 'balaji2';
 public oldClass = 'balaji3';
 public errorTime = true;
 public noerrorTime = false;

 public publicStyle = {
 'balaji1': !this.errorTime,

 };

 final = [
  {finals: '../../../assets/img/final/1.jpg'},
  {finals: '../../../assets/img/final/3.jpg'},
  {finals: '../../../assets/img/final/5.jpg'},
  {finals: '../../../assets/img/final/2.jpg'},
  {finals: '../../../assets/img/final/4.jpg'},
  {finals: '../../../assets/img/final/6.jpg'}];
  constructor() { }

  ngOnInit() {
  }

}

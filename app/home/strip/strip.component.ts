import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-strip',
  templateUrl: './strip.component.html',
  styleUrls: ['./strip.component.css']
})
export class StripComponent implements OnInit {
public names = "flowers";
public redClass = "text-danger";
public greenClass = "text-success"
  strips = [
    {strip: '../../../assets/img/Video/1.jpg'}
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  submit() {
    this.router.navigate(['/home/subscribe']);
  }

}

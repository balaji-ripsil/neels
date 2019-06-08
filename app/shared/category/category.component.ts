import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { SuperCategory } from './category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  navbarShow = false;
  superCategory: SuperCategory[];
  dropdownShow = false;
  mainCategory;
  selectedDropDown: string;
  selectedDropDown1: string;
  selected: any;
  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.getSuperCategory();
  }
  toggleNavbar() {
    this.navbarShow = !this.navbarShow;
    /* this.dropdownShow = !this.dropdownShow; */
  }
  getSuperCategory() {
    this.sharedService.getSuperCategory().subscribe(data => {
      this.superCategory = data;
      console.log('category', data);
    });
  }
  toggleDropdown(cat) {
    this.superCategory.forEach(element => {
      if (element._id !== cat._id) {
        cat.editing = false;
         /* this.dropdownShow = !this.dropdownShow; */
      } else {
        cat.editing = true;
        this.dropdownShow = !this.dropdownShow;
        this.selectedDropDown = element._id;
        this.selected = cat;
      }
    });
    /* for (let i = 0; i <= this.superCategory.length; i++ )     {
      if (this.superCategory[i]._id === cat._id )       {
        cat.editing = true;
        this.dropdownShow = true;
      }
    } */
  }
  toggleDropdown1(mainCat) {
    this.superCategory.forEach(element => {
      if (element._id !== mainCat._id) {
        mainCat.editing = false;
         /* this.dropdownShow = !this.dropdownShow; */
      } else {
        mainCat.editing = true;
        this.dropdownShow = !this.dropdownShow;
        this.selectedDropDown1 = element._id;
        this.selected = mainCat;
      }
    });
  }
  viewCategory(subcat)   {
    this.selectedDropDown = '';
    localStorage.removeItem('productSortType');
    localStorage.removeItem('filterPrice');
    localStorage.removeItem('filterColor');
    localStorage.removeItem('filterMaterial');
    this.router.navigate(['/product/productlist', subcat]);
  }
  toggleDropdownLeave() {
    this.selectedDropDown = '';
    this.selected = '';
  }
  toggleLeave() {
    this.dropdownShow = !this.dropdownShow;
  }
}

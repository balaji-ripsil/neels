import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Footer} from '../footer/footer.model';
import {Router} from '@angular/router';
import {Header} from './header.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navbarShow = false;

  dropdownShow = false;
  mainCategory;
  selectedDropDown: string;
  selected: any;

  footerDetails: Footer;
  isCollapsed: boolean;
  header: Header[];
  logoImage: string;
email;
  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.logo();

  }
logo() {
  this.sharedService.getFooterDetails().subscribe(data => {
    this.footerDetails = data;
  }, error => {
    console.log(error);
  });
}
  toggleNavbar() {
    this.navbarShow = !this.navbarShow;
  }
  toggleDropdownLeave() {
    this.selectedDropDown = '';
    this.selected = '';
  }
  toggleLeave() {
    this.dropdownShow = !this.dropdownShow;
  }
  navBarShow()   {
    this.dropdownShow = !this.dropdownShow;
  }
  logOut()    {
    this.sharedService.sessionLogout();
    this.router.navigate(['account/signin']);
  }
}

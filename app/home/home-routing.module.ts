import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';


const routes: Routes = [
  {
    path: 'banner', component: BannerComponent,
  },
  {
    path: 'welcome', component: HomeComponent,
  },
  {
    path: 'subscribe', component: SubscribeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

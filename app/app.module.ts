import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AddSeoComponent } from './seo/add-seo/add-seo.component';
import { SeoService } from './seo/seo.service';
import { HomeRoutingModule } from './home/home-routing.module';
import { SharedRoutingModule } from './shared/shared-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatCardModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from './shared/footer/footer.component';
import {NavComponent} from './shared/nav/nav.component';
import {CategoryComponent} from './shared/category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { AccountRoutingModule } from './home/subscribe/account-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    AddSeoComponent,
    FooterComponent,
    NavComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'seo'}),
    AppRoutingModule,
    HttpClientModule,
    SharedRoutingModule,
    NoopAnimationsModule,
     MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
     BrowserAnimationsModule,
     MatMenuModule,
     AccountRoutingModule
  ],
  providers: [SeoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}

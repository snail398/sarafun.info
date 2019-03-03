import './js/ajquery-3.3.1.min.js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
 
import { AppComponent } from './component/app.component';
import { LandingComponent } from './component/landing.component';
import { LandinggComponent } from './component/landingg.component';
import { LandingggComponent } from './component/landinggg.component';
import { ActionsComponent } from './component/actions.component';
import { AdminkaComponent } from './component/adminka.component';
import { MenuComponent } from './component/menu.component';
import { LoginComponent } from './component/login.component';
import { CreateActionComponent } from './component/create.action.component';
import { EditActionComponent } from './component/edit.action.component';
import { CreateEstComponent } from './component/create.est.component'
import { EditEstComponent } from './component/edit.est.component';
import { CreateStaffComponent } from './component/create.staff.component';
import { EditStaffComponent } from './component/edit.staff.component';
import { StatComponent } from './component/stat.component';
import { TestComponent } from './component/test.component';
import { EstComponent } from './component/est.component';
import { StaffComponent } from './component/staff.component';
import { RunActionComponent } from './component/run.action.component';
import { EnterCodeComponent } from './component/enter.code.component';
import { SOHComponent } from './component/soh.component';
import { UserHomeComponent } from './component/user.home.component';
import { ReferalComponent } from './component/referal.component';
import { QrComponent } from './component/qr.component';

 
import { AccountModel } from './account.model';
import { FormsModule }   from '@angular/forms';
import { ActionService} from './service/action.service';
import { EstService} from './service/est.service';
import { StaffService} from './service/staff.service';
import { BrandComponent } from './component/brand.component';
import { ModalComponent } from './component/modal.component';

import { HttpClientModule }   from '@angular/common/http';


import './js/bootstrap.js';
import './js/jquery.maskedinput.min.js';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    AppComponent,
	LandingComponent,
	LandinggComponent,
	LandingggComponent,
	ActionsComponent,
	AdminkaComponent, 
	LoginComponent,
	MenuComponent,
	CreateActionComponent,
	EditActionComponent,
	StatComponent,
	BrandComponent,
	TestComponent,
	QrComponent,
	EstComponent,
	CreateEstComponent,
	EditEstComponent,
	StaffComponent,
	CreateStaffComponent,
	EditStaffComponent,
	RunActionComponent,
	EnterCodeComponent,
	ModalComponent,
	SOHComponent,
	UserHomeComponent,
	ReferalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}) ,
    AppRoutingModule, 
	HttpClientModule,
	FormsModule,
    TextMaskModule,
	NgxLoadingModule.forRoot({})
  ],
  providers: [AccountModel,ActionService,EstService,StaffService,ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

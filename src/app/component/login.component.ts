import { Component, OnInit } from '@angular/core';
import { HttpService} from '../service/http.service';
import { AdminkaComponent} from '../component/adminka.component';
import { FormsModule } from '@angular/forms';
import {Account} from '../entity/account';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AccountModel } from '../account.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl:'../html/login.component.html',
  styleUrls: ['../css/app.component.css','../css/login.css'], 
  providers: [HttpService,CookieService]
})
export class LoginComponent implements OnInit  {
	
 constructor(private httpService: HttpService,
			 private router: Router,
			 private accountModel:AccountModel,
			 private cookieService:CookieService,
			 private adminka:AdminkaComponent
			 ){}
   public loading = false;
   userlogin:string;
   userpassword:string;
   usercookie:string = "defaultCookie";
   account:Account;
   ngOnInit(){
	   this.login();
   }
   login(){		
	   this.loading = true;
	   this.httpService.login(this.userlogin,this.userpassword,this.usercookie).subscribe((data:Account) =>{ 
		   this.account = data; 
		   this.loading = false;
		   if (this.account.accountType =="marketolog"){
		   //переадресация в меню
		   this.accountModel.setAccount(this.account);
		   this.router.navigate(['/admin/menu']);
		   this.adminka.setVis(false);
		   }
	   });
		
   }
}
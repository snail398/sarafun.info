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
	queryStr:any;
    ngOnInit(){
		//параметры запроса для логина по ссылке
		this.queryStr = this.parseQueryString(window.location.search),
		this.userlogin = this.queryStr['login'],
		this.userpassword = this.queryStr['pass'];
		
		this.login();
   }
   
    
	parseQueryString(strQuery:string) {
    var strSearch   = strQuery.substr(1),
        strPattern  = /([^=]+)=([^&]+)&?/ig,
        arrMatch    = strPattern.exec(strSearch),
        objRes      = {};
    while (arrMatch != null) {
        objRes[arrMatch[1]] = arrMatch[2];
        arrMatch = strPattern.exec(strSearch);
    }
    return objRes;
};
   
    login(){	
		this.loading = true;
	    this.httpService.login(this.userlogin,this.userpassword,this.usercookie).subscribe(
		(data:Account) =>{ 
		    this.account = data; 
		    this.loading = false;
		    switch (this.account.accountType){
			    case "marketolog":{
					//переадресация в меню
					this.accountModel.setAccount(this.account);
					this.router.navigate(['/admin/menu']);
					this.adminka.setVis(false);
					break;
			    }
				case "user":{
					this.accountModel.setAccount(this.account);
					this.router.navigate(['/admin/userhome']);
					break;
			    }
		    }
		    if (this.account.accountType =="marketolog"){
		  
		    }
	    }
		,error => {
			
		    this.loading = false;
			console.log('oops', error.status);}
		);
		
    }
}
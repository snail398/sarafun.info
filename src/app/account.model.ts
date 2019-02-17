   import { Injectable } from '@angular/core';
   import {Account} from './entity/account';
	import {Router} from '@angular/router';
 
    @Injectable()

    export class AccountModel {
        private currentAccount:Account;
		private menuVis:boolean = true;
		
        constructor(private router: Router) {
			this.menuVis =true;
			var queryStr = this.parseQueryString(window.location.search),
		someVar1 = queryStr['login'];
		if (someVar1 == undefined)
		this.router.navigate(['/admin/login']);
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
		
        public setAccount(account) { 
            this.currentAccount = account;
        }

		 public getAccount()  {
            return this.currentAccount;
        }
		
        public getMenuVis(menuVis)  {
            return this.menuVis;
			console.log(this.menuVis);
        }
		
		public setMenuVis(vis) { 
		
            this.menuVis = vis;
			console.log(this.menuVis);
        }

      
    }
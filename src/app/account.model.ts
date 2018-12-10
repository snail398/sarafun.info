   import { Injectable } from '@angular/core';
   import {Account} from './entity/account';
	import {Router} from '@angular/router';
 
    @Injectable()

    export class AccountModel {
        private currentAccount:Account;
		private menuVis:boolean = true;
		
        constructor(private router: Router) {
			this.menuVis =true;
		this.router.navigate(['/admin/login']);
		}

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
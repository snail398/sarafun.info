import { Component, OnInit } from '@angular/core';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import { StaffService} from '../service/staff.service';
import {Router} from '@angular/router';
import {Staff} from '../entity/staff';
 
@Component({
  selector: 'app-content',
  templateUrl:'../html/staff.component.html',
  styleUrls: ['../css/app.component.css','../css/pers.css'], 
  providers: [HttpService]
})
export class StaffComponent implements OnInit{ 
    barmens:Staff[]=[];
	marketologs:Staff[]=[];
	
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private router: Router,
			 private staffService: StaffService
			 ){}
			 
    ngOnInit(){
            this.httpService.getStaff('/staff/getbarmens', 
											  new HttpParams().set('mainmarketologaccountid',this.accountModel.getAccount().id.toString()))
											  .subscribe(data => 
											  {for (var i = 0; data.length > i; i++) 
											  { 
												this.barmens.push(data[i])}}
											  );
			this.httpService.getStaff('/staff/getmarketologs', 
											  new HttpParams().set('mainmarketologaccountid',this.accountModel.getAccount().id.toString()))
											  .subscribe(data => 
											  {for (var i = 0; data.length > i; i++) 
											  { 
												this.marketologs.push(data[i])}}
											  );								  
    }
	
	setStaff(staff:Staff){
		this.staffService.setStaff(staff);
		this.router.navigate(['/admin/staff/edit']);
	}
	
	deleteStaff(staff:Staff){
		this.httpService.getForSimpleData('/staff/deletestaff', 
										new HttpParams().set('accID',staff.accountID.toString()))
										.subscribe(data=>{
										this.barmens = this.barmens.filter(item=>item.accountID!==staff.accountID);
										this.marketologs = this.marketologs.filter(item=>item.accountID!==staff.accountID);
										}
									   );
	}
	
	goToCreateBarmen(){
		this.staffService.setIsBarmen(true);
		this.router.navigate(['/admin/staff/create']);
	}
	
	goToCreateMarketolog(){
		this.staffService.setIsBarmen(false);
		this.router.navigate(['/admin/staff/create']);
	}
}
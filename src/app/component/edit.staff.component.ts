import { Component, OnInit } from '@angular/core';
import {Account} from '../entity/account';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import {Establishment} from '../entity/establishment';
import { FormsModule } from '@angular/forms';
import { StaffService} from '../service/staff.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl:'../html/create.staff.component.html',
  styleUrls: ['../css/app.component.css','../css/editpers.css'],
  providers: [HttpService]
})
export class EditStaffComponent implements OnInit{
	establishments:Establishment[]=[
		{
			id:0,
			companyID:0,
			factAdress:'string',
			estName:'Все заведения',
			estEmail:'string',
			estSite:'string',
			estDescription:'string',
			estPhone:'string',
			estWorkTime:'string',
			pathToAvatar:'string',
			avatarChangeDate:0,
		}
	];
	staffAcc:Account = new Account();
	establishment:Establishment = new Establishment();
	selectedEst:Establishment = new Establishment();
	edit:boolean = true;
	
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private staffService: StaffService,
			 private router: Router
			 ){}
			 
    ngOnInit(){
		  this.httpService.getForSimpleData('/staff/getstaff', new HttpParams().set('accID',this.staffService.getStaff().accountID.toString()))
										.subscribe((data:Account)=>{
											this.staffAcc = data;
											this.httpService.getEstablishments('/establisments/getestablishmentbymarketologid', 
											  new HttpParams().set('accountid',this.accountModel.getAccount().id.toString()))
											  .subscribe(data => 
											  {
													for (var i = 0; data.length > i; i++) 
													{ 
														this.establishments.push(data[i]);
													}
												}
											  );	
											  	this.httpService.getEstablishment('/staff/getaccountsest', 
													new HttpParams().set('accID',this.staffService.getStaff().accountID.toString())).subscribe((data:Establishment) =>
														{
														this.selectedEst =  this.establishments.find(x => x.estName == data.estName);
														this.establishment = data;
														}
													);
														}
										);
						
       
    }
  onChangeObj(newObj) {
    console.log('event');
    console.log(newObj);
    this.selectedEst = newObj;
	this.establishment = newObj;
	
  }
	editStaff(){
	  this.httpService.createItem('/staff/changestaffinfo', 
											  new HttpParams().set('creatorid',this.accountModel.getAccount().id.toString()).set('estname',this.establishment.estName),
											  this.staffAcc)
											  .subscribe(data=>
		   this.router.navigate(['/admin/staff']));	
	}

	
}
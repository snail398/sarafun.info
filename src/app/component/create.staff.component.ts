import { Component, OnInit } from '@angular/core';
import {Account} from '../entity/account';
import { HttpService} from '../service/http.service';
import { StaffService} from '../service/staff.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import {Establishment} from '../entity/establishment';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl:'../html/create.staff.component.html',
  styleUrls: ['../css/actions.component.css','../css/editpers.css'],
  providers: [HttpService]
})
export class CreateStaffComponent implements OnInit{
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
	edit:boolean = false;
	confirm:string;
	
 constructor(private httpService: HttpService,
			 private staffService: StaffService,
			 private router: Router,
			 private accountModel:AccountModel
			 ){}
			 
    ngOnInit(){
          this.httpService.getEstablishments('/establisments/getestablishmentbymarketologid', 
											  new HttpParams().set('accountid',this.accountModel.getAccount().id.toString()))
											  .subscribe(data => 
											  {for (var i = 0; data.length > i; i++) 
											  { this.establishments.push(data[i])}}
											  );	
    }
		 
	createStaff(){ 
		var url:string;
		if (this.staffService.getIsBarmen() == true) 
			url = '/registration/barmen';
		else
			url = '/registration/marketolog';
			
	    this.httpService.getForSimpleData(url, 
											  new HttpParams().set('creatorid',this.accountModel.getAccount().id.toString())
														.set('login',this.staffAcc.login)
														.set('pass',this.staffAcc.password)
														.set('firstname',this.staffAcc.firstName)
														.set('secondname',this.staffAcc.secondName)
														.set('estadress',this.establishment.estName))
											  .subscribe(data=>this.router.navigate(['/admin/staff']));	
	}
	
  onChangeObj(newObj) {
    console.log('event');
    console.log(newObj);
    this.selectedEst = newObj;
	this.establishment = newObj;
	
    // ... do other stuff here ...
  }
	
}
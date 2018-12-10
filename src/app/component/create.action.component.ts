import { Component, OnInit } from '@angular/core';
import {Action} from '../entity/action';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import {Establishment} from '../entity/establishment';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl:'../html/create.action.component.html',
  styleUrls: ['../css/app.component.css','../css/edit.css'],
  providers: [HttpService]
})
export class CreateActionComponent implements OnInit{
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
	action:Action = new Action();
	datesince:any;
	dateend:any;
	establishment:Establishment = new Establishment();
	edit:boolean = false;
	selectedEst:Establishment = new Establishment();
	
 constructor(private httpService: HttpService,
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
		
	createAction(){
	  this.httpService.createItem('/actions/addNewAction', 
											  new HttpParams().set('creatorid',this.accountModel.getAccount().id.toString()).set('est',this.establishment.estName),
											  this.action)
											  .subscribe(data=>this.router.navigate(['/admin/actions']));	
	}
	changedatesince(){
		this.action.timeStart = Date.parse(this.datesince);

	}
	changedateend(){
		this.action.timeEnd = Date.parse(this.dateend);
	}
	  onChangeObj(newObj) {
    console.log('event');
    console.log(newObj);
    this.selectedEst = newObj;
	this.establishment = newObj;
	
    // ... do other stuff here ...
  }
}
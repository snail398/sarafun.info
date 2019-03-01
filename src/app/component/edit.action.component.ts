import { Component, OnInit } from '@angular/core';
import {Action} from '../entity/action';
import {ActionTrue} from '../entity/actionTrue';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import {Establishment} from '../entity/establishment';
import { FormsModule } from '@angular/forms';
import { ActionService} from '../service/action.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl:'../html/create.action.component.html',
  styleUrls: ['../css/app.component.css','../css/edit.css'],
  providers: [HttpService]
})
export class EditActionComponent implements OnInit{
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
	selectedEst:Establishment = new Establishment();
	edit:boolean = true;
	
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private actionService: ActionService,
			 private router: Router
			 ){}
			 
    ngOnInit(){
		  this.action = this.actionService.getAction();
		  this.action.between =undefined;
		  this.datesince = this.action.timeStart;
		  this.dateend = this.action.timeEnd;
		  this.changedatesince();
		  this.changedateend();
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
											  	this.httpService.getEstablishment('/actions/getactionsest', 
													new HttpParams().set('actionid',this.actionService.getAction().id.toString())).subscribe((data:Establishment) =>
														{
														this.selectedEst =  this.establishments.find(x => x.estName == data.estName);
														this.establishment = data;
														}
													);
    }
  onChangeObj(newObj) {
    console.log('event');
    console.log(newObj);
    this.selectedEst = newObj;
	this.establishment = newObj;
	
    // ... do other stuff here ...
  }
	editAction(){
	  this.httpService.createItem('/actions/changeaction', 
											  new HttpParams().set('est',this.establishment.estName),
											  this.action)
											  .subscribe(data=>
		   this.router.navigate(['/admin/actions']));	
	}
	changedatesince(){
		this.action.timeStart = Date.parse(this.datesince);
	}
	changedateend(){
		this.action.timeEnd = Date.parse(this.dateend);
	}
	
}
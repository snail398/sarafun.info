import { Component, OnInit ,ViewChild } from '@angular/core';
import {Action} from '../entity/action';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import {Establishment} from '../entity/establishment';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { ModalComponent} from '../component/modal.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl,SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl:'../html/create.action.component.html',
  styleUrls: ['../css/app.component.css','../css/edit.css'],
  providers: [HttpService]
})
export class CreateActionComponent implements OnInit{
	@ViewChild(ModalComponent) 
    private modalComp: ModalComponent;
	
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
	validationResult:SafeHtml="<p>Поля с ошибками:</p> <ul>";
	
 constructor(private httpService: HttpService,
			 private router: Router,
			 private accountModel:AccountModel,
			 private sanitizer: DomSanitizer 
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
		if(this.validate()){
			this.httpService.createItem('/actions/addNewAction', 
											  new HttpParams().set('creatorid',this.accountModel.getAccount().id.toString()).set('est',this.establishment.estName),
											  this.action)
											  .subscribe(data=>this.router.navigate(['/admin/actions']));	
		}
		else
		{
			this.show()//Показать диалоговое окно с ошибками ввода
		}
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
	}
	show(){
		this.modalComp.show();
	}
	validate():boolean{
	    this.validationResult="<p>Поля с ошибками:</p> <ul>";
		var flag:boolean = true;
		if (this.action.reward==undefined ||this.action.reward=="") {
		this.validationResult+= "<li>Введите главную награду</li>";
		flag = false;
		}
		if (this.action.supportReward==undefined ||this.action.supportReward=="") {
		this.validationResult+= "<li>Введите награду для друзей</li>";
		flag = false;
		}
		if (this.action.target==undefined ) {
		this.validationResult+= "<li>Введите цель</li>";
		flag = false;
		}
		if (this.establishment.estName==undefined ||this.establishment.estName=="") {
		this.validationResult+= "<li>Выберите заведение</li>";
		flag = false;
		}
		if (this.action.description==undefined ||this.action.description=="") {
		this.validationResult+= "<li>Введите описание акции</li>";
		flag = false;
		}
		if (this.action.timeStart==undefined ) {
		this.validationResult+= "<li>Выберите день начала акции</li>";
		flag = false;
		}
		if (this.action.timeEnd==undefined ) {
		this.validationResult+= "<li>Выберите день окончания акции</li>";
		flag = false;
		}
		
		this.validationResult+= "</ul>";
		return flag;
	}
  
}
import { Component, OnInit ,ViewChild } from '@angular/core';
import {Account} from '../entity/account';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import {Establishment} from '../entity/establishment';
import { FormsModule } from '@angular/forms';
import { StaffService} from '../service/staff.service';
import {Router} from '@angular/router';
import { ModalComponent} from '../component/modal.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl,SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl:'../html/create.staff.component.html',
  styleUrls: ['../css/app.component.css','../css/editpers.css'],
  providers: [HttpService]
})
export class EditStaffComponent implements OnInit{
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
	staffAcc:Account = new Account();
	establishment:Establishment = new Establishment();
	selectedEst:Establishment = new Establishment();
	edit:boolean = true;
	validationResult:SafeHtml="<p>Поля с ошибками:</p> <ul>";
	
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private staffService: StaffService,
			 private router: Router,
			 private sanitizer: DomSanitizer
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
		if(this.validate()){
	  this.httpService.createItem('/staff/changestaffinfo', 
											  new HttpParams().set('creatorid',this.accountModel.getAccount().id.toString()).set('estname',this.establishment.estName),
											  this.staffAcc)
											  .subscribe(data=>
			 this.router.navigate(['/admin/staff']));	
												}
			 else
			 {
				 this.show()//Показать диалоговое окно с ошибками ввода
			 }
	}

	show(){
		this.modalComp.show();
	}
	validate():boolean{
	    this.validationResult="<p>Поля с ошибками:</p> <ul>";
		var flag:boolean = true;
		if (this.staffAcc.firstName==undefined ||this.staffAcc.firstName=="") {
		this.validationResult+= "<li>Введите имя члена команды</li>";
		flag = false;
		}
		if (this.staffAcc.login==undefined ||this.staffAcc.login=="") {
		this.validationResult+= "<li>Введите логин члена команды</li>";
		flag = false;
		}
		if (this.staffAcc.secondName==undefined||this.staffAcc.secondName=="" ) {
		this.validationResult+= "<li>Введите фамилию члена команды</li>";
		flag = false;
		}
		if (this.staffAcc.password==undefined ||this.staffAcc.password=="") {
		this.validationResult+= "<li>Введите пароль члена команды</li>";
		flag = false;
		}
		if (this.establishment.estName==undefined ||this.establishment.estName=="") {
		this.validationResult+= "<li>Выберите заведение</li>";
		flag = false;
		} 

		this.validationResult+= "</ul>";
		return flag;
	}
}
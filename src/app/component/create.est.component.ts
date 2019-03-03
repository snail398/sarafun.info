import { Component, OnInit ,ViewChild } from '@angular/core';
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
  templateUrl:'../html/create.est.component.html',
  styleUrls: ['../css/app.component.css','../css/editzav.css'],
  providers: [HttpService]
})
export class CreateEstComponent implements OnInit{
	@ViewChild(ModalComponent) 
    private modalComp: ModalComponent;
	est:Establishment = new Establishment();
	edit:boolean = false;
	validationResult:SafeHtml="<p>Поля с ошибками:</p> <ul>";
	
 constructor(private httpService: HttpService,
			 private router: Router,
			 private accountModel:AccountModel,
			 private sanitizer: DomSanitizer 
			 ){}
			 
    ngOnInit(){
     
    }
		
	createEst(){
		if(this.validate()){
	  this.httpService.createItem('/establisments/createEstablishment', 
											  new HttpParams().set('accountid',this.accountModel.getAccount().id.toString()),
											  this.est)
												.subscribe(data=>this.router.navigate(['/admin/est']));	
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
		if (this.est.estName==undefined ||this.est.estName=="") {
		this.validationResult+= "<li>Введите название заведения</li>";
		flag = false;
		}
		if (this.est.estPhone==undefined ||this.est.estPhone=="") {
		this.validationResult+= "<li>Введите телефон заведения</li>";
		flag = false;
		}
		if (this.est.estSite==undefined||this.est.estSite=="" ) {
		this.validationResult+= "<li>Введите сайт заведения</li>";
		flag = false;
		}
		if (this.est.estEmail==undefined ||this.est.estEmail=="") {
		this.validationResult+= "<li>Введите почту заведения</li>";
		flag = false;
		}
		if (this.est.estWorkTime==undefined ||this.est.estWorkTime=="") {
		this.validationResult+= "<li>Введите время работы заведения</li>";
		flag = false;
		}
		if (this.est.factAdress==undefined ||this.est.factAdress=="") {
		this.validationResult+= "<li>Введите адрес заведения</li>";
		flag = false;
		}
		if (this.est.estDescription==undefined||this.est.estDescription=="" ) {
		this.validationResult+= "<li>Введите описание заведения</li>";
		flag = false;
		}

		this.validationResult+= "</ul>";
		return flag;
	}
	
}
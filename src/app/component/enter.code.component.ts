 import { Component, OnInit,ViewChild } from '@angular/core';
import {Action} from '../entity/action';
import {Account} from '../entity/account';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import { ActionService} from '../service/action.service';
import {Router} from '@angular/router';
import { ModalComponent} from '../component/modal.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
 
@Component({  
  selector: 'app-content',
  templateUrl:'../html/enter.code.component.html',
  styleUrls: ['../css/app.component.css','../css/edit.css'], 
  providers: [HttpService]
})
export class EnterCodeComponent implements OnInit{ 
	@ViewChild(ModalComponent)
    private modalComp: ModalComponent;
    action:number=0;
	account:number=0;
	sarCode:string="";
	public mask = [/[C,S]/, /[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/,  /\d/, /\d/, /\d/];
	 public loading = false;
	 message:string="";
	 header:string="";
	 myHtml:string="";
	 
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private router: Router,
			 private actionService: ActionService,
			 private sanitizer: DomSanitizer
			 ){}
			 
    ngOnInit(){
    }
	
	show(){
		this.modalComp.show();
	}
	
	understand(){
		this.modalComp.hide();
		this.router.navigate(['/admin/menu']);
	}
	
	getLinkAndBonus(){
	this.httpService.getForSimpleData('/getlinkandbonus',
	new HttpParams().set('userid',this.account.toString()).set('actionid',this.action.toString()).set('staffid',this.accountModel.getAccount().id.toString()))
	.subscribe(
		data=>
		{
			this.header = "Выдайте бонус и не забудьте отправить сообщение аффилиату";
			var re =/\|/gi;
			var se = /iPhone/gi;
			if ((window.navigator.userAgent).search(se) !=-1)
			{
				this.myHtml = this.sanitizer.bypassSecurityTrustHtml("<p>Выдайте бонус рефералу! Его подарок - "+data.substr(data.search(re)+1)+"</p></br><p>Аффилиат завершил акцию! Кликните на ссылку, для отправки сообщения с ссылкой на сарафанку</p></br>"+"<a href=\"sms:+"+data.substr(0,11)+"&body="+data.substr(11,data.search(re)-11)+"\">"+data.substr(11,data.search(re)-11)+"</a>");

			}
			else
			{
			this.myHtml = this.sanitizer.bypassSecurityTrustHtml("<p>Выдайте бонус рефералу! Его подарок - "+data.substr(data.search(re)+1)+"</p></br><p>Аффилиат завершил акцию! Кликните на ссылку, для отправки сообщения с ссылкой на сарафанку</p></br>"+"<a href=\"sms:+"+data.substr(0,11)+"?body="+data.substr(11,data.search(re)-11)+"\">"+data.substr(11,data.search(re)-11)+"</a>");
			}
			this.loading = false;
			this.show();
		}
	);
	}
	
	enterCode(){
		//Проверка введенного кода
		if (this.sarCode.length == 10)
		{
		this.loading = true;
			//Распарсить введеный код
			this.account= +this.sarCode.substr(1,4);
			this.action = +this.sarCode.substr(5,5);

			//Отправить соответствующий запрос
			switch(this.sarCode.substr(0,1)){
				case "S":{
				this.httpService.getForSimpleData('/runningactions/changeprogressforsocial',
													new HttpParams().set('userid',this.account.toString()).set('actionid',this.action.toString()).set('staffid',this.accountModel.getAccount().id.toString()))
													.subscribe(data=>{
														switch (data){
															case "error":{
																this.header = "Ошибка";
																this.myHtml = "<p>Ошибка отправки смс</p>";
																this.loading = false;
																this.show();
																break;
															}
															
															case "noexist":{
																this.header = "Неверный код";
																this.myHtml = "<p>Такого кода нет</p>";
																this.loading = false;
																this.show();
																break;
															}
															case "finish":{
																//Запрос на получение ссылки для аффилиата и бонуса для реферала
																this.getLinkAndBonus();
																break;
															}
															default:{
																this.header = "Выдайте бонус";
																this.myHtml = "<p>Выдайте бонус рефералу! Его подарок - "+data+"</p>";
																this.loading = false;
																this.show();
																break;
															}
														}
													});
													//Сообщение о выдаче бонуса рефералу 
				break;
				}
				case "C":{
							this.httpService.getForSimpleData('/coupons/deleteusedcoupon',
													new HttpParams().set('accountid',this.account.toString()).set('actionid',this.action.toString()).set('staffid',this.accountModel.getAccount().id.toString()))
													.subscribe(data=>{
														switch (data){
															case "noexist":{
																this.header = "Неверный код";
																this.myHtml = "<p>Такого кода нет</p>";
																this.loading = false;
																this.show();
																break;
															}
															default:{
																this.header = "Выдайте бонус";
																this.myHtml = "<p>Выдайте бонус аффилиату! Его подарок - "+data+"</p>";
																this.loading = false;
																this.show();
																break;
															}
														}
														});
													//Сообщение о выдаче бонуса аффилиату
				break;
				}
			}
			
		}
	}
	
}
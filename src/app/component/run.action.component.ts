import { Component, OnInit,ViewChild } from '@angular/core';
import {Action} from '../entity/action';
import {Account} from '../entity/account';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import { ActionService} from '../service/action.service';
import {Router} from '@angular/router';
import { ModalComponent} from '../component/modal.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl,SafeHtml} from '@angular/platform-browser';

@Component({  
  selector: 'app-content',
  templateUrl:'../html/run.action.component.html',
  styleUrls: ['../css/actions.component.css','../css/action.css'], 
  providers: [HttpService]
})
export class RunActionComponent implements OnInit{ 
@ViewChild(ModalComponent)
    private modalComp: ModalComponent;
    actions:Action[]=[];
	newAcc:Account = new Account();
	clientPhone:string="";
	public mask = [7,'(', /[0-9]/, /\d/, /\d/, ')',/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	 public loading = false;
	 message:string="";
	 header:string="";
	 myHtml:SafeHtml="";
	 
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
		this.router.navigate(['/admin/actions']);
	}
	createNewAcc(){
		this.newAcc.login ="Ваш E-mail";
		this.newAcc.phoneNumber =this.clientPhone;
		this.newAcc.password ="Ваш e-mail";
		this.newAcc.firstName ="Ваше имя";
		this.newAcc.secondName ="Ваша фамилия";
		this.newAcc.accountType ="user";
		this.newAcc.pathToAvatar ="noavatar";
	}
	getLink(){
		this.modalComp.hide();
		this.loading = true;
		this.httpService.getForSimpleData('/getlink',
										new HttpParams().set('userphone',this.newAcc.phoneNumber).set('actionid',this.actionService.getAction().id.toString()).set('staffid',this.accountModel.getAccount().id.toString()))
										.subscribe(
											data=>
											{
												this.header = "Отправьте сообщение вручную";
												this.loading = false;
												this.myHtml= this.sanitizer.bypassSecurityTrustHtml("<p>Кликните на ссылку, для отправки сообщения</p></br><a href=\"sms:+"+this.newAcc.phoneNumber+"?body="+data+"\">"+data+"</a>");
												this.message= "";
												this.show();
											}
										);
	}  
	startAction(){
		this.createNewAcc();
		this.loading = true;
		this.httpService.createItem('/runningactions/newract',
							new HttpParams().set('action',this.actionService.getAction().id.toString()).set('messagetype','whatsapp').set('staffid',this.accountModel.getAccount().id.toString()),this.newAcc).subscribe(
							data=>{
							switch (data){
								case 2:{
									this.loading = false;
									this.header = "Акция запущена";
									this.myHtml = "<p>Акция запущена для клиента "+this.newAcc.phoneNumber+"</p>";
									this.show();
									break;
									}
								case -2:{
									this.header = "Ошибка запуска";
									this.myHtml = "<p>Ошибка сервиса отправки сообщений</p>";
									this.loading = false;
									this.show();
									break;
									}
							}	
							});
							
	}
	
}
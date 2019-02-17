//import { Component } from '@angular/core';
//import { LibService } from 'angular-font-awesome';


import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService} from '../service/http.service';
import { AdminkaComponent} from '../component/adminka.component';
import { FormsModule } from '@angular/forms';
import {Action} from '../entity/action';
import {Coupon} from '../entity/coupon';
import {Company} from '../entity/company';
import {Establishment} from '../entity/establishment';
import {CustomMap} from '../entity/customMap';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {RunningAction} from '../entity/runningAction';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
 
import { AccountModel } from '../account.model';
import {Router} from '@angular/router';
import { ModalComponent} from '../component/modal.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl,SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-content', 
  templateUrl:'../html/user.home.component.html',
  styleUrls: ['../css/app.component.css','../css/user.home.css'],  
  providers: [HttpService,CookieService]
})
export class UserHomeComponent implements OnInit  {
	@ViewChild(ModalComponent) 
    private modalComp: ModalComponent;
	
	runningActions:RunningAction[]=[];
	actions:Action[]=[];
	coupons:Coupon[]=[];
	actionIDs:number[]=[];
	estArr:string[]=[];
	ready:boolean = false;
	readyEst:boolean = false;
	readyComp:boolean = false;
	sarHtml:string = "";
	
	estMap:CustomMap[]=[];
	compMap:CustomMap[]=[];
	estList:Establishment[]=[];
	compList:Company[]=[];
	tempID:number;
										nameAgeMapping = new Map();
 constructor(private httpService: HttpService,
			 private router: Router,
			 private accountModel:AccountModel,
			 private cookieService:CookieService,
			 private adminka:AdminkaComponent,
			 private sanitizer: DomSanitizer 
			 ){
				 //загрузка списка запущенных акций
			this.httpService.getRunningActions('/getrunningactionsbyaccid', 
				new HttpParams().set('accountid',this.accountModel.getAccount().id.toString())).subscribe(data => { 
				this.runningActions=data;
				//загрузка информации об акциях
				this.httpService.getActionsPOST('/actions/getactionsbyarr', 
				new HttpParams(),this.unique(this.runningActions)).subscribe(data => { 
					this.actions=data;
					this.ready = true;
					this.httpService.postForMap('/establisments/getestbyarr', 
										new HttpParams(),this.unique(this.runningActions))
										.subscribe(data=>
										{
										this.estMap =data;
										this.httpService.postForEst('/establisments/getfullestbyarr', 
										new HttpParams(),this.unique(this.runningActions))
										.subscribe(data=>
										{
										this.estList =data;
										this.readyEst = true;
										
										}
									   );
										}
									   );
					this.httpService.postForMap('/companies/getcompanybyarr', 
										new HttpParams(),this.unique(this.runningActions))
										.subscribe(data=>
										{
										this.compMap =data;
										this.httpService.postForComp('/companies/getfullcompanybyarr', 
										new HttpParams(),this.unique(this.runningActions))
										.subscribe(data=>
										{
										this.compList =data;
										this.readyComp = true;
										
										}
									   );
										}
									   );
						
					}
					);
				}
			  );
			
		//загрузка инфы о доступных купонах
		this.httpService.getCoupons('/coupons/getcouponsbyuserlogin', 
		  new HttpParams().set('accountid',this.accountModel.getAccount().id.toString())).subscribe(data => {
			  this.coupons=data;
				}
		  );	
			 }

	show(){
		this.modalComp.show();
	}
    ngOnInit(){
    }
	
	
	
	getAction(id:number): Action{
		if (this.ready)
		return (this.actions.find(x=>x.id==id));
		else 
			return new Action();
	}
	
	getFriendCount(id:number): string{
		if (this.ready)
		{
		if (this.actions.find(x=>x.id==id).target == 1 )
		return "1 друга";
		else return this.actions.find(x=>x.id==id).target+" друзей"
		}
		else 
			return "";
	}
	
	stringComplited(code:number):string{
		switch (code){
		case 0:{
			return "Акция активна";
			break;
			}
		case 1:{
			return "Акция завершена"; 
			break; 
			}	
		}
	}  
	
	getEstAdressForAction(ract:RunningAction){
		if (this.readyEst && this.readyComp ){
			if(this.estMap.find(x=>x.id==ract.actionTitleID).text == "Все заведения" )
				 
					return this.sanitizer.bypassSecurityTrustHtml("<p>Эта акция действует в компании "+this.compMap.find(x=>x.id==ract.actionTitleID).text+" по всем адресам</p> </br> <a href=\"tel: "+this.compList.find(x=>x.title==this.compMap.find(x=>x.id==ract.actionTitleID).text).phone+"\">Телефон:"+this.compList.find(x=>x.title==this.compMap.find(x=>x.id==ract.actionTitleID).text).phone+"</a>"+"</br><a href=\"http://"+this.compList.find(x=>x.title==this.compMap.find(x=>x.id==ract.actionTitleID).text).site+"\">Сайт:"+this.compList.find(x=>x.title==this.compMap.find(x=>x.id==ract.actionTitleID).text).site+"</a>");
			else 
				return this.sanitizer.bypassSecurityTrustHtml("<p>Эта акция действует в компании "+this.compMap.find(x=>x.id==ract.actionTitleID).text+" по адресу: "+ this.estMap.find(x=>x.id==ract.actionTitleID).text+"</p> </br> <a href=\"tel: "+this.estList.find(x=>x.factAdress==this.estMap.find(x=>x.id==ract.actionTitleID).text).estPhone+"\">Телефон:"+this.estList.find(x=>x.factAdress==this.estMap.find(x=>x.id==ract.actionTitleID).text).estPhone+"</a>"+"</br><a href=\"http://"+this.estList.find(x=>x.factAdress==this.estMap.find(x=>x.id==ract.actionTitleID).text).estSite+"\">Сайт:"+this.estList.find(x=>x.factAdress==this.estMap.find(x=>x.id==ract.actionTitleID).text).estSite+"</a>");
		}
		else	
			return "";
	}
	
	getSarafanka(ract:RunningAction):string{
		return "<a class=\" share_btn iconka  fa fa-download\" aria-hidden=\"true\" id=\""+ract.id+"\" type=\"button\"  data-social=\"download\" href=\"http://sarafun.info:4200/sarafunkas/"+ract.pathToSarafunkaForFriend+"\" target=\"_blank\"> </a>";
	}
	
	getRefUrl(ract:RunningAction):string{
		var re = /\\/gi;
	//return "http://sarafun.info:4200/getreposted?ractid="+ract.id;
	return "http://sarafun.info/assets/reposted.html?link="+ract.pathToSarafunkaForFriend.replace(re,"/");
	//return "http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/";
	}
	
	deleteRAction(runningAction:RunningAction){
	this.httpService.getForSimpleData('/runningactions/delete', 
										new HttpParams().set('ractionid',runningAction.id.toString()))
										.subscribe(data=>
										this.runningActions = this.runningActions.filter(item=>item.id!==runningAction.id)
									   );
	}
	
	getFinalCoupon(runningAction:RunningAction){
	
		return this.sanitizer.bypassSecurityTrustUrl("http://sarafun.info:4200/sarafunkas/"+this.coupons.find(x=>x.accountID==runningAction.accountLoginID && x.actionID==runningAction.actionTitleID).pathToSarafunka)									   
	}
	
	getSocial(ract:RunningAction):SafeHtml{
		return this.sanitizer.bypassSecurityTrustHtml(
			"<h6  class=\" share_btn iconka fab fa-vk\" aria-hidden=\"true\" type=\"button\" id=\""+ract.id+"\" data-social=\"vk\" data-url=\""+this.getRefUrl(ract)+"\">  </h6>"+
			"<h6  class=\" share_btn iconka fab fa-facebook\" aria-hidden=\"true\" type=\"button\" id=\""+ract.id+"\"  data-social=\"fb\" data-url=\""+this.getRefUrl(ract)+"\">  </h6>"+
			"<h6  class=\" share_btn iconka fab fa-twitter\" aria-hidden=\"true\" type=\"button\" id=\""+ract.id+"\" data-social=\"tw\" data-url=\""+this.getRefUrl(ract)+"\">  </h6>"+
			"<h6  class=\" share_btn iconka  fab fa-whatsapp\" aria-hidden=\"true\" type=\"button\" id=\""+ract.id+"\" data-social=\"whatsapp\" data-url=\""+this.getRefUrl(ract)+"\">  </h6>"+
			this.getSarafanka(ract) 
	 )
	}
	
	say(){
	console.log("hello");
	}
	
	//<input value="Facebook c data-url" type="button" class="share_btn" data-social="fb" data-url="getRefUrl(runningAction)"> 
	//<input value="Одноклассники c data-url" type="button" class="share_btn" data-social="ok" data-url="getRefUrl(runningAction)"> 
	//<input value="Twitter c data-url" type="button" class="share_btn" data-social="tw" data-url="getRefUrl(runningAction)"> 
 
	unique(arr:RunningAction[]) {
		var obj = {};
		for (var i = 0; i < arr.length; i++) {
			var str = arr[i].actionTitleID;
			obj[str] = true; // запомнить строку в виде свойства объекта
		}

		return Object.keys(obj); // или собрать ключи перебором для IE8-
	}
	
}
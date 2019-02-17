import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService} from '../service/http.service';
import { AdminkaComponent} from '../component/adminka.component';
import { FormsModule } from '@angular/forms';
import {Action} from '../entity/action';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {RunningAction} from '../entity/runningAction';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import { AccountModel } from '../account.model';
import {Router} from '@angular/router';
import { ModalComponent} from '../component/modal.component';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl:'../html/referal.component.html',
  styleUrls: ['../css/app.component.css','../css/login.css'], 
  providers: [HttpService,CookieService]
})
export class ReferalComponent implements OnInit  {
	@ViewChild(ModalComponent)
    private modalComp: ModalComponent;
	
	runningActions:RunningAction[]=[];
	actions:Action[]=[];
	actionIDs:number[]=[];
	sarPath:string="";
	myHtml:string = "";
    private querySubscription: Subscription;
	
 constructor(private httpService: HttpService,
			 private router: Router,
			 private cookieService:CookieService,
			 private route: ActivatedRoute
			 ){
				 
			this.querySubscription = route.queryParams.subscribe(
				(queryParam: any) => {
					this.sarPath = queryParam['sarpath'];
				}
			);
			if (this.sarPath !=undefined)
			this.myHtml="<img src=\"http://sarafun.info:4200/sarafunkas/jpg/"+this.sarPath.slice(0,this.sarPath.length-4) +".png\" alt=\"sarafanka for referal\"/></br><a href=\"http://sarafun.info:4200/sarafunkas/" +this.sarPath+"\"> Скачать сарафанку </a>"
		}
	show(){
		this.modalComp.show();
	} 
    ngOnInit(){
		
    }
	

	
}
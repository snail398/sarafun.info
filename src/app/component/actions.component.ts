 import { Component, OnInit ,ViewChild} from '@angular/core';
import {Action} from '../entity/action';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import { ActionService} from '../service/action.service';
import {Router} from '@angular/router';
import { ModalComponent} from '../component/modal.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl,SafeHtml} from '@angular/platform-browser';
import * as qrcode from '../js/qrcode';

//comment
//secondcomment

@Component({   
  selector: 'app-content',
  templateUrl:'../html/actions.component.html',
  styleUrls: ['../css/actions.component.css','../css/action.css'], 
  providers: [HttpService]
}) 
export class ActionsComponent implements OnInit{ 
	@ViewChild(ModalComponent) 
   private modalComp: ModalComponent;
 	
    actions:Action[]=[];
	time:string="";
	
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private router: Router,
			 private actionService: ActionService,
			 private sanitizer: DomSanitizer 
			 ){
				 

			 }
	show1(){
		this.modalComp.show();
	}
    ngOnInit(){ 
							
          this.httpService.getActionsPOST('/actions/getactionsforstaff', 
		  new HttpParams(),
		  this.accountModel.getAccount()).subscribe(data => { 
			  this.actions=data;
			  /*
			  this.actions.forEach(function (value) {
				  	console.log('qr'+value.id);
				  	console.log("1");
					var typeNumber = 4;
					var errorCorrectionLevel = 'L';
					var qr = qrcode(typeNumber, errorCorrectionLevel);
					qr.addData('Hi!');
					qr.make();
					
				  	console.log("2");
					document.getElementById("lololo").innerHTML = qr.createImgTag();
					
				  	console.log("3");
				}); 
				*/
				}
		  );	
    }
	makeqr(){
	  this.actions.forEach(function (value) {
				  	console.log('qr'+value.id);
				  	console.log("1");
					var typeNumber = 4;
					var errorCorrectionLevel = 'L';
					var qr = qrcode(typeNumber, errorCorrectionLevel);
					qr.addData('Hi!');
					qr.make();
					
				  	console.log("2");
					document.getElementById("lololo").innerHTML = qr.createImgTag();
					
				  	console.log("3");
				}); 
	}
	setAction(action:Action){
		this.actionService.setAction(action);
		this.router.navigate(['/admin/actions/edit']);
	}
	
	showQR(action:Action){
		this.actionService.setAction(action);
		this.router.navigate(['/admin/actions/qr']);
	}
	
	getQR(action:Action):SafeHtml{
	return this.sanitizer.bypassSecurityTrustHtml("<div id=\"lololo\"></div>");
	
	}
	
	getAds(action:Action):SafeHtml{
	return this.sanitizer.bypassSecurityTrustHtml("<a href=\"http://sarafun.info:4200/ads/"+action.pathToPDF+"\" target=\"_blank\">Буклет акции</a>");
	
	}
	
	startAction(action:Action){
		this.actionService.setAction(action);
		this.router.navigate(['/admin/actions/run']);
	}
	
	deleteAction(action:Action){
		this.httpService.getForSimpleData('/actions/deletactionbyID', 
										new HttpParams().set('actionid',action.id.toString()))
										.subscribe(data=>
										this.actions = this.actions.filter(item=>item.id!==action.id)
									   );
	}
}
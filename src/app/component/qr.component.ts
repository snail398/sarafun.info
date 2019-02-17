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
@Component({   
  selector: 'app-content',
  template:'<p>Отсканируйте QR-код</p><div id="qr-cont"> </div>',
  styleUrls: ['../css/actions.component.css','../css/action.css'], 
  providers: [HttpService]
}) 
export class QrComponent implements OnInit{ 

	action:Action =new Action();
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private router: Router,
			 private actionService: ActionService,
			 private sanitizer: DomSanitizer 
			 ){
				 

			 }

    ngOnInit(){ 
		
		this.action = this.actionService.getAction();
		this.makeqr();
    }
	makeqr(){
					var typeNumber = 4;
					var errorCorrectionLevel = 'L';
					var qr = qrcode(typeNumber, errorCorrectionLevel);
					qr.addData("http://sarafun.info/assets/sap.html?action="+this.action.id+"&staffid="+this.accountModel.getAccount().id);
					qr.make();
					document.getElementById("qr-cont").innerHTML = qr.createImgTag(10,10,10);	
	}
	
	
	
}
import { Component, OnInit } from '@angular/core';
import {Action} from '../entity/action';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import { ActionService} from '../service/action.service';
import {Router} from '@angular/router';
import {StaffOperationHistory} from '../entity/staffOperationHistory';
 
@Component({
  selector: 'app-content',
  templateUrl:'../html/soh.component.html',
  styleUrls: ['../css/soh.css'], 
  providers: [HttpService]
})
export class SOHComponent implements OnInit{ 
    sohs:StaffOperationHistory[]=[];
	
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private router: Router,
			 private actionService: ActionService
			 ){}
			 
    ngOnInit(){
          this.httpService.getStaffOH('/staffOperationHistory/getoperations', 
		  new HttpParams().set('staffid',this.accountModel.getAccount().id.toString())).subscribe(data => {
			  this.sohs=data;
				}
		  );	
    }

}
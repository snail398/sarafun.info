 import { Component, OnInit ,ViewChild} from '@angular/core';
import {Action} from '../entity/action';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import { ActionService} from '../service/action.service';
import {Router} from '@angular/router';
import { ModalComponent} from '../component/modal.component';
 
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
			 private actionService: ActionService
			 ){}
	show(){
		this.modalComp.show();
	}
    ngOnInit(){ 
          this.httpService.getActionsPOST('/actions/getactionsforstaff', 
		  new HttpParams(),
		  this.accountModel.getAccount()).subscribe(data => { 
			  this.actions=data;
				}
		  );	
    }
	setAction(action:Action){
		this.actionService.setAction(action);
		this.router.navigate(['/admin/actions/edit']);
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
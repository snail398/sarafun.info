import { Component, OnInit } from '@angular/core';
import {Action} from '../entity/action';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import { ActionService} from '../service/action.service';
import {Router} from '@angular/router';
import {Stat} from '../entity/stat';
 
@Component({
  selector: 'app-content',
  templateUrl:'../html/stat.component.html',
  styleUrls: ['../css/actions.component.css','../css/stat.css'], 
  providers: [HttpService]
})
export class StatComponent implements OnInit{ 
    stat:Stat[]=[];
	
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private router: Router,
			 private actionService: ActionService
			 ){}
			 
    ngOnInit(){
          this.httpService.getStat('/statistic/getstatbymarketid', 
		  new HttpParams().set('marketologid',this.accountModel.getAccount().id.toString())).subscribe(data => {
			  this.stat=data;
			  console.log(this.stat);
				}
		  );	
    }

}
import { Component, OnInit } from '@angular/core';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import { EstService} from '../service/est.service';
import {Router} from '@angular/router';
import {Establishment} from '../entity/establishment';
 
@Component({
  selector: 'app-content',
  templateUrl:'../html/est.component.html',
  styleUrls: ['../css/app.component.css','../css/zav.css'], 
  providers: [HttpService]
})
export class EstComponent implements OnInit{ 
    establishments:Establishment[]=[];
	
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private router: Router,
			 private estService: EstService
			 ){}
			 
    ngOnInit(){
           this.httpService.getEstablishments('/establisments/getestablishmentbymarketologid', 
											  new HttpParams().set('accountid',this.accountModel.getAccount().id.toString()))
											  .subscribe(data => 
											  {for (var i = 0; data.length > i; i++) 
											  { this.establishments.push(data[i]);
											
												}
												}
												
											  );
    }
	setEst(est:Establishment){
		this.estService.setEst(est);
		this.router.navigate(['/admin/est/edit']);
	}
	
	deleteEst(est:Establishment){
		this.httpService.getForSimpleData('/establisments/deleteestablishment', 
										new HttpParams().set('estid',est.id.toString()))
										.subscribe(data=>
										this.establishments = this.establishments.filter(item=>item.id!==est.id)
									   );
	}
}
import { Component, OnInit } from '@angular/core';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import {Establishment} from '../entity/establishment';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl:'../html/create.est.component.html',
  styleUrls: ['../css/app.component.css','../css/editzav.css'],
  providers: [HttpService]
})
export class CreateEstComponent implements OnInit{

	est:Establishment = new Establishment();
	edit:boolean = false;
	
 constructor(private httpService: HttpService,
			 private router: Router,
			 private accountModel:AccountModel
			 ){}
			 
    ngOnInit(){
     
    }
		
	createEst(){
	  this.httpService.createItem('/establisments/createEstablishment', 
											  new HttpParams().set('accountid',this.accountModel.getAccount().id.toString()),
											  this.est)
											  .subscribe(data=>this.router.navigate(['/admin/est']));	
	}

	
}
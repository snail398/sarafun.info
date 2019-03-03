import { Component, OnInit } from '@angular/core';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AccountModel } from '../account.model';
import {Establishment} from '../entity/establishment';
import { FormsModule } from '@angular/forms';
import { EstService} from '../service/est.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl:'../html/create.est.component.html',
  styleUrls: ['../css/app.component.css','../css/editzav.css'],
  providers: [HttpService]
})
export class EditEstComponent implements OnInit{

	est:Establishment = new Establishment();
	edit:boolean = true;
	
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private estService: EstService,
			 private router: Router
			 ){}
			 
    ngOnInit(){
		  this.est = this.estService.getEst();
    }

	editEst(){
	  this.httpService.createItem('/establisments/editEstablishment', 
											  new HttpParams(),
											  this.est)
											  .subscribe(data=>
		   this.router.navigate(['/admin/est']));	
	}

	
}
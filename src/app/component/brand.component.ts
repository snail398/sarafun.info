import {Component, OnInit } from '@angular/core';
import {Company} from '../entity/company';
import {HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {AccountModel } from '../account.model';
import {ActionService} from '../service/action.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl:'../html/brand.component.html',
  styleUrls: ['../css/app.component.css','../css/brand.css'], 
  providers: [HttpService]
})
export class BrandComponent implements OnInit{ 

    brand:Company = new Company(); 	
	brandCategory:string ='';
	categories = 'Кальянная Бар Питание Кино Развлечения'.split(' ');
	categoriesReal = 'smoke drink eat movie game'.split(' ');
 constructor(private httpService: HttpService,
			 private accountModel:AccountModel,
			 private router: Router,
			 private actionService: ActionService
			 ){}
			 
    ngOnInit(){
          this.httpService.getForSimpleData('/companies/getmarketologcompany', 
		  new HttpParams().set('accountid',this.accountModel.getAccount().id.toString())).subscribe((data:Company) => {
			  this.brand=data;
			  this.brandCategory = this.getCategory(this.brand.category);
			  console.log(this.brandCategory);
				}
		  );	
    }
	
  onChange(newObj) {
    console.log('event');
    this.brand.category = this.getCategoryReal(newObj);
    console.log( this.brand);
	
    // ... do other stuff here ...
  }
  getCategory(categoryReal:string){
	  
	switch(categoryReal){
		case this.categoriesReal[0]:
		{
			return this.categories[0];
		break;
		}
		case this.categoriesReal[1]:
		{
			return this.categories[1];
		break;
		}
		case this.categoriesReal[2]:
		{
			return this.categories[2];
		break;
		}
		case this.categoriesReal[3]:
		{
			return this.categories[3];
		break;
		}
		case this.categoriesReal[4]:
		{
			return this.categories[4];
		break;
		}
	}
  }
 getCategoryReal(category:string){
	switch(category){
		case this.categories[0]:
		{
			return this.categoriesReal[0];
		break;
		}
		case this.categories[1]:
		{
			return this.categoriesReal[1];
		break;
		}
		case this.categories[2]:
		{
			return this.categoriesReal[2];
		break;
		}
		case this.categories[3]:
		{
			return this.categoriesReal[3];
		break;
		}
		case this.categories[4]:
		{
			return this.categoriesReal[4];
		break;
		}
	}
  }
  changeBrandInfo(){  
	  this.httpService.createItem('/companies/changecompanyinfobymain', 
											  new HttpParams(),
											  this.brand)
											  .subscribe(data=>
		   this.router.navigate(['/admin/menu']));	
  }
  }
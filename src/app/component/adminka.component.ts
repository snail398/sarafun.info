import { Component } from '@angular/core';
import { AccountModel } from '../account.model';
import {Router} from '@angular/router';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-adminka',
  template: `
    
<div class="fix">
  <div class="navbar navbar-inverse navbar-static-top ot">
        <div class="container">
            <div  class="navbar-header "  >
                <button type="button" class="navbar-toggle " data-toggle="collapse" data-target="#responsive-menu" >
                    <span class="sr-only ">Открыть навигацию</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span> 
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Сайт</a>
            </div>
            <div class="collapse navbar-collapse " id="responsive-menu" >
                <ul class="nav navbar-nav " >
                    <li><a routerLink="" >Лендинг</a></li>
                    <li><a routerLink="/admin/login">Админ</a></li>
                    <li [ngClass]="{invisible: visibility}"><a (click) = "logout()" >Выйти</a></li>\
                </ul>
			
            </div>
        </div>
    </div>
</div>
  
 <nav class="navbar navbar-vertical-left" [ngClass]="{invisible: visibility}">
  <ul class="nav navbar-nav">
   <li >
   <!--class="selected one"-->
   <a  routerLink="/admin/actions" >
   <i class="fa fa-fw fa-lg fa fa-beer" ></i>
   <span>Акции</span>
   </a>
   </li>
   <li>
   <a  class="two" routerLink="/admin/stat">
   <i class="fa fa-fw fa-lg fa-star"></i>
   <span>Статистика</span>
   </a>
   </li>
   <li>
   <a class="tree" routerLink="/admin/brand">
   <i class="fa fa-fw fa-lg fa fa-bath" aria-hidden="true" ></i>
   <span>Бренд</span>
   </a>
   </li>
   <li>
   <a class="for"  routerLink="/admin/est">
  <i class="fa fa-fw fa-lg fa fa fa fa-home" aria-hidden="true"></i>
   <span>Заведения</span>
   </a>
   </li>
   <li>
   <a  class="five" routerLink="/admin/staff">
   <i class="fa fa-fw fa-lg fa fa fa-user-circle" aria-hidden="true"></i>
   <span>Персонал</span>
   </a>
   </li>
  <li>
   <a  class="six" routerLink="/admin/soh">
   <i class="fa fa-fw fa-lg fa fa-history" aria-hidden="true"></i>
   <span>История</span>
   </a>
   </li>
   <li>
   <a  class="six" routerLink="/admin/actions/enter">
   <i class="fa fa-fw fa-lg fa fa fa-user-circle" aria-hidden="true"></i>
   <span>Ввести код</span>
   </a>
   </li>
   </ul>
   </nav>
<div class="container ">
<div class="cont  ">
<div class="row ">
  <router-outlet></router-outlet>
  </div>
  </div>
  </div>`, 
  styleUrls: ['../css/app.component.css','../css/menu.css'],
})

export class AdminkaComponent {
	constructor(private accountModel:AccountModel,
        private router: Router,private httpService: HttpService,){
		
	 }
	 
	visibility: boolean=true;
	
	setVis(vis){
	this.visibility = vis;
	console.log(this.visibility );
    }
    
    logout(){
        this.httpService.getForSimpleData('/logout',new HttpParams()).subscribe(data=>{
        this.router.navigate(['/admin/login']);
        });

      }
}

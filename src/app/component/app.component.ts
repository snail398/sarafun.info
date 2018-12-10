import { Component, OnInit  } from '@angular/core';
import {Router} from '@angular/router';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
<div class="fix">
  <div class="navbar navbar-inverse navbar-static-top ot">
        <div class="container">
            <div class="navbar-header "  >
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#responsive-menu">
                    <span class="sr-only">Открыть навигацию</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span> 
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Сайт</a>
            </div>
            <div class="collapse navbar-collapse" id="responsive-menu" >
                <ul class="nav navbar-nav">
                    <li><a routerLink="" >Лендинг</a></li>
                    <li><a routerLink="/admin/login">Админ</a></li>
                    <li [ngClass]="{invisible: visibility}"><a (click) = "logout()" >Выйти</a></li>
                </ul>
				
            </div>
        </div>
    </div>
</div>

  <router-outlet></router-outlet>`,
  styleUrls: ['../css/app.component.css','../css/bootstrap.css','../css/font-awesome.css','../css/style.css', ], 
  providers: [HttpService]
})
export class AppComponent implements OnInit {
	visibility: boolean = false;
	
	 constructor(private httpService: HttpService,
			 private router: Router
			 ){}
			 
			  ngOnInit(){
				
			  }
			  logout(){
				this.httpService.getForSimpleData('/logout',new HttpParams()).subscribe(data=>{
				this.router.navigate(['/admin/login']);
				});
				
			  }
}

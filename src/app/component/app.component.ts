import { Component, OnInit  } from '@angular/core';
import {Router} from '@angular/router';
import { HttpService} from '../service/http.service';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>`,
  styleUrls: ['../css/app.component.css','../css/bootstrap.css','../css/style.css', ], 
  providers: [HttpService]
})
export class AppComponent implements OnInit {
	visibility: boolean = false;
	
	 constructor(private httpService: HttpService,
			 private router: Router
			 ){}
			 
			  ngOnInit(){
				
			  }
			  
}

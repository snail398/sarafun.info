import { Component, OnInit } from '@angular/core';
import { HttpService} from '../service/http.service';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import '../js/salvattore.min.js';
import '../js/bootstrap.js';

@Component({
  selector: 'app-content',
  templateUrl:'../html/menu.component.html',
  styleUrls: ['../css/app.component.css','../css/bootstrap.css','../css/font-awesome.css','../css/glav.css' ],
  providers: [HttpService]
})
export class MenuComponent {
	
 constructor(private httpService: HttpService,private router: Router){}

}
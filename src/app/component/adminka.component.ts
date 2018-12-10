import { Component } from '@angular/core';
import { AccountModel } from '../account.model';

@Component({
  selector: 'app-adminka',
  template: `
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
<div class="container">
<div class="cont">
<div class="row">
  <router-outlet></router-outlet>
  </div>
  </div>
  </div>`,
  styleUrls: ['../css/app.component.css','../css/menu.css'],
})

export class AdminkaComponent {
	 constructor(private accountModel:AccountModel){
		
	 }
	 
	visibility: boolean=true;
	
	setVis(vis){
	this.visibility = vis;
	console.log(this.visibility );
	}
}

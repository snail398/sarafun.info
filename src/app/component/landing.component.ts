import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { ModalComponent } from '../component/modal.component';
  
@Component({
    selector: 'landing-app',
   templateUrl:'../html/landing.component.html',
  styleUrls: ['../css/landing.component.css']
}) 
export class LandingComponent {
		constructor(private router: Router
			 ){}
			 
	@ViewChild(ModalComponent)
    private modalComp: ModalComponent;
			 
	show(){
		console.log('xer');
		this.modalComp.show();
	}
		goYandex(){
			console.log("пипка");
		}			
	}
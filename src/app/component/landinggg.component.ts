import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { ModalComponent } from './modal.component';
  
@Component({
    selector: 'landinggg-app',
   templateUrl:'../html/landinggg.component.html',
  styleUrls: ['../css/landinggg.component.css']
}) 
export class LandingggComponent {
		constructor(private router: Router
			 ){}
			 
	@ViewChild(ModalComponent)
    private modalComp: ModalComponent;
			 
	show(){
		console.log('xerr');
		this.modalComp.show();
	}
		goYandex(){
			console.log("пипкаа");
		}			
	}
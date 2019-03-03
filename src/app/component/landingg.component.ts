import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { ModalComponent } from '../component/modal.component';
  
@Component({
    selector: 'landingg-app',
   templateUrl:'../html/landingg.component.html',
  styleUrls: ['../css/landingg.component.css']
}) 
export class LandinggComponent {
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
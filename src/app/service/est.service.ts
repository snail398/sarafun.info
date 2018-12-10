import {Establishment} from '../entity/establishment';
  import { Injectable } from '@angular/core';
     
	 @Injectable()
export class EstService {
	
  public curEst: Establishment;
  
    constructor() {}

        public setEst(est) { 
            this.curEst = est      
			}

        public getEst()  {
            return this.curEst;
        }
}
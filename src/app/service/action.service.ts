import {Action} from '../entity/action';
  import { Injectable } from '@angular/core';
     
	 @Injectable()
export class ActionService {
	
  public curaction: Action;
  
    constructor() {}

        public setAction(action) { 
            this.curaction = action;
        }

        public getAction()  {
            return this.curaction;
        }
}
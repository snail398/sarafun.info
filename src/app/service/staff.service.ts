import {Staff} from '../entity/staff';
  import { Injectable } from '@angular/core';
     
	 @Injectable()
export class StaffService {
	
  public curStaff: Staff;
  public isBarmen:boolean = false;
    constructor() {}

        public setStaff(staff) { 
            this.curStaff = staff;      
			}

        public getStaff()  {
            return this.curStaff;
        }
		
		public setIsBarmen(isBarmen) { 
            this.isBarmen = isBarmen;      
			}

        public getIsBarmen()  {
            return this.isBarmen;
        }
}
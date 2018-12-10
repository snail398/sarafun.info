import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Action} from '../entity/action';
import {Account} from '../entity/account';
import {Stat} from '../entity/stat';
import {StaffOperationHistory} from '../entity/staffOperationHistory';
import {Staff} from '../entity/staff';
import {Establishment} from '../entity/establishment';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService{
	HOST:string ="http://sarafun.info:4200"; 
    //HOST:string ="http://192.168.1.67:8080";
    constructor(private http: HttpClient){ }
       
    getData(){
        return this.http.get('http://localhost:8080/actions/getall')
    }
	getActions(url:string,params:HttpParams) : Observable<Action[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let actionsList = data;
            return actionsList.map(function(action:any) {
                return {    id:action.id,
							title:action.title,
							description:action.description,
							organizationID:action.organizationID,
							creatorsID:action.creatorsID,
							typeOfAction:action.typeOfAction,
							reward:action.reward,
							supportReward:action.supportReward,
							peopleUsed:action.peopleUsed,
							target:action.target,
							timeStart:action.timeStart,
							timeEnd:action.timeEnd,
						}; 
              });
        }));
    }
	
	getStat(url:string,params:HttpParams) : Observable<Stat[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let statList = data;
            return statList.map(function(action:any) {
                return {   
							id:action.id,
							description:action.description,
							reward:action.reward,
							supportReward:action.supportReward,
							target:action.target,
							timeStart:action.timeStart,
							timeEnd:action.timeEnd,
							countRAct:action.countRAct,
							countComplitedRAct:action.countComplitedRAct,
							countMainBonus:action.countMainBonus,
							countMiniBonus:action.countMiniBonus
						}; 
              });
        }));
    }
	
		getStaff(url:string,params:HttpParams) : Observable<Staff[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let staffList = data;
            return staffList.map(function(staff:any) {
                return {   
							accountID:staff.accountID,
							staffName:staff.staffName,
							staffWorkingPlace:staff.staffWorkingPlace
							
						}; 
              });
        }));
    }
	
	getActionsPOST(url:string,params:HttpParams,account:Account) : Observable<Action[]> {
        return this.http.post(this.HOST+url,account,{params:params,withCredentials:true}).pipe(map(data=>{
            let actionsList = data;
            return actionsList.map(function(action:any) {
                return {    id:action.id,
							title:action.title,
							description:action.description,
							organizationID:action.organizationID,
							creatorsID:action.creatorsID,
							typeOfAction:action.typeOfAction,
							reward:action.reward,
							supportReward:action.supportReward,
							peopleUsed:action.peopleUsed,
							target:action.target,
							timeStart:new Date(action.timeStart).toISOString().slice(0,10),
							timeEnd:new Date(action.timeEnd).toISOString().slice(0,10),
							between:Math.floor((Date.UTC((new Date(action.timeEnd)).getFullYear(), (new Date(action.timeEnd)).getMonth(), (new Date(action.timeEnd)).getDate()) - Date.UTC((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()) ) /(1000 * 60 * 60 * 24));
							condition:action.condition;
							//between:new Date(action.timeEnd-action.timeStart).toISOString().slice(0,10)
							
						}; 
              });
        }));
    }
		
	getEstablishments(url:string,params:HttpParams) : Observable<Establishment[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let estList = data;
            return estList.map(function(est:any) {
                return {        id:est.id,
								companyID:est.companyID,
								factAdress:est.factAdress,
								estName:est.estName,
								estEmail:est.estEmail,
								estSite:est.estSite,
								estDescription:est.estDescription,
								estPhone:est.estPhone,
								estWorkTime:est.estWorkTime,
								pathToAvatar:est.pathToAvatar,
								avatarChangeDate:est.avatarChangeDate
						}; 
              });
        }));
    }
	
	getStaffOH(url:string,params:HttpParams) : Observable<StaffOperationHistory[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let sohList = data;
            return sohList.map(function(soh:any) {
                return {      
								staffAccount:soh.staffAccount,
								operationType:soh.operationType,
								operationDate:(new Date(soh.operationDate).toISOString().slice(0,10))+" "+new Date(soh.operationDate).toISOString().slice(11,19),
								clientAccount:soh.clientAccount,
								action:soh.action
						}; 
              });
        }));
    }
	
	login(login:string, pass:string,cookie:string){
		let params = new HttpParams().set("login", login).set("pass", pass);
        return this.http.get(this.HOST+'/login',{params:params,withCredentials:true});
    }
	
	createItem(url:string,params:HttpParams,object:Object){
		return this.http.post(this.HOST+url,object,{params:params,withCredentials:true});
	}
	
	getEstablishment(url:string,params:HttpParams){
        return this.http.get(this.HOST+url,{params:params,withCredentials:true});
	}
	
	getForSimpleData(url:string,params:HttpParams){
        return this.http.get(this.HOST+url,{params:params,withCredentials:true});
	}
	
	
}
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Action} from '../entity/action';
import {Account} from '../entity/account';
import {Stat} from '../entity/stat';
import {Coupon} from '../entity/coupon';
import {Company} from '../entity/company';
import {RunningAction} from '../entity/runningAction';
import {StaffOperationHistory} from '../entity/staffOperationHistory';
import {Staff} from '../entity/staff';
import {CustomMap} from '../entity/customMap';
import {Establishment} from '../entity/establishment';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService{
	HOST:string ="http://sarafun.info:4200"; 
    //HOST:string ="http://192.168.1.67:8080";
	//HOST:string = "http://195.128.127.171:4200";
    constructor(private http: HttpClient){ }
       
    getData(){
        return this.http.get('http://localhost:8080/actions/getall');
    }
	getActions(url:string,params:HttpParams) : Observable<RunningAction[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let actionsList:any = data;
            return actionsList.map(function(action:any) {
                return {    id:action.id,
						accountLoginID:action.accountLoginID,
						actionTitleID:action.actionTitleID,
						percentOfComplete:action.percentOfComplete,
						complited:action.complited,
						pathToQRCode:action.pathToQRCode,
						pathToSarafunkaForFriend:action.pathToSarafunkaForFriend,
						ractStatDate:action.ractStatDate
						}; 
              });
        }));
    }
	
	getCoupons(url:string,params:HttpParams) : Observable<Coupon[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let couponsList:any = data;
            return couponsList.map(function(coupon:any) {
                return {     id:coupon.id,
						accountID:coupon.accountID,
						companyID:coupon.companyID,
						actionID:coupon.actionID,
						reward:coupon.reward,
						pathToQRCode:coupon.pathToQRCode,
						pathToSarafunka:coupon.pathToSarafunka,
						ractStatDate:coupon.ractStatDate
						}; 
              });
        }));
    }
	
	getRunningActions(url:string,params:HttpParams) : Observable<RunningAction[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let actionsList:any = data;
            return actionsList.map(function(action:any) {
                return {     id:action.id,
						accountLoginID:action.accountLoginID,
						actionTitleID:action.actionTitleID,
						percentOfComplete:action.percentOfComplete,
						complited:action.complited,
						pathToQRCode:action.pathToQRCode,
						pathToSarafunkaForFriend:action.pathToSarafunkaForFriend,
						ractStatDate:action.ractStatDate
						}; 
              });
        }));
    }
	
	getStat(url:string,params:HttpParams) : Observable<Stat[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let statList:any = data;
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
            let staffList:any = data;
            return staffList.map(function(staff:any) {
                return {   
							accountID:staff.accountID,
							staffName:staff.staffName,
							staffWorkingPlace:staff.staffWorkingPlace
							
						}; 
              });
        }));
    }
	
	getActionsPOST(url:string,params:HttpParams,account:Object) : Observable<Action[]> {
        return this.http.post(this.HOST+url,account,{params:params,withCredentials:true}).pipe(map(data=>{
            let actionsList:any = data;
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
							between:Math.floor((Date.UTC((new Date(action.timeEnd)).getFullYear(), (new Date(action.timeEnd)).getMonth(), (new Date(action.timeEnd)).getDate()) - Date.UTC((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()) ) /(1000 * 60 * 60 * 24)),
							condition:action.condition,
							pathToQRCode:action.pathToQRCode,
							pathToPDF:action.pathToPDF
							//between:new Date(action.timeEnd-action.timeStart).toISOString().slice(0,10)
							
						}; 
              });
        }));
    }
		
	getEstablishments(url:string,params:HttpParams) : Observable<Establishment[]> {
        return this.http.get(this.HOST+url,{params:params,withCredentials:true}).pipe(map(data=>{
            let estList:any = data;
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
            let sohList:any = data;
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
	
	postForMap(url:string,params:HttpParams,object:Object): Observable<CustomMap[]> {
		return this.http.post(this.HOST+url,object,{params:params,withCredentials:true}).pipe(map(data=>{
            let mapList1:any = data;
            return mapList1.map(function(soh:any) {
                return {      
								id:soh.id,
								text:soh.text
						}; 
              });
        }));
	}
	
	postForComp(url:string,params:HttpParams,object:Object): Observable<Company[]> {
		return this.http.post(this.HOST+url,object,{params:params,withCredentials:true}).pipe(map(data=>{
            let mapList1:any = data;
            return mapList1.map(function(soh:any) {
                return {   
								id:soh.id,
								title:soh.title,
								adress:soh.adress,
								companyType:soh.companyType,
								category:soh.category,
								description:soh.description,
								phone:soh.phone,
								site:soh.site,
								pathToAvatar:soh.pathToAvatar,
								creatingDate:soh.creatingDate,
								avatarChangeDate:soh.avatarChangeDate,
								inn:soh.inn,
								kpp:soh.kpp,
								ogrn:soh.ogrn
						}; 
              });
        }));
	}
	
	
	
	postForEst(url:string,params:HttpParams,object:Object): Observable<Establishment[]> {
		return this.http.post(this.HOST+url,object,{params:params,withCredentials:true}).pipe(map(data=>{
            let mapList1:any = data;
            return mapList1.map(function(soh:any) {
                return {      
								id:soh.id,
								companyID:soh.companyID,
								factAdress:soh.factAdress,
								estName:soh.estName,
								estEmail:soh.estEmail,
								estSite:soh.estSite,
								estDescription:soh.estDescription,
								estPhone:soh.estPhone,
								estWorkTime:soh.estWorkTime,
								pathToAvatar:soh.pathToAvatar,
								avatarChangeDate:soh.avatarChangeDate
						}; 
              });
        }));
	}
	
	getEstablishment(url:string,params:HttpParams){
        return this.http.get(this.HOST+url,{params:params,withCredentials:true});
	}
	
	getForSimpleData(url:string,params:HttpParams){
        return this.http.get(this.HOST+url,{params:params,withCredentials:true});
	}
	
	
}
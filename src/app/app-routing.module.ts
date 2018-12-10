import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './component/app.component';
import { LandingComponent } from './component/landing.component';
import { ActionsComponent } from './component/actions.component';
import { AdminkaComponent } from './component/adminka.component';
import { CreateActionComponent } from './component/create.action.component';
import { EditActionComponent } from './component/edit.action.component';
import { CreateEstComponent } from './component/create.est.component';
import { EditEstComponent } from './component/edit.est.component';
import { CreateStaffComponent } from './component/create.staff.component';
import { EditStaffComponent } from './component/edit.staff.component';
import { MenuComponent } from './component/menu.component';
import { LoginComponent } from './component/login.component';
import { StatComponent } from './component/stat.component';
import { BrandComponent } from './component/brand.component';
import { TestComponent } from './component/test.component';
import { EstComponent } from './component/est.component';
import { StaffComponent } from './component/staff.component';
import { RunActionComponent } from './component/run.action.component';
import { EnterCodeComponent } from './component/enter.code.component';
import { SOHComponent } from './component/soh.component';


const adminRoutes: Routes = [
    { path: 'actions', component: ActionsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'actions/create', component: CreateActionComponent},
    { path: 'actions/edit', component: EditActionComponent},
    { path: 'est/create', component: CreateEstComponent},
    { path: 'est/edit', component: EditEstComponent},
    { path: 'staff/create', component: CreateStaffComponent},
    { path: 'staff/edit', component: EditStaffComponent},
    { path: 'stat', component: StatComponent},
    { path: 'brand', component: BrandComponent},
    { path: 'test', component: TestComponent},
    { path: 'est', component: EstComponent},
    { path: 'staff', component: StaffComponent},
    { path: 'actions/run', component: RunActionComponent},
    { path: 'actions/enter', component: EnterCodeComponent},
    { path: 'soh', component: SOHComponent}
];

const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'admin', component: AdminkaComponent, children: adminRoutes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

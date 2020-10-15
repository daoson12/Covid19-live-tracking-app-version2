import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './components/countries/countries.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';



const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'countries', component:CountriesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
exports: [RouterModule]
})
export class AppRoutingModule { }

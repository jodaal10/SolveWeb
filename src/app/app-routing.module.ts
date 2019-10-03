import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculateJourneyComponent} from './components/calculate-journey/calculate-journey.component';


const routes: Routes = [
  {path:'', component: CalculateJourneyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

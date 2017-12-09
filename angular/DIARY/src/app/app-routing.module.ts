import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { AddEntryComponent } from './add-entry/add-entry.component'
import { DayComponent } from './day/day.component'

const routes: Routes = [
	{ path: '', redirectTo: '/day', pathMatch: 'full' },
	{ path: 'day', component: DayComponent},
	{ path: 'day/:date', component: DayComponent},
	{ path: 'add-entry/:date', component: AddEntryComponent}
];

@NgModule({
  imports: [
	RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

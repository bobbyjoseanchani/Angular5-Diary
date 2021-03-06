import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { DayComponent } from './day/day.component';

const routes: Routes = [
	{ path: '', redirectTo: '/day', pathMatch: 'full' },
	{ path: 'day', component: DayComponent},
	{ path: 'day/:date', component: DayComponent}, //optional parameters should follow matrix system, so correct this later
	{ path: 'add-entry/:date', component: AddEntryComponent},
	{ path: 'add-entry/:date/:id', component: AddEntryComponent} // Reusing add-entry to update entry
];

@NgModule({
  imports: [
	RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

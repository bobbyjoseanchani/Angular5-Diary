import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule }    from '@angular/common/http';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { DayComponent } from './day/day.component';
import { EntryService } from './entry.service'

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AddEntryComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
	MatCardModule,
	MatButtonModule,
	MatDatepickerModule,
	MatNativeDateModule,
	FormsModule,
	MatFormFieldModule,
	MatInputModule,
	BrowserAnimationsModule,
	MatIconModule,
	MatToolbarModule,
	AppRoutingModule,
	ReactiveFormsModule,
	HttpClientModule
  ],
  providers: [EntryService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

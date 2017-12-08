import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
	
  diaryDate: Date;
  entries : any[];

  constructor(private entryService: EntryService, private datepipe: DatePipe) {
	  this.entries = [];
  }

  ngOnInit(): void {
	  this.diaryDate = new Date();
	  this.getEntries();
  }
  
  private getEntries(): void {
	let dateString = this.datepipe.transform(this.diaryDate, 'yyyy-MM-dd');
	console.log(dateString);
	this.entryService.getEntries( dateString ).subscribe( myEntries => {
		console.log(myEntries);
		this.entries = myEntries;
	});	
  }

}

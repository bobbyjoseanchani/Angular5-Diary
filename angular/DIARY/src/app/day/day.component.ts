import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';

import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IEntry } from '../entry.interface';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  diaryDate: Date;
  public entries: any[];

  constructor(
    private entryService: EntryService,
    private datepipe: DatePipe,
    private route: ActivatedRoute    
  ) {
    this.entries = [];
  }

  ngOnInit(): void {
    let myDate = this.route.snapshot.paramMap.get('date'); 
    if( myDate === null){
      this.diaryDate = new Date();
    } else {
      this.diaryDate = new Date( myDate );
    }
    this.getEntries();
  }

  getEntries(): void {
    let dateString = this.datepipe.transform(this.diaryDate, 'yyyy-MM-dd');
    this.entryService.getEntries(dateString).subscribe(myEntries => {
      console.log(myEntries.entries);
      this.entries = myEntries.entries;
    });
  }

  deleteEntries(myId: string): void{
    console.log('deleting entry '+myId);
    this.entryService.deleteEntries(myId).subscribe(
      success => {
        this.getEntries();
			},
			error => {
				console.log('Error Deleting entry');        
      }
    );
  }
  
}

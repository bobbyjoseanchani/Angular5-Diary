import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';

import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


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
    this.setDate();
    if( this.diaryDate === undefined ){
      console.log('diary date is undefined');
      this.diaryDate = new Date();
    }
  }

  getEntries(): void {
    let dateString = this.datepipe.transform(this.diaryDate, 'yyyy-MM-dd');
    this.entryService.getEntries(dateString).subscribe(myEntries => {
      this.entries = myEntries.entries;
    });
  }

  setDate(): void{
    let myDate = this.route.snapshot.paramMap.get('date'); 
    if( myDate === null){
      this.diaryDate = new Date();
    } else {
      this.diaryDate = new Date( myDate );
    }
    this.getEntries(); 
  }

}

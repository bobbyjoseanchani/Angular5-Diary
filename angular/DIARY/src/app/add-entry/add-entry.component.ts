import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EntryService } from '../entry.service';
import { IEntry } from '../entry.interface';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {
	
	myDate;
	myId;
	entryForm = new FormGroup ({
		title: new FormControl('', [Validators.required]),
		text: new FormControl(),
		date: new FormControl(),
		id: new FormControl()
	});
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private entryService: EntryService
	) { }

	ngOnInit(): void {
		this.myDate = this.route.snapshot.paramMap.get('date');
		this.myId = this.route.snapshot.paramMap.get('id');
		if(this.myId != null){
			this.entryService.getEntries({'id': this.myId}).subscribe(
				entry => {
					let my_entry = entry.entries[0];
 					this.entryForm.setValue({
						id: my_entry.id,
						text: my_entry.text,
						title: my_entry.title,
						date: my_entry.day
					});
				},
				error => {
					console.log('Error fetching entry values');
				}
			);
		} else {
			this.entryForm.patchValue({date: this.myDate});			
		}
	}
	
	goBack(): void {
		this.router.navigate(['day', this.myDate]);
	}
	
	saveEntry(): void{
		this.entryService.createEntries( this.entryForm.value ).subscribe(
			success => {
				this.goBack();
			},
			error => {}
		);
	}
}

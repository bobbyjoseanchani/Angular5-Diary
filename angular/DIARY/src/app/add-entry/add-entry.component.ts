import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EntryService } from '../entry.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {
	
	myDate;
	entryForm = new FormGroup ({
		title : new FormControl('', [Validators.required]),
		text : new FormControl(),
		date : new FormControl()
	});
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private entryService: EntryService
	) { }

	ngOnInit(): void {
		this.myDate = this.route.snapshot.paramMap.get('date');
		this.entryForm.patchValue({date: this.myDate});
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

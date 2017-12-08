import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {
	
	myDate;
	entryForm = new FormGroup ({
		title : new FormControl('', [Validators.required]),
		text : new FormControl()
	});
	
	constructor(
		private route: ActivatedRoute,
		private location: Location
	) { }

	ngOnInit(): void {
		this.getDate();
	}
	
	getDate(): void {
		this.myDate = new Date(this.route.snapshot.paramMap.get('date'));
 	}
	
	goBack(): void {
		this.location.back();
	}
	
	saveEntry(): void{
		console.log(this.entryForm.value);
		//this.goBack();
	}
}

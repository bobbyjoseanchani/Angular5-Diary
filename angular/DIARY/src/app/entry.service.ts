import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { IEntry } from './entry.interface';

@Injectable()
export class EntryService {

	private entryURL = 'http://127.0.0.1:5000/entry';	
	
	constructor(private http: HttpClient) { }
  
	getEntries( myDate: string ): Observable<any>{
		let myParams = new HttpParams().set('date', myDate);
		return this.http.get<IEntry[]>(this.entryURL, {params: myParams})
		.pipe(
			catchError(this.handleError('getEntries', []))
		);
	}	
	
	createEntries( myEntry: IEntry ): Observable<any> {
		return this.http.post(this.entryURL, myEntry)
		.pipe(
			catchError(this.handleError('create Entries', [])
		));
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
		  console.error(error); // log to console instead
		  console.log(`${operation} failed: ${error.message}`);
		  return of(result as T);
		};
	}

	deleteEntries(myId: string): Observable<any> {
		return this.http.delete(this.entryURL, {params: new HttpParams().set('id', myId)})
		.pipe(
			catchError(this.handleError('deleteEntries', [])
		));
	}	
	/*
	updateEntries( myEntry: IEntry ): Observable<any> {
		return this.http.patch(this.entryURL, myEntry)
		.pipe(
			catchError(this.handleError('updateEntries', [])
		));
	}	

	*/	
	
}

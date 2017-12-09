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
		return this.http.get(this.entryURL, {params: myParams})
		.pipe(
			catchError(this.handleError('getEntries', [])
		));
	}	
	
	createEntries( myEntry: Object ): Observable<any> {
		return this.http.post(this.entryURL, myEntry)
		.pipe(
			catchError(this.handleError('getEntries', [])
		));
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
		  console.error(error); // log to console instead
		  console.log(`${operation} failed: ${error.message}`);
		  return of(result as T);
		};
	}
	
}

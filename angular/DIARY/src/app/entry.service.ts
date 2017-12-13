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
  
	/** Return a list of entries. Accepts date and/or id */
	getEntries({date, id}: IEntry): Observable<any>{
		let myParams = new HttpParams();
		if(date != undefined){
			myParams = myParams.append('date', date);
		}
		if(id != undefined){
			myParams = myParams.append('id', id.toString());
		}
		return this.http.get<IEntry[]>(this.entryURL, {params: myParams})
		.pipe(
			catchError(this.handleError('getEntries', []))
		);
	}	
	/** If id passed as a paramter, update an existing entry else create new entry  */
	createEntries( myEntry: IEntry ): Observable<any> {
		if(myEntry.id != null){ // if id is given, call patch
			return this.http.patch(this.entryURL, myEntry) // if id is given, call post
			.pipe(
				catchError(this.handleError('update Entries', [])
			));	
		} else {
			return this.http.post(this.entryURL, myEntry) // if id is given, call post
			.pipe(
				catchError(this.handleError('create Entries', [])
			));	
		}
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
		  console.error(error); // log to console instead
		  console.log(`${operation} failed: ${error.message}`);
		  return of(result as T);
		};
	}

	/** Delete entry with the given id */
	deleteEntries(myId: string): Observable<any> {
		return this.http.delete(this.entryURL, {params: new HttpParams().set('id', myId)})
		.pipe(
			catchError(this.handleError('deleteEntries', [])
		));
	}		
}

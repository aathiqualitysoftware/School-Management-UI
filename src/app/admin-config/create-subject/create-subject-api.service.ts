import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreateSubjectApiService {
  constructor(private http: HttpClient) { }

  savesubject(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/subjects', data);
  }

  updatesubject(data: any): Observable<any> {
    return this.http.put('http://localhost:8082/lrs/api/subjects/' + data.id, data);
  }
}

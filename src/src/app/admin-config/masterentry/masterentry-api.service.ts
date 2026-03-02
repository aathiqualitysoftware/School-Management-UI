import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterEntryApiService {

  constructor(private http: HttpClient) { }
  savemast(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/masters', data);
  }

  updatemast(data: any): Observable<any> {
    return this.http.put('http://localhost:8082/lrs/api/masters/' + data.masterId, data);
  }
}

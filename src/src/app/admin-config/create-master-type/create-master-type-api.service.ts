import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateMasterTypeApiService {

  constructor(private http: HttpClient) { }

  savemast(data: any): Observable<any> {
    return this.http.post('http://localhost:8082/lrs/api/master-types', data);
  }
  updatemast(data: any): Observable<any> {
    return this.http.put('http://localhost:8082/lrs/api/master-types/' + data.masterTypeId, data);
  }
}

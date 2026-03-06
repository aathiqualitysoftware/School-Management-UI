import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterViewApiService {

  constructor(private http: HttpClient) { }

  getmastertypedata(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/master-types');
  }
  getmasterdata(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/masters');
  }
  deletemasterById(id: any): Observable<any> {
    return this.http.delete('http://localhost:8082/lrs/api/masters/' + id);
  }
}

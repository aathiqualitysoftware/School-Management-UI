import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainDashboardApiService {

  constructor(private http: HttpClient) { }
 
  getStudenDashBoard(id:any): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/student/' + id);
  }
}

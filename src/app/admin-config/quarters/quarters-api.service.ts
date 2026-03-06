import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuartersApiService {

  constructor(private http: HttpClient) { }

  getqrtdata(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/quarters');
  }

  deleteqrtById(id: any): Observable<any> {
    return this.http.delete('http://localhost:8082/lrs/api/quarters/' + id);
  }
  getyeardata(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/academic-years');
  }
}

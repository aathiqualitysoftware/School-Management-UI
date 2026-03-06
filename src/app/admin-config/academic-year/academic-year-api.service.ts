import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearApiService {

  constructor(private http: HttpClient) { }
  getyeardata(): Observable<any> {
    return this.http.get('http://localhost:8082/lrs/api/academic-years');
  }

  deleteyearById(id: any): Observable<any> {
    return this.http.delete('http://localhost:8082/lrs/api/academic-years/' + id);
  }
}

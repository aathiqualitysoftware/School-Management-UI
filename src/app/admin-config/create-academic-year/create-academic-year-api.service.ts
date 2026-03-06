import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CreateAcademicYearApiService {
    constructor(private http: HttpClient) { }
    saveyear(data: any): Observable<any> {
        return this.http.post('http://localhost:8082/lrs/api/academic-years', data);
    }
    updateyear(data: any): Observable<any> {
        return this.http.put('http://localhost:8082/lrs/api/academic-years/' + data.id, data);
    }
}

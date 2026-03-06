import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CreateDesignationApiService {
    constructor(private http: HttpClient) { }
    savedesg(data: any): Observable<any> {
        return this.http.post('http://localhost:8082/lrs/api/designations', data);
    }
    getdeptdata(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/departments');
    }
    updatedesg(data: any): Observable<any> {
        return this.http.put('http://localhost:8082/lrs/api/designations/' + data.id, data);
    }
    getAllMasterData() {
        return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
    }
}

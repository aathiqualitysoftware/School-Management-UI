import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CreateFeeCollectionApiService {

    constructor(private http: HttpClient) { }

    getSectionData(classId: any): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/sections/class/' + classId);
    }
    save(data: any): Observable<any> {
        return this.http.post('http://localhost:8082/lrs/api/fee-collection', data);
    }
    update(data: any): Observable<any> {
        return this.http.put('http://localhost:8082/lrs/api/fee-collection/' + data.id, data);
    }
    getAllMasterData() {
        return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
    }
    getStudentData(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/student/getAll');
    }
    getyears(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/academic-years');
    }
}

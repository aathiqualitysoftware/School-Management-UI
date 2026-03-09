import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CreateStudentFeeEntryApiService {

    constructor(private http: HttpClient) { }
    getAllMasterData(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
    }
    getyears(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/academic-years');
    }
    getStudentData(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/student/getAll');
    }
    getSectionData(classId: any): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/sections/class/' + classId);
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MarkEntryApiService {

    constructor(private http: HttpClient) { }

    getAllMasterData() {
        return this.http.get('http://localhost:8082/lrs/api/student/getAllMasterData');
    }
    getSectionData(classId: any): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/sections/class/' + classId);
    }
    getsubjects(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/subjects');
    }
    getclasssection(classId: any, sectionId: any): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/class-subjects/class/' + classId + '/section/' + sectionId);
    }
    getexams(): Observable<any> {
        return this.http.get('http://localhost:8082/lrs/api/exams');
    }
    getStudentsByClassSection(classid: number, sectionid: number) {
        return this.http.get<any>(
            `http://localhost:8082/lrs/api/studs/class-section?classId=${classid}&sectionId=${sectionid}`
        );
    }
    save(data: any): Observable<any> {
        return this.http.post('http://localhost:8082/lrs/api/marks', data);
    }

}

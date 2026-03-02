import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentTimeTableApiService {

   constructor(private http: HttpClient) { }
 getTimeTableByClassIdAndSectionId(classId: any,sectionId: any): Observable<any> {
    return this.http.get("http://localhost:8082/lrs/api/timetable?classId=" + classId + "&sectionId=" + sectionId, {});
  }
}

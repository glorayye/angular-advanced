import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs'; 
import {catchError, delay} from 'rxjs/operators';
import { Project } from './project.model'; 
import { PROJECTS } from './mock-projects';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
private projectsUrl = environment.backendUrl + '/projects';
//private projectsErrorUrl = environment.backendUrl + '/projects/wrong';
  constructor(private http: HttpClient) { }
  
  list() : Observable<Project[]> {
    // return of(PROJECTS);
    return this.http.get<Project[]>(this.projectsUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError('An error occurred loading the projects data');
      })
    );
  }

  put(project: Project): Observable<Project> { 
    const url = this.projectsUrl + '/' + project.id;
    return this.http.put<Project>(url, project, httpOptions).pipe(
    delay(2000),
    catchError((error: HttpErrorResponse)  => {
    console.log(error);
    return throwError('An error occurred updating the projects.');
    })
    );
   }
   find(id: number): Observable<Project> {
    const url = this.projectsUrl + '/' + id;
    return this.http.get<Project>(url).pipe(
    catchError((error: HttpErrorResponse)  => {
    console.error(error);
    return throwError('An error occurred loading the project');
    })
    );
   }
 

}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
import { Project } from './project.model'; 
import { PROJECTS } from './mock-projects';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }
  
  list() : Observable<Project[]> {
    return of(PROJECTS);
  }
}

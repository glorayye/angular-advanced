import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Project } from '../shared/project.model';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
@Output() cancel = new EventEmitter<void>();
@Input() project: Project;
@Output() save = new EventEmitter<any>();
projectForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.projectForm = new FormGroup({ 
      name: new FormControl(this.project.name, [Validators.required, Validators.minLength(3)]), 
      description: new FormControl(this.project.description), 
      budget: new FormControl(this.project.budget), 
      isActive: new FormControl(this.project.isActive) 
      });    
  }

  onSubmit() { 
    if (this.projectForm.invalid) { 
    return; 
    } 
    const updatedProject = Object.assign( 
    {}, 
    this.project, 
    this.projectForm.value 
    ); 
    this.save.emit({ project: updatedProject }); 
    } 

  onCancelClick(event: Event){
    event.preventDefault();
    this.cancel.emit();
  }
}

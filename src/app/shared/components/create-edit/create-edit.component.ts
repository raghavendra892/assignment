import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomRegex } from '../../const/validation.regexp';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {
  empForm !: FormGroup;
  @Output() clientSelected = new EventEmitter<string>();

  selectClient(client: string) {
    this.clientSelected.emit(client);
  }
  //constructor(private _matDialogRef: MatDialogRef<CreateEditComponent>, private _formBuilder: FormBuilder) { }
  constructor(  private _formBuilder: FormBuilder) { }
  staffArray: string[] = ['Manager', 'Developer', 'Designer', 'HR']
  ngOnInit(): void {
    this.empForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(CustomRegex.email)]],
      phoneNumber: ['', [Validators.required,Validators.maxLength(10),Validators.pattern(/^\+?[0-9]+$/)]],
      address: ['', [Validators.required]],
      dateOfJoining: ['', [Validators.required]],
      // selectGender: ['', [Validators.required]],
      position: ['', [Validators.required]],
    })
  }
  onSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);
      this.empForm.reset()
      //this.close()
    }
  }
  
  // close() {
  //   this._matDialogRef.close()
  // }
  get form(){
    return this.empForm.controls
  }
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      projectName: new FormControl(
        null,
        [
          Validators.required,
          this.forbiddenName,
          CustomValidators.invalidProjectName,
        ],
        [this.forbiddenNameAsync, CustomValidators.invalidProjectNameAsync]
        // this.forbiddenNameAsync
      ),
      email: new FormControl(null, [Validators.required]),
      projectStatus: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.myForm, this.myForm.valid);
  }

  // forbiddenNameAsync(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'TestAsync1') {
  //         resolve({ invalidName: true });
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1500);
  //   });

  //   return promise;
  // }
  forbiddenNameAsync(
    control: AbstractControl<any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise<ValidationErrors | null>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'TestAsync1') {
          resolve({ invalidName: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
  forbiddenName(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === 'Test1') {
      return { invalidName: true };
    }
    return null;
  }
}

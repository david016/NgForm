import { AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

export class CustomValidators {
  static invalidProjectName(
    control: FormControl
  ): { [s: string]: boolean } | null {
    if (control.value === 'Test2') {
      return { invalidProjectName: true };
    }
    return null;
  }

  //   static async invalidProjectNameAsync(
  //     control: AbstractControl
  //   ): Promise<Observable<ValidationErrors> | null> {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         if (control.value === 'TestAync2') {
  //           resolve ({ invalidProjectName: true });
  //         } else {
  //           resolve(null);
  //         }
  //       }, 1000);
  //     });
  //   }
  static invalidProjectNameAsync(
    control: AbstractControl<any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise<ValidationErrors | null>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'TestAsync2') {
          resolve({ invalidName: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}

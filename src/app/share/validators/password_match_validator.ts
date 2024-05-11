import { AbstractControl } from "@angular/forms";

export const PasswordsMatchValidator =(passwordControlName:string, cpasswordControlName:string)=>{

  const validator=(form:AbstractControl)=>{

    const passwordControl = form.get(passwordControlName);
    const cpasswordControl=form.get(cpasswordControlName);

    if(!passwordControl || !cpasswordControl ) return;

    if (passwordControl.value!==cpasswordControl.value) {
      cpasswordControl.setErrors({notMatch:true});
    } else {
      const errors=cpasswordControl.errors;
      if(!errors)return;

      delete errors.notMatch;
      cpasswordControl.setErrors(errors);

    }
  }
  return validator;
}

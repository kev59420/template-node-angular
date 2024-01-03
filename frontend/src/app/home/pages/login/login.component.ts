import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MyErrorStateMatcher } from 'src/app/core/validators/errorStateMatcher';
import { CustomMessageSnackBarComponent } from 'src/app/shared/components/custom-message-snack-bar/custom-message-snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbar: MatSnackBar
  ){}
  
  matcher = new MyErrorStateMatcher();
  emailForm! : FormControl
  passwordForm!: FormControl
  authForm!: FormGroup

  formSubmitted = false

  ngOnInit(): void {
    this.emailForm = new FormControl("",[Validators.email,Validators.required])
    this.passwordForm = new FormControl("",[Validators.required])
    this.authForm = this.fb.group({
      email: this.emailForm,
      password: this.passwordForm
    })
  }

  submitForm(){
    this.formSubmitted = true
    if(!this.authForm.valid)
      return
    this.authService.setAuthentication(this.authForm.value).subscribe({
      next: (authState)=>{
        this.snackbar.openFromComponent(CustomMessageSnackBarComponent,{
          data: { type: 'success', content: 'Authentification réussi'},
          duration: 3000
        })
        this.router.navigate(["/"])
      },
      error: (err) => {
        this.snackbar.openFromComponent(CustomMessageSnackBarComponent,{
          data: { type: 'error', content: 'Couple email/password incorrect'}
        })
      }
    })
  }
}

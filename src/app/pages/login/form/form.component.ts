import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output('onLogin') onLogin = new EventEmitter();

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit() {
    this.authService.login(this.form.getRawValue()).subscribe(
      res => this.onLogin.emit(res)
    );
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(googleUser => {
        this.authService.googleLogin({
          token: googleUser.idToken
        }).subscribe((res: any) => {
          this.authService.accessToken = res.token;
          AuthService.authEmitter.emit(true);
          this.router.navigate(['/']);
        });
      })
  }
}

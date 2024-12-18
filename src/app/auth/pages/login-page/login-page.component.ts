import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {environment} from '../../../../environments/environment';

@Component({
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    standalone: false
})
export class LoginPageComponent implements OnInit {

  public selectedLanguage: string = environment.defaultLanguage;
  public loading: boolean = false; // Variable para controlar el estado del botón

  public languages = [
    { label: 'Español', value: this.selectedLanguage },
    { label: 'English', value: 'en' },
    { label: 'Português', value: 'po' }
  ];

  private fb          = inject( FormBuilder );
  private authService = inject(AuthService);
  private router          = inject(Router);

  public myForm: FormGroup = this.fb.group({
    login:    ['AnatomyAdmin2021',     [Validators.required, Validators.minLength(6)]],
    password: ['AnatomyAdmin2021?',    [Validators.required, Validators.minLength(6)]],
    lang:     [this.selectedLanguage,  [Validators.required]],
  });

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['es', 'en', 'po']); // Idiomas disponibles
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  ngOnInit(): void {
    // Detectar idioma del navegador o usar idioma almacenado
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserLanguage = navigator.language.split('-')[0];
      this.selectedLanguage = this.getSupportedLanguage(browserLanguage);
    } else {
      this.selectedLanguage = 'es'; // Idioma predeterminado
    }
  }

  getSupportedLanguage(lang: string): string {
    const supportedLanguages = ['es', 'en', 'po'];
    return supportedLanguages.includes(lang) ? lang : 'es';
  }

  // changeLanguage(event: Event): void {
  //   const selectedValue = (event.target as HTMLSelectElement).value; // Castea el target como HTMLSelectElement
  //   this.selectedLanguage = selectedValue;
  //   this.translate.use(selectedValue);
  // }

  changeLanguage(lang: string): void {
    // const selectedValue = (event.target as HTMLSelectElement).value; // Castea el target como HTMLSelectElement
    // console.log('hola', lang);
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }

  login() {
    this.loading = true; // Activar el spinner
    const {login, password, lang} = this.myForm.value;

    this.authService.login(login, password, lang)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: error => {
          this.loading = false;
          Swal.fire('Error', error)
        },
      });
  }

}

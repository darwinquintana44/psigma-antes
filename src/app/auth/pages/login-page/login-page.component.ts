import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
import {environments} from '../../../../environments/environments';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public selectedLanguage: string = environments.defaultLanguage;

  private fb          = inject( FormBuilder );
  private authService = inject(AuthService);
  private router          = inject(Router);

  public myForm: FormGroup = this.fb.group({
    login:    ['AnatomyAdmin2021', [Validators.required, Validators.minLength(6)]],
    password: ['AnatomyAdmin2021?', [Validators.required, Validators.minLength(6)]],
    lang: [this.selectedLanguage, [Validators.required]],
  });

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['es', 'en', 'po']); // Idiomas disponibles
    this.translate.setDefaultLang(this.selectedLanguage);
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
    const supportedLanguages = ['es', 'en', 'pt'];
    return supportedLanguages.includes(lang) ? lang : 'es';
  }

  changeLanguage(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value; // Castea el target como HTMLSelectElement
    this.selectedLanguage = selectedValue;
    this.translate.use(selectedValue);
  }

  login() {
    const {login, password, lang} = this.myForm.value;

    this.authService.login(login, password, lang)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: error => Swal.fire('Error', error),
      });
  }

}

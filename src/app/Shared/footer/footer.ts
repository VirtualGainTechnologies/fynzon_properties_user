import { Component } from '@angular/core';

interface SocialMedia {
  link: string;
  logo: string;
}
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  fynzonProprty: string = './assets/icons/fynzon_property_logo.png';
  socialMedia: SocialMedia[] = [
    {
      link: 'https://www.instagram.com/fynzonproperties/',
      logo: 'bi bi-instagram',
    },
    {
      link: 'https://www.facebook.com/fynzonproperties/',
      logo: 'bi bi-facebook',
    },
    {
      link: 'https://www.youtube.com/@fynzonproperties',
      logo: 'bi bi-youtube',
    },
    {
      link: 'https://www.linkedin.com/company/fynzonproperties/',
      logo: 'bi bi-linkedin',
    },
  ];
}

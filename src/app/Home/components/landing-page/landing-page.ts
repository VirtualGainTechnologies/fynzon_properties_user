import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ContactUsService } from '../../services/landing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { IConfig, NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { RequestMeetingPayload } from '../../types/requestMeeting';
import { MeetingResponse } from '../../models/meetingResponse';
import { Footer } from '../../../Shared/footer/footer';
import { Header } from '../../../Shared/header/header';
import { ContactUsPayload } from '../../types/contactUsPayload';
import { ContactUSResponse } from '../../models/contactUsResponse';
import { Carousel } from '../client-review-carousel/carousel';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    Footer,
    Header,
    ReactiveFormsModule,
    CommonModule,
    NgxCountriesDropdownModule,
    Carousel,
  ],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss'],
})
export class LandingPage implements OnInit {
  @ViewChild('openMeeting') requestMeetingBtn!: ElementRef;
  @ViewChild('closeBtn') closeButton!: ElementRef;

  loader = signal<boolean>(false);
  landingImg: string = './assets/images/landing_img.jpg';
  iman_logo: string = './assets/images/iman_logo.png';
  binghatti_logo: string = './assets/images/bingatti_logo.png';
  emaar_logo: string = './assets/images/emaar_logo.png';
  omniya_logo: string = './assets/images/omniya_logo.png';
  AshwinImg: string = './assets/images/Ashwin Arora_img.png';
  YashImg: string = './assets/images/Yash Kotriwal_img.png';
  JatinImg: string = './assets/images/Jatin Lokhndwala_img.png';
  investmentImg: string = './assets/images/Invest in Dubai 1.png';
  whyChooseUsImg: string = './assets/images/Why Choose Us 1.png';

  selectedCategory: string = 'Any';

  categories = ['Any', 'Off Plan', 'Buy', 'Rent', 'Commercial'];

  propertyTypeMap: Record<string, string[]> = {
    Any: ['Apartment', 'Villa', 'Pent House', 'Duplex'],
    'Off Plan': ['Apartment', 'Villa', 'Pent House', 'Duplex'],
    Buy: ['Apartment', 'Villa', 'Pent House', 'Duplex'],
    Rent: ['Apartment', 'Villa', 'Pent House', 'Duplex'],
    Commercial: ['Office', 'Retail', 'Shop', 'Showroom'],
  };

  selectedPropertyType = 'Property type';

  developerSlides = [
    [this.iman_logo, this.binghatti_logo, this.emaar_logo, this.omniya_logo],
    [this.emaar_logo, this.omniya_logo, this.iman_logo, this.binghatti_logo],
  ];

  carouselData = [
    this.iman_logo,
    this.binghatti_logo,
    this.emaar_logo,
    this.omniya_logo,
    this.emaar_logo,
    this.omniya_logo,
    this.iman_logo,
    this.binghatti_logo,
  ];

  customerReviewData = [
    {
      profile_img: this.AshwinImg,
      name: 'Ashwin Arora',
      designation: 'Finance Manager, DMCC Branch',
      review: `I just spent some time at this super cute spot that totally blew me away.The vibe was so cozy, and the staff were really friendly. Plus, it was in a great spot, super close to all the fun stuff. I definitely recommend checking it out if you're looking for a fun getaway!`,
    },

    {
      profile_img: this.YashImg,
      name: 'Yash Kotriwal',
      designation: 'Finance Manager, DMCC Branch',
      review: `I recently stayed at a charming property that exceeded my expectations. The cozy ambiance and welcoming staff made it special. Its perfect location offers easy access to local attractions. I highly recommend it for a delightful getaway!`,
    },
    {
      profile_img: this.JatinImg,
      name: 'Jatin Lokhandwala',
      designation: 'CFO, Lokhandwala Properties',
      review: `I recently stayed at a charming little property that exceeded my expectations. The ambiance was cozy, and the staff were incredibly welcoming. The location was perfect, allowing easy access to local attractions. I highly recommend this place for anyone looking for a delightful getaway!`,
    },
    {
      profile_img: this.AshwinImg,
      name: 'Ashwin Arora',
      designation: 'Finance Manager, DMCC Branch',
      review: `I just spent some time at this super cute spot that totally blew me away.The vibe was so cozy, and the staff were really friendly. Plus, it was in a great spot, super close to all the fun stuff. I definitely recommend checking it out if you're looking for a fun getaway!`,
    },
  ];

  todaysDate!: string;
  selectedPhoneCode: string = '+91';
  selectedCountryCode: string = 'IN';
  selectedPhoneConfig: IConfig = {
    hideCode: true,
    hideName: true,
    hideDialCode: false,
  };

  phoneListConfig: IConfig = {
    hideCode: true,
    hideName: true,
    hideDialCode: false,
  };

  CountryListConfig: IConfig = {
    hideCode: true,
    hideName: false,
    hideDialCode: true,
  };

  selectedCountryConfig: IConfig = {
    hideCode: true,
    hideName: false,
    hideDialCode: true,
  };

  meetingForm!: FormGroup;
  contactForm!: FormGroup;

  private contactService = inject(ContactUsService);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const date = new Date();
    this.todaysDate = date.toISOString().split('T')[0];
    this.createMeetingForm();
    this.createConatctForm();
  }

  createMeetingForm() {
    this.meetingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  createConatctForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  openMeetingForm() {
    this.requestMeetingBtn.nativeElement.click();
  }

  get requestMeetingFormControls() {
    return this.meetingForm.controls;
  }

  submitForm() {
    this.loader.set(true);
    if (this.meetingForm.invalid) {
      return;
    }

    const { name, email, phone, date, time } = this.meetingForm.value;

    let payload: RequestMeetingPayload = {
      name: name,
      email: email,
      phoneCode: this.selectedPhoneCode,
      phone: phone,
      meetingDate: date,
      meetingTime: time,
    };

    this.contactService.requestMeeting(payload).subscribe({
      next: (res: MeetingResponse) => {
        this.loader.set(false);
        this.snackBar.open(res.message, 'close', {
          duration: 5000,
          panelClass: ['success-snackbar', 'snackbar-with-progress'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        this.closeButton.nativeElement.click();
        window.scrollTo(0, 0);
        this.selectedCountryCode = '+91';
        this.meetingForm.reset();
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.loader.set(false);
        this.snackBar.open(err?.error?.message || 'Something went wrong', 'close', {
          duration: 5000,
          panelClass: ['error-snackbar', 'snackbar-with-progress'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      },
    });
  }

  submitContactForm() {
    this.loader.set(true);
    if (this.contactForm.invalid) {
      return;
    }

    const payload: ContactUsPayload = {
      ...this.contactForm.value,
      phoneCode: this.selectedPhoneCode,
    };
    this.contactService.contactUs(payload).subscribe({
      next: (res: ContactUSResponse) => {
        this.loader.set(false);
        this.snackBar.open(res.message, 'close', {
          duration: 5000,
          panelClass: ['success-snackbar', 'snackbar-with-progress'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        this.selectedCountryCode = '+91';
        this.contactForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.loader.set(false);
        this.snackBar.open(err?.error?.message || 'Something went wrong', 'close', {
          duration: 5000,
          panelClass: ['error-snackbar', 'snackbar-with-progress'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      },
    });
  }

  get contactFormControls() {
    return this.contactForm.controls;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.selectedPropertyType = 'Property type';
  }

  selectPropertyType(type: string) {
    this.selectedPropertyType = type;
  }

  get propertyTypes(): string[] {
    return this.propertyTypeMap[this.selectedCategory];
  }

  onCountryChange(country: any) {
    this.selectedPhoneCode = country.dialling_code;
    this.selectedCountryCode = country.code;
    this.updatePhoneValidator('meetingForm', this.selectedCountryCode.toLowerCase());
  }

  onSelectionCountry(country: any) {
    this.selectedPhoneCode = country.dialling_code;
    this.selectedCountryCode = country.code;
    this.updatePhoneValidator('contactForm', this.selectedCountryCode.toLowerCase());
  }

  updatePhoneValidator(formName: string, region: string) {
    const form = (this as any)[formName];
    if (!form) return;

    const control = form.get('phone');
    if (!control) return;

    const phoneUtil = PhoneNumberUtil.getInstance();

    const dynamicValidator = (ctrl: AbstractControl) => {
      const value = ctrl.value;
      if (!value) return null;

      try {
        const phoneNumber = phoneUtil.parse(value.toString(), region.toUpperCase());

        const isValid = phoneUtil.isValidNumberForRegion(phoneNumber, region.toUpperCase());

        return isValid ? null : { invalidPhone: true };
      } catch {
        return { invalidPhone: true };
      }
    };

    control.setValidators([Validators.required, dynamicValidator]);
    control.updateValueAndValidity();
  }
}

import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../environment/environment";
import { RequestMeetingPayload } from "../types/requestMeeting";
import { MeetingResponse } from "../models/meetingResponse";
import { CONTACTUS } from './constants/contactUs';
import { ContactUsPayload } from "../types/contactUsPayload";
import { ContactUSResponse } from "../models/contactUsResponse";


@Injectable({
  providedIn:'root'
})

export class ContactUsService {
  baseUrl: string = environment.apiUrl
  private http = inject(HttpClient)

  requestMeeting(payload:RequestMeetingPayload):Observable <MeetingResponse>{
      return this.http.post <MeetingResponse> (`${this.baseUrl}/${CONTACTUS.createUserApi}`, payload)
  }

  contactUs(payload: ContactUsPayload): Observable<ContactUSResponse>{
     return this.http.post<ContactUSResponse>(`${this.baseUrl}/${CONTACTUS.contactUsApi}`, payload)
  }
}

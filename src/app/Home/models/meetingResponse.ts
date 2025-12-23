export interface MeetingResponse {
  message: string;
  error: boolean;
  data:MeetingData
}

export interface MeetingData {
  name: string;
  email: string;
  phone: string;
  phoneCode: string;
  meetingDate: string;
  meetingTime: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

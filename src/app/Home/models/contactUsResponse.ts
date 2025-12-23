export interface ContactUSResponse {
  message: string;
  error: boolean;
  data:ContactUSData
}

interface ContactUSData {
  name: string;
  email: string;
  phone: string;
  phoneCode: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

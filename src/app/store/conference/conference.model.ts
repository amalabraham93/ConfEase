
export interface Conference {
  id?: string;
  name: string;
  startDate: Date;
  organizations: string;
  reviewers: { email: string; password: string }[];
  users: string[];
  banner:string; 

}


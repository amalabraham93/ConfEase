
interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    verificationToken: string;
    isEmailVerified?: boolean;
  
  }
  
  export default User;

interface Paper {
    id?: string;
    name: string;
    submissionTitle: string;
    abstract: string;
    author: string[];
    approved?: boolean;
    affliation: string;
    date: Date;
    conference: string;
    users: string[];
  }
  
  export default Paper;
import { ObjectId } from "mongodb";

class Student {
  id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
}

export default Student;

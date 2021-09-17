import { ObjectId } from "mongodb";

class User {
  _id: ObjectId;
  username: string;
  password: string;
  role: string;
}

export default User;

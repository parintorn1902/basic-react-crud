import { Collection } from "mongodb";
import AppDatabase from "../../database/database";
import User from "./user";

class UserRepo {
  private userRepo: Collection<User>;

  constructor() {
    this.userRepo = AppDatabase.getDB().collection("users");
  }

  public async addUser(user: User): Promise<void> {
    await this.userRepo.insertOne(user);
  }

  public async getUser(username: string): Promise<User> {
    return await this.userRepo.findOne({ username });
  }
}

export default UserRepo;

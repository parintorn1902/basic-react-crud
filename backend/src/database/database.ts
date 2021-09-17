import Student from "../components/students/student";
import StudentRepo from "../components/students/studentDAL";
import User from "../components/users/user";
import bcrypt, { genSaltSync } from "bcryptjs";
import UserRepo from "../components/users/userDAL";
import { Db, MongoClient, MongoClientOptions } from "mongodb";
import Config from "../config/config";

const DB_CONNECTION_STRING = `mongodb://${Config.DB.USERNAME}:${Config.DB.PASSWORD}@${Config.DB.URL}:${Config.DB.PORT}/${Config.DB.NAME}`;

class ConnectDatabase {
  private db: Db;

  async createConnection() {
    try {
      const options: MongoClientOptions = {
        maxPoolSize: parseInt(Config.DB.POOL_SIZE),
      };
      const client = new MongoClient(DB_CONNECTION_STRING, options);
      this.db = (await client.connect()).db();
      console.log(":: Connect database success, database name =", this.db.databaseName);
    } catch (error) {
      console.error(":: Error connect db :", error);
    }
  }

  getDB() {
    return this.db;
  }

  async initialData() {
    // create collections
    this.db.createCollection("users");
    this.db.createCollection("students");
    // create initial data
    const mariam = new Student();
    mariam.firstName = "Mariam";
    mariam.lastName = "Jamal";
    mariam.email = "mariam.jamal@gmail.com";
    mariam.dob = new Date();
    const alex = new Student();
    alex.firstName = "Alex";
    alex.lastName = "Dolby";
    alex.email = "alex.dolby@outlook.com";
    alex.dob = new Date();
    const studentRepo = new StudentRepo();
    await studentRepo.addStudent(mariam);
    await studentRepo.addStudent(alex);
    const admin = new User();
    admin.username = "admin";
    admin.password = bcrypt.hashSync("1234", genSaltSync(10));
    admin.role = "ADMIN";
    await new UserRepo().addUser(admin);
  }
}

const AppDatabase = new ConnectDatabase();

export default AppDatabase;

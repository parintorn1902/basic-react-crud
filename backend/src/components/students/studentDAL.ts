import { Collection, ObjectId } from "mongodb";
import AppDatabase from "../../database/database";
import Student from "./student";

class StudentRepo {
  private studentRepo: Collection<Student>;

  constructor() {
    this.studentRepo = AppDatabase.getDB().collection("students");
  }

  public async addStudent(newStudent: Student): Promise<void> {
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.email || !newStudent.dob) {
      throw "Please input required fields";
    }
    const oldStudent = await this.getStudentByEmail(newStudent.email);
    if (oldStudent) {
      throw "Email taken";
    }
    await this.studentRepo.insertOne(newStudent);
  }

  public async updateStudent(id: string, updateStudent: Student): Promise<void> {
    const student = await this.getStudentById(id);
    if (!student) {
      throw "Student not found";
    }
    if (updateStudent.firstName) student.firstName = updateStudent.firstName;
    if (updateStudent.lastName) student.lastName = updateStudent.lastName;
    if (updateStudent.email) student.email = updateStudent.email;
    if (updateStudent.dob) student.dob = updateStudent.dob;

    await this.studentRepo.updateOne({ _id: new ObjectId(id) }, { $set: student });
  }

  public async deleteStudentById(id: string): Promise<void> {
    const student = await this.getStudentById(id);
    if (!student) {
      throw "Student not found";
    }
    await this.studentRepo.deleteOne({ _id: new ObjectId(id) });
  }

  public async getAll(): Promise<Student[]> {
    return await this.studentRepo.find().toArray();
  }

  public async getStudentById(id: string): Promise<Student> {
    return await this.studentRepo.findOne({ _id: new ObjectId(id) });
  }

  public async getStudentByEmail(email: string): Promise<Student> {
    return await this.studentRepo.findOne({ email });
  }
}

export default StudentRepo;

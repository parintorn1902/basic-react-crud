import { Request, Response, Router } from "express";
import Service from "../../app/service";
import StudentRepo from "./studentDAL";

const studentService = new Service();
const studentController = studentService.getRouter();

studentService.get("/api/students", async (req: Request, res: Response) => {
  return await new StudentRepo().getAll();
});

studentService.get("/api/students/:id", async (req: Request, res: Response) => {
  return await new StudentRepo().getStudentById(req.params.id);
});

studentService.post("/api/students", async (req: Request, res: Response) => {
  return await new StudentRepo().addStudent(req.body);
});

studentService.put("/api/students/:id", async (req: Request, res: Response) => {
  return await new StudentRepo().updateStudent(req.params.id, req.body);
});

studentService.delete("/api/students/:id", async (req: Request, res: Response) => {
  return await new StudentRepo().deleteStudentById(req.params.id);
});

export default studentController;

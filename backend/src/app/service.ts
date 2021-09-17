import { Request, Response, Router } from "express";

class Service {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter(): Router {
    return this.router;
  }

  private async handler(req: Request, res: Response, executeFunction) {
    try {
      const data = await executeFunction(req, res);
      res.send({ success: true, data: data || null });
    } catch (error) {
      console.error("\u001b[1;31m:: Error is system :", error);
      res.send({ success: false, data: null, message: String(error) });
    }
  }

  public get(url, executeFunction: (req: Request, res: Response) => any) {
    this.router.get(url, async (req: Request, res: Response) => {
      this.handler(req, res, executeFunction);
    });
  }

  public post(url, executeFunction: (req: Request, res: Response) => any) {
    this.router.post(url, async (req: Request, res: Response) => {
      this.handler(req, res, executeFunction);
    });
  }

  public put(url, executeFunction: (req: Request, res: Response) => any) {
    this.router.put(url, async (req: Request, res: Response) => {
      this.handler(req, res, executeFunction);
    });
  }

  public delete(url, executeFunction: (req: Request, res: Response) => any) {
    this.router.delete(url, async (req: Request, res: Response) => {
      this.handler(req, res, executeFunction);
    });
  }
}

export default Service;

import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";

class UserController {
  async register(req: Request, res: Response) {

    const {
      name,
      email,
      phone,
      password
    } = req.body;

    try {

      const user =
        await CreateUserService.execute({
          name,
          email,
          phone,
          password
        });

      return res.status(201).json(user);

    } catch(error:any){

      return res.status(400).json({
        error:error.message
      })

    }
  }
}

export default new UserController();
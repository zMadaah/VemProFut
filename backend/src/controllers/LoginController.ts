import { Request, Response } from "express";
import LoginService from "../services/LoginService";

class LoginController{

 async handle(req:Request,res:Response){

   const {
      email,
      password
   } = req.body;

   const result =
      await LoginService.execute({
         email,
         password
      });

   return res.json(result);
 }
}

export default new LoginController();
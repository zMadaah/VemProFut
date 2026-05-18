import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma";

interface LoginRequest{
 email:string;
 password:string;
}

class LoginService{

 async execute({
   email,
   password
 }:LoginRequest){

   const user = await prisma.user.findUnique({
      where:{
        email
      }
   });

   if(!user){
      throw new Error("Usuário não encontrado");
   }

   const passwordMatch = await bcrypt.compare(
      password,
      user.password
   );

   if(!passwordMatch){
      throw new Error("Senha inválida");
   }

   const token = jwt.sign(
      {
        id:user.id
      },
      process.env.JWT_SECRET!,
      {
        subject:user.id,
        expiresIn:"7d"
      }
   );

   return{
      user:{
         id:user.id,
         name:user.name,
         email:user.email
      },
      token
   };
 }
}

export default new LoginService();
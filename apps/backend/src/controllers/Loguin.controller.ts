import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {Request , Response} from "express";
const prisma = new PrismaClient();
export async function ValidationUser (req: Request , res:Response){
    const {email , password}= req.params
try {
        // Buscar usuario por email
        const user = await prisma.User.findUnique({
            where: {
                email: email
            }
        });
    // Si no existe el usuario
        if (!user) {
            return res.status(404).json({message:"No se encontro el usuario"});
        }
        // Comparar la contraseña hasheada
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si la contraseña es válida, retornar el usuario
        if (isPasswordValid) {
            return res.status(200).json({message:"Usuario validado",status:true}) ;
        }
         // Si la contraseña no es válida
        return null;

    } catch (error) {
        console.error("Error en validación de usuario:", error);
        return res.status(500).json({message:"Error internos de servidor",Error: error}) ;
        }

    }
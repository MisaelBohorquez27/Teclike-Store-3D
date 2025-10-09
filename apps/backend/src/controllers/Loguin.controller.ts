import bcrypt from "bcrypt";
import {Request , Response} from "express";
import prisma from "../prisma"


export async function ValidationUser (req: Request , res:Response){
   
    const email = req.query.email;
    const password = typeof req.query.password === "string" ? req.query.password : undefined;

try {
        // Buscar usuario por email
        const user = await prisma.user.findUnique({
            where: {
                email: String(email)
            }
        });
    // Si no existe el usuario
        if (!user) {
            return res.status(404).json({message:"No se encontro el usuario"});
        }
        // Comparar la contraseña hasheada
        if (!password) {
            return res.status(400).json({message: "La contraseña es requerida"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si la contraseña es válida, retornar el usuario
        if (isPasswordValid) {
            return res.status(200).json({message:"Usuario validado",status:true}) ;
        }
         // Si la contraseña no es válida
        return res.status(401).json({message: "Contraseña incorrecta", status: false});

    } catch (error) {
        console.error("Error en validación de usuario:", error);
        return res.status(500).json({message:"Error internos de servidor",Error: error}) ;
        }

    }
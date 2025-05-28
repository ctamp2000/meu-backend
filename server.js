/*
Criar API de usuário
- criar usuário
- listar usuário
- editar usuário
- deletar usuário
*/

import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();
const app = express();
app.use(cors()); // ← Permite todas as origens
app.use(express.json());

// Criar usuário
app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });
  res.status(201).json(req.body);
});

// Listar todos os usuários
app.get("/usuarios", async (req, res) => {
  let users = [];
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }
  res.status(202).json(users);
});

// Editar um usuário
app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: { id: req.params.id },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });
  res.status(203).json(req.body);
});

// Deletar um usuário
app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id },
  });
  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

app.listen(3000);

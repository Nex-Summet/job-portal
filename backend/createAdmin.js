require("dotenv").config();

const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createAdmin = async () => {
  try {
    const name = "Admin";
    const email = "admin@jobportal.com";
    const password = "Admin@123";

    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const admin = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: "admin"
      }
    });

    console.log("Admin account created successfully!");
    console.log("Email:", admin.email);
    console.log("Password:", password);
    console.log("Role:", admin.role);

  } catch (error) {
    console.error("Failed to create admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
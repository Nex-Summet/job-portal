require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Job Portal Backend is running!"
  });
});

// Register User
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);

const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
  }
});

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// Login User
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role
      },
      JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.post(
  "/api/jobs",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      salary
    } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({
        message: "Title, company, location and description are required"
      });
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        description,
        salary
      }
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({
      message: "Jobs fetched successfully",
      jobs
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const job = await prisma.job.findUnique({
      where: {
        id: jobId
      }
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json({
      message: "Job fetched successfully",
      job
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.put(
  "/api/jobs/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const {
      title,
      company,
      location,
      description,
      salary
    } = req.body;

    const existingJob = await prisma.job.findUnique({
      where: {
        id: jobId
      }
    });

    if (!existingJob) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    const updatedJob = await prisma.job.update({
      where: {
        id: jobId
      },
      data: {
        title,
        company,
        location,
        description,
        salary
      }
    });

    res.json({
      message: "Job updated successfully",
      job: updatedJob
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.delete(
  "/api/jobs/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const existingJob = await prisma.job.findUnique({
      where: {
        id: jobId
      }
    });

    if (!existingJob) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    await prisma.job.delete({
      where: {
        id: jobId
      }
    });

    res.json({
      message: "Job deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// Candidate Apply for Job
app.post(
  "/api/jobs/:id/apply",
  authMiddleware,
  roleMiddleware("candidate"),
  async (req, res) => {
    try {
      const jobId = Number(req.params.id);
      const userId = req.user.userId;

      // Check if job exists
      const job = await prisma.job.findUnique({
        where: {
          id: jobId
        }
      });

      if (!job) {
        return res.status(404).json({
          message: "Job not found"
        });
      }

      // Check if already applied
      const existingApplication = await prisma.application.findUnique({
        where: {
          userId_jobId: {
            userId: userId,
            jobId: jobId
          }
        }
      });

      if (existingApplication) {
        return res.status(400).json({
          message: "You have already applied for this job"
        });
      }

      // Create application
      const application = await prisma.application.create({
        data: {
          userId: userId,
          jobId: jobId
        }
      });

      res.status(201).json({
        message: "Application submitted successfully",
        application
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error"
      });
    }
  }
);

// Get My Applications
app.get(
  "/api/applications/my",
  authMiddleware,
  roleMiddleware("candidate"),
  async (req, res) => {
    try {
      const userId = req.user.userId;

      const applications = await prisma.application.findMany({
        where: {
          userId: userId
        },
        include: {
          job: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      res.json({
        message: "Applications fetched successfully",
        applications
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error"
      });
    }
  }
);

// Admin - Get All Applications
app.get(
  "/api/applications",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const applications = await prisma.application.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          job: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      res.json({
        message: "All applications fetched successfully",
        applications
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error"
      });
    }
  }
);

// Admin - Update Application Status
app.patch(
  "/api/applications/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const applicationId = Number(req.params.id);
      const { status } = req.body;

      // Check status
      const allowedStatuses = [
        "Applied",
        "Shortlisted",
        "Rejected"
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid status"
        });
      }

      // Check application exists
      const existingApplication = await prisma.application.findUnique({
        where: {
          id: applicationId
        }
      });

      if (!existingApplication) {
        return res.status(404).json({
          message: "Application not found"
        });
      }

      // Update status
      const updatedApplication = await prisma.application.update({
        where: {
          id: applicationId
        },
        data: {
          status: status
        }
      });

      res.json({
        message: "Application status updated successfully",
        application: updatedApplication
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error"
      });
    }
  }
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
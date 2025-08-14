import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import rateLimit from "express-rate-limit";
import requestIp from "request-ip";

const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return requestIp.getClientIp(req) || "unknown";
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.max
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

app.use(limiter);

// required for passport
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

import healthRoutes from "./routes/health.routes.js";

import authRoutes from "./routes/auth.routes.js";

import apikeyRoutes from "./routes/apikey.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import semesterRoutes from "./routes/semester.routes.js";
import courseRoutes from "./routes/course.routes.js";
import courseSessionRoutes from "./routes/courseSession.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
import materialRoutes from "./routes/material.routes.js";
import resultRoutes from "./routes/result.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import { errorHandler } from "./middleware/error.middleware";
import { ApiError } from "./utils/api-error.js";
import { verifyApiKey } from "./middleware/auth.middleware.js";

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/apikey", apikeyRoutes);

//All routes below need apikey
app.use(verifyApiKey);

app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/semester", semesterRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/courseSession", courseSessionRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use("/api/v1/material", materialRoutes);
app.use("/api/v1/results", resultRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
//admin
app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);

export default app;

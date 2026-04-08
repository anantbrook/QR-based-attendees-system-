import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, insertParticipantSchema, insertAttendanceSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Session API
  app.get("/api/sessions", async (req, res) => {
    // Simplified: in a real app, we'd get instructorId from auth
    const instructorId = 1;
    const sessions = await storage.getSessionsByInstructor(instructorId);
    res.json(sessions);
  });

  app.post("/api/sessions", async (req, res) => {
    const parsed = insertSessionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }
    const session = await storage.createSession(parsed.data);
    res.json(session);
  });

  app.get("/api/sessions/:id", async (req, res) => {
    const session = await storage.getSession(parseInt(req.params.id));
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  });

  // Attendance API
  app.post("/api/sessions/:id/attendance", async (req, res) => {
    const sessionId = parseInt(req.params.id);
    const participantData = insertParticipantSchema.safeParse({ ...req.body, sessionId });

    if (!participantData.success) {
      return res.status(400).json({ error: participantData.error });
    }

    const participant = await storage.addParticipant(participantData.data);
    const record = await storage.markAttendance({
      sessionId,
      participantId: participant.id,
      method: "qr",
      isVerified: true
    });

    res.json({ participant, record });
  });

  const httpServer = createServer(app);
  return httpServer;
}

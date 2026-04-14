import { db } from "./db";
import { eq, and } from "drizzle-orm";
import {
  users, sessions, participants, attendance,
  type User, type InsertUser,
  type Session, type InsertSession,
  type Participant, type InsertParticipant,
  type Attendance, type InsertAttendance
} from "@shared/schema";

export interface IStorage {
  // User Management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Session Management
  getSession(id: number): Promise<Session | undefined>;
  getSessionsByInstructor(instructorId: number): Promise<Session[]>;
  createSession(session: InsertSession): Promise<Session>;
  updateSessionStatus(id: number, status: Session["status"]): Promise<Session>;

  // Participant & Attendance
  getParticipantsBySession(sessionId: number): Promise<Participant[]>;
  addParticipant(participant: InsertParticipant): Promise<Participant>;
  markAttendance(attendance: InsertAttendance): Promise<Attendance>;
  getAttendanceBySession(sessionId: number): Promise<Attendance[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getSession(id: number): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id));
    return session;
  }

  async getSessionsByInstructor(instructorId: number): Promise<Session[]> {
    return db.select().from(sessions).where(eq(sessions.instructorId, instructorId));
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const [session] = await db.insert(sessions).values(insertSession).returning();
    return session;
  }

  async updateSessionStatus(id: number, status: Session["status"]): Promise<Session> {
    const [session] = await db.update(sessions)
      .set({ status })
      .where(eq(sessions.id, id))
      .returning();
    return session;
  }

  async getParticipantsBySession(sessionId: number): Promise<Participant[]> {
    return db.select().from(participants).where(eq(participants.sessionId, sessionId));
  }

  async addParticipant(insertParticipant: InsertParticipant): Promise<Participant> {
    const [participant] = await db.insert(participants).values(insertParticipant).returning();
    return participant;
  }

  async markAttendance(insertAttendance: InsertAttendance): Promise<Attendance> {
    const [record] = await db.insert(attendance).values(insertAttendance).returning();
    return record;
  }

  async getAttendanceBySession(sessionId: number): Promise<Attendance[]> {
    return db.select().from(attendance).where(eq(attendance.sessionId, sessionId));
  }
}

export const storage = new DatabaseStorage();

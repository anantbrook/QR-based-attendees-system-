import { db } from "./db";
import { eq, sql } from "drizzle-orm";
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

// ⚡ Bolt: Prepared statements compile queries once to optimize subsequent calls
const preparedGetUser = db.select().from(users).where(eq(users.id, sql.placeholder('id'))).prepare('get_user');
const preparedGetUserByUsername = db.select().from(users).where(eq(users.username, sql.placeholder('username'))).prepare('get_user_by_username');
const preparedGetSession = db.select().from(sessions).where(eq(sessions.id, sql.placeholder('id'))).prepare('get_session');
const preparedGetSessionsByInstructor = db.select().from(sessions).where(eq(sessions.instructorId, sql.placeholder('instructorId'))).prepare('get_sessions_by_instructor');
const preparedGetParticipantsBySession = db.select().from(participants).where(eq(participants.sessionId, sql.placeholder('sessionId'))).prepare('get_participants_by_session');
const preparedGetAttendanceBySession = db.select().from(attendance).where(eq(attendance.sessionId, sql.placeholder('sessionId'))).prepare('get_attendance_by_session');

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await preparedGetUser.execute({ id });
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await preparedGetUserByUsername.execute({ username });
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getSession(id: number): Promise<Session | undefined> {
    const [session] = await preparedGetSession.execute({ id });
    return session;
  }

  async getSessionsByInstructor(instructorId: number): Promise<Session[]> {
    return await preparedGetSessionsByInstructor.execute({ instructorId });
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
    return await preparedGetParticipantsBySession.execute({ sessionId });
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
    return await preparedGetAttendanceBySession.execute({ sessionId });
  }
}

export const storage = new DatabaseStorage();

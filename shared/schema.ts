import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["instructor", "student"] }).notNull().default("student"),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  instructorId: integer("instructor_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: ["active", "inactive", "ended"] }).notNull().default("inactive"),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  qrCodeData: text("qr_code_data"),
});

export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => sessions.id).notNull(),
  userId: integer("user_id").references(() => users.id),
  email: text("email").notNull(),
  name: text("name").notNull(),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
});

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => sessions.id).notNull(),
  participantId: integer("participant_id").references(() => participants.id).notNull(),
  markedAt: timestamp("marked_at").defaultNow(),
  method: text("method", { enum: ["qr", "manual"] }).notNull().default("qr"),
  isVerified: boolean("is_verified").default(false),
});

export const insertUserSchema = createInsertSchema(users);
export const insertSessionSchema = createInsertSchema(sessions);
export const insertParticipantSchema = createInsertSchema(participants);
export const insertAttendanceSchema = createInsertSchema(attendance);

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Participant = typeof participants.$inferSelect;
export type InsertParticipant = z.infer<typeof insertParticipantSchema>;
export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;

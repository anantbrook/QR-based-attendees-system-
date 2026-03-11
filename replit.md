# QR Attendance Auto Mark System

## Overview

A modern QR code-based attendance tracking system designed for educational and meeting environments. The application provides real-time attendance marking through QR code scanning, with comprehensive session management, participant tracking, and attendance analytics. Built as a full-stack web application with mobile-first design principles, it enables instructors to create sessions, generate QR codes for attendance, and track participant engagement in real-time.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
**React SPA with TypeScript**: Single-page application built with React 18, TypeScript, and Vite for fast development and hot module replacement. Uses wouter for lightweight client-side routing and React Query for server state management with automatic caching and real-time updates.

**Component Design System**: Implements shadcn/ui component library with Radix UI primitives for accessibility. Custom components follow a mobile-first approach with Material Design principles. Uses Tailwind CSS for utility-first styling with custom design tokens for consistent theming across light/dark modes.

**State Management**: React Query handles all server state with 5-second polling for live attendance updates. Local component state managed through React hooks. Form state handled by react-hook-form with Zod validation schemas.

### Backend Architecture
**Express.js REST API**: Node.js server with Express framework providing RESTful endpoints for session management, participant tracking, and attendance marking. Implements request logging middleware and structured error handling.

**In-Memory Storage**: Currently uses Map-based storage implementation with full CRUD operations for sessions, participants, and attendance records. Designed with interface abstraction to easily migrate to database storage.

**Data Validation**: Server-side validation using Zod schemas for all API endpoints. Supports both participant ID and email-based attendance marking for flexible integration.

### QR Code System
**Dynamic QR Generation**: Uses qrcode library to generate session-specific QR codes containing JSON payloads with session ID, action type, and timestamp. QR codes update visual styling based on session status (active/inactive).

**Camera Integration**: Client-side QR scanning through qr-scanner library with real-time camera feed. Implements scan status feedback and automatic attendance marking upon successful code detection.

### Mobile-First Design
**Responsive Layout**: Tailwind-based responsive design with mobile breakpoint detection. Touch-optimized interface with large tap targets (minimum 44px) and bottom navigation for mobile users.

**Progressive Enhancement**: Core functionality works on mobile devices with camera access for QR scanning. Desktop provides additional dashboard features and data export capabilities.

### Real-Time Features
**Live Updates**: React Query polling every 5 seconds for session status, participant counts, and attendance records. Toast notifications for successful attendance marking and session state changes.

**Session Management**: Real-time session status tracking (active/inactive/ended) with automatic UI updates. Support for multiple concurrent sessions with individual QR codes and participant lists.

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives for dialogs, dropdowns, forms, and navigation
- **Tailwind CSS**: Utility-first CSS framework with custom design system configuration
- **Lucide React**: Icon library providing consistent iconography throughout the application
- **class-variance-authority**: Type-safe component variant management

### QR Code Technology
- **qrcode**: Server-side QR code generation for session attendance codes
- **qr-scanner**: Client-side camera-based QR code scanning with real-time detection

### Data Management
- **React Query (@tanstack/react-query)**: Server state management with caching, polling, and optimistic updates
- **react-hook-form**: Form state management with performance optimization
- **Zod**: Runtime type validation for API requests and form data
- **date-fns**: Date manipulation and formatting utilities

### Database Layer
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect support
- **@neondatabase/serverless**: Serverless PostgreSQL driver for database connections

### Development Tools
- **Vite**: Fast build tool with hot module replacement and TypeScript support
- **TypeScript**: Static type checking with strict configuration
- **ESBuild**: Fast bundler for production builds

### Session Storage
- **connect-pg-simple**: PostgreSQL session store for user session management (when database is connected)

The application is architected to scale from in-memory development to production database deployment with minimal code changes, supporting real-time attendance tracking for educational institutions and meeting organizers.
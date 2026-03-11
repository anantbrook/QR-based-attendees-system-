# QR Attendance Auto Mark - Design Guidelines

## Design Approach
**Utility-Focused Design System**: Using Material Design principles for this productivity/educational tool that prioritizes efficiency and mobile usability over visual marketing appeal.

## Core Design Elements

### Color Palette
- **Primary**: 219 69% 50% (Professional blue for trust and reliability)
- **Secondary**: 219 20% 95% / 219 20% 15% (Light/dark mode backgrounds)
- **Success**: 142 71% 45% (Green for successful attendance marking)
- **Warning**: 38 92% 50% (Amber for pending sessions)
- **Error**: 0 84% 60% (Red for failures/errors)

### Typography
- **Primary Font**: Inter (Google Fonts) - excellent readability on mobile
- **Headers**: 600-700 weight, ranging from text-2xl to text-4xl
- **Body**: 400-500 weight, text-sm to text-base
- **UI Elements**: 500-600 weight for buttons and labels

### Layout System
**Tailwind Spacing**: Consistent use of 2, 4, 6, and 8 units
- Tight spacing (p-2, m-2) for mobile-optimized components
- Medium spacing (p-4, m-4) for card layouts and sections  
- Generous spacing (p-6, p-8) for main content areas

### Component Library

**Navigation**
- Bottom navigation bar for mobile with QR scan, dashboard, and sessions tabs
- Clean header with session status and user info

**Core Components**
- Large, prominent QR code display cards with clear session info
- Floating action button for quick QR scanning (camera integration)
- Real-time attendance lists with participant avatars/initials
- Session cards showing status, time remaining, and participant counts
- Simple form inputs for creating new sessions

**Data Displays**
- Attendance grids with visual status indicators (present/absent)
- Time-based session progress bars
- Export functionality with clean data tables

**Mobile-First Considerations**
- Large touch targets (min 44px) for all interactive elements
- Bottom-sheet modals for secondary actions
- Pull-to-refresh for real-time updates
- Camera viewfinder overlay for QR scanning

### Key User Flows
1. **Teacher Flow**: Create session → Generate QR → Monitor real-time attendance → End session
2. **Student Flow**: Scan QR → Confirm identity → Receive attendance confirmation

### Technical Features Integration
- Camera API integration for QR scanning
- Real-time WebSocket connections for live attendance updates
- Session state management with visual feedback
- Offline capability indicators

**No hero images needed** - this is a utility app focused on quick, efficient attendance marking rather than marketing appeal.
# Narratives - Product Requirements Document

## Project Overview
**Brand**: Narratives  
**Type**: Storytelling Brand Website  
**Theme**: Neon Orange & Blue  
**Tech Stack**: React + FastAPI + MongoDB

## Original Problem Statement
Build a website for the storytelling brand 'Narratives' that creates visual stories to inspire and educate audiences. Services include music videos, AI stories, and AI automation solutions. Color theme based on neon orange/blue aesthetic inspired by provided reference images showing vibrant pink/magenta neon cyberpunk style with glowing 3D elements.

---

## User Personas

### Primary Audience
- **Content Creators**: Musicians, filmmakers seeking professional video production
- **Businesses**: Companies needing AI automation and visual storytelling
- **Creative Agencies**: Partners looking for collaborative projects

---

## Core Requirements (Static)

### Sections Required
1. ✅ Hero Section - Full viewport with compelling headline and video background
2. ✅ Services Section - 4 services showcase (Visual Stories, Music Videos, AI Stories, AI Automation)
3. ✅ Portfolio Section - Video-focused gallery with filtering
4. ✅ About Section - Brand story, mission, stats, and values
5. ✅ Contact Section - Contact form with validation
6. ✅ Header - Fixed navigation with smooth scroll
7. ✅ Footer - Brand info, quick links, social placeholders

### Functional Requirements
- Smooth scroll navigation
- Responsive design (mobile, tablet, desktop)
- Video modal player for portfolio items
- Portfolio filtering by category
- Contact form with toast notifications
- Hover animations and transitions

### Design Requirements
- **Primary Colors**: Neon orange (#FF6B00, #FF8C00) with fluorescent yellow (#FFFF00) and fluorescent green (#39FF14)
- Vibrant neon aesthetic with glowing effects
- Dark theme with purple-to-blue gradients (#2D1B4E to black)
- Neon glow effects on text and interactive elements using CSS text-shadow and box-shadow
- Rounded-full buttons (9999px radius) with hover glow effects
- Rounded-lg cards for project cards
- Modern typography with Inter font
- Lucide React icons (no emoji icons)
- Smooth animations and glowing transitions
- Box-shadow glow effects on hover states (orange, yellow, green)

---

## What's Been Implemented

### Phase 1 - Frontend MVP (January 4, 2025)
**Status**: ✅ COMPLETE - UPDATED WITH NEON CYBERPUNK THEME

#### Components Created
1. **Header.jsx** - Fixed navigation with neon pink logo and glowing effects
2. **Hero.jsx** - Full-screen hero with video background, neon pink headline with glow, animated purple/blue gradient orbs
3. **Services.jsx** - 4-column grid with alternating pink/blue neon icons and glow effects on hover
4. **Portfolio.jsx** - Video gallery with neon pink filter buttons and glowing borders on hover
5. **About.jsx** - Brand story with neon pink accents and gradient decorative elements
6. **Contact.jsx** - Contact form with neon pink CTA and glowing focus states
7. **Footer.jsx** - Footer with neon pink branding and hover glow effects

#### Data Layer
- **mockData.js** - Mock data for services, portfolio videos, team info

#### Styling Updates
- **App.css** - Custom neon glow effects, hover animations with box-shadow
- **index.css** - Tailwind setup with vibrant neon cyberpunk colors (pink, magenta, orange, blue, purple)
- Custom CSS utilities for text glow (glow-pink, glow-blue, glow-orange)
- Custom CSS utilities for box glow effects (box-glow-pink, box-glow-blue, box-glow-orange)
- Purple-to-blue gradient backgrounds
- Neon-themed color variables

#### Features Implemented
- ✅ Smooth scroll navigation
- ✅ Video background in hero
- ✅ Animated stats counter display
- ✅ Service cards with hover effects
- ✅ Video portfolio with filtering (All, Visual Stories, Music Videos, AI Stories)
- ✅ Video modal player with overlay
- ✅ Contact form with toast notifications
- ✅ Responsive design
- ✅ Footer with scroll-to-top button
- ✅ Mobile menu

---

## Prioritized Backlog

### P0 - Essential Backend (Not Yet Started)
- [ ] Backend API structure setup
- [ ] MongoDB models for Contact inquiries
- [ ] POST /api/contact endpoint - Save contact form submissions
- [ ] Email notification integration for new inquiries
- [ ] Form validation on backend

### P1 - Content Management
- [ ] Portfolio management system
- [ ] Admin panel for managing projects
- [ ] File upload for videos/thumbnails
- [ ] Service content editing

### P2 - Enhanced Features
- [ ] Newsletter signup functionality
- [ ] Blog/Case studies section
- [ ] Client testimonials section
- [ ] Team members showcase
- [ ] Social media integration (actual links)
- [ ] Analytics integration
- [ ] SEO optimization

---

## Next Tasks

### Immediate Next Steps
1. **User Confirmation** - Get approval on frontend design and functionality
2. **Backend Development** - Implement contact form backend API
3. **Testing** - Test contact form end-to-end with backend
4. **Enhancement** - Add more interactive elements based on user feedback

### Future Enhancements
- Add actual project videos and content
- Implement CMS for easy content updates
- Add testimonials carousel
- Integrate with email service (SendGrid/Mailgun)
- Add loading states and skeleton screens
- Implement analytics tracking

---

## Technical Notes

### Frontend Stack
- React 19
- React Router for navigation
- Lucide React for icons
- Shadcn UI components (Toaster for notifications)
- Tailwind CSS for styling
- Axios for API calls (ready for backend integration)

### Current State
- Frontend fully functional with mock data
- All sections responsive and interactive
- Contact form UI ready (needs backend integration)
- Video placeholders from public CDN (ready to be replaced)

---

## API Contracts (To Be Implemented)

### POST /api/contact
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for reaching out! We'll get back to you within 24 hours."
}
```

---

## Design System Summary

### Colors
- **Primary**: Neon Orange (#FF6B00, #FF8C00)
- **Fluorescent**: Yellow (#FFFF00), Green (#39FF14)
- **Accent**: Electric Blue (#00D9FF)
- **Background**: Black (#000000), Dark Purple (#2D1B4E), Dark Navy (#0A0E1A)
- **Text**: White (#FFFFFF), Gray (#999999)

### Typography
- **Font Family**: Inter
- **Display**: Bold 800, -2% letter spacing, neon glow effects
- **Buttons**: Uppercase, 0.0875em letter spacing

### Glow Effects
- **Text Glow**: text-shadow with 10px, 20px, 30px spread
- **Box Glow**: box-shadow with 15px, 30px, 45px spread
- **Colors**: Orange (#FF6B00), Yellow (#FFFF00), Green (#39FF14), Blue (#00D9FF)

### Border Radius
- **Buttons/Tags**: rounded-full (9999px)
- **Cards**: rounded-lg (0.5rem)

### Components
- Fixed header with backdrop blur and neon orange branding
- Full-screen hero with video background, orange glowing headline, yellow "AI innovation" text
- Service cards with alternating orange/green neon colors and hover glow
- Portfolio grid with orange filter buttons and fluorescent green category badges
- Contact form with glowing orange focus states and green phone icon
- Footer with neon orange accents and glowing hover effects

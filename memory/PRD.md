# Narratives - Product Requirements Document

## Project Overview
**Brand**: Narratives  
**Type**: Storytelling Brand Website  
**Theme**: Neon Orange & Blue  
**Tech Stack**: React + FastAPI + MongoDB

## Original Problem Statement
Build a website for the storytelling brand 'Narratives' that creates visual stories to inspire and educate audiences. Services include music videos, AI stories, and AI automation solutions. Color theme based on neon orange/blue aesthetic.

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
- Neon orange (#FF6B35) and neon blue (#00D9FF) color scheme
- Dark theme with black backgrounds
- Rounded-full buttons (9999px radius)
- Rounded-lg cards for project cards
- Modern typography with Inter font
- Lucide React icons (no emoji icons)
- Smooth animations and transitions

---

## What's Been Implemented

### Phase 1 - Frontend MVP (January 4, 2025)
**Status**: ✅ COMPLETE

#### Components Created
1. **Header.jsx** - Fixed navigation with smooth scroll, mobile menu
2. **Hero.jsx** - Full-screen hero with video background, animated stats, CTA buttons
3. **Services.jsx** - 4-column grid showcasing services with icons and descriptions
4. **Portfolio.jsx** - Video gallery with filtering and modal player
5. **About.jsx** - Brand story, mission, stats grid, values section
6. **Contact.jsx** - Contact form with validation and contact details
7. **Footer.jsx** - Footer with brand info, links, social placeholders

#### Data Layer
- **mockData.js** - Mock data for services, portfolio videos, team info

#### Styling
- **App.css** - Custom styles for navigation, buttons, animations
- **index.css** - Tailwind setup with Narratives brand colors
- Custom CSS variables for neon-orange, neon-blue, dark-navy

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
- **Primary**: Neon Orange (#FF6B35)
- **Secondary**: Neon Blue (#00D9FF)
- **Background**: Black (#000000)
- **Dark Navy**: #0A1628
- **Text**: White (#FFFFFF), Gray (#999999)

### Typography
- **Font Family**: Inter
- **Display**: Bold 800, -2% letter spacing
- **Buttons**: Uppercase, 0.0875em letter spacing

### Border Radius
- **Buttons/Tags**: rounded-full (9999px)
- **Cards**: rounded-lg (0.5rem)

### Components
- Fixed header with backdrop blur
- Full-screen hero with video background
- Service cards with hover scale effect
- Portfolio grid with category filtering
- Contact form with dark theme
- Footer with gradient accents

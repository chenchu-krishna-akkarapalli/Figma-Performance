# Figma Performance Dashboard

A React application built from a Figma design showing an HR/Performance management dashboard.

## Features

- Modern dashboard layout with multiple data visualization components
- Responsive UI with Tailwind CSS styling
- Real-time performance metrics and KPI tracking
- Employee performance table
- Department performance charts
- Sales performance analytics
- Quick actions panel
- Skill set visualization

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx    # Main dashboard component
│   └── Icons.tsx        # Icon components and image assets
├── App.tsx              # Root application component
├── App.css              # Application styles
├── index.css            # Global styles with Tailwind directives
└── main.tsx             # Application entry point
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Installation

```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Design Notes

The dashboard layout includes:

- **Top Navigation**: Main menu with Dashboard, My Performance, Team Management, Review Cycles, System Admin, and Settings
- **Welcome Section**: Personalized greeting with date/time
- **User Profile Card**: User information and avatar
- **Goals Card**: Q1 goals progress tracking with visual indicators
- **Department Performance**: Radar chart showing performance across departments
- **Quick Actions**: Buttons for Create Goal, Report Issue, and Check-in
- **Performers Table**: Comprehensive employee performance metrics
- **Sales Performance**: Line chart showing sales trends over months
- **Department KPI**: Bar chart comparing department achievements
- **Skill Set**: Visual representation of employee skills

## Assets

Image assets are served from a local development server at `http://localhost:3845/assets/`

## License

All rights reserved.

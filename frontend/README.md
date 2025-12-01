# StaffFlow - On-Demand Staffing Platform

A comprehensive React.js application for managing temporary staff scheduling across multiple vendors. The platform enables dynamic work schedule generation, staff assignment, check-in/check-out tracking, and automated notifications.

## 🎯 Features

### Core Functionality
- **Vendor Management**: Display all vendors with their staffing requirements
- **Dynamic Schedule Generation**: One-click AI-driven schedule generation with compliance checks
- **Staff Assignment**: Intelligent allocation based on skills, availability, and labor law compliance
- **Calendar View**: Visual schedule showing vendor names, assigned staff, and shift times
- **Check-In/Check-Out System**: GPS-enabled attendance tracking with working hour recording
- **Automated Notifications**: WhatsApp/SMS roster updates (integration-ready)
- **Real-time Dashboard**: KPIs and staffing analytics

### Key Capabilities
- Staff profile management with skills and availability tracking
- Labor law compliance (working hour limits)
- Shift rotation automation
- Payroll-ready working hours calculation
- Vendor-wise staff allocation summary
- Mobile-responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone or navigate to the project directory
cd staffing-platform

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                 # Global styles and animations
├── index.css              # Tailwind CSS imports
├── components/
│   ├── Dashboard.jsx      # Main dashboard with KPIs
│   ├── VendorList.jsx     # Vendor management and requirements
│   ├── ScheduleCalendar.jsx # Calendar view with assignments
│   ├── StaffAssignment.jsx # Assignment management and editing
│   └── CheckInOut.jsx     # Check-in/out tracking system
└── index.js               # React entry point
```

## 🎨 UI Components

### Dashboard
- KPI cards showing vendors, staff, assignments, and utilization
- Staffing requirements overview
- Recent assignments table
- Quick stats panel

### Vendors
- Expandable vendor cards with details
- Location and contact information
- Shift requirements breakdown
- Summary statistics

### Schedule Calendar
- Interactive monthly calendar
- Assignment visualization
- Detailed assignments table
- Generate schedule button

### Staff Assignments
- Filterable assignments table
- Edit and delete functionality
- Status tracking (scheduled, checked-in, checked-out)
- Hours worked calculation
- Modal editor for assignment updates

### Check-In/Check-Out
- Staff search and filtering
- Assignment cards with quick actions
- Check-in/out buttons
- Time tracking display
- Detailed assignment modal

## 🔧 Technology Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Axios (ready for API integration)
- **Build Tool**: Create React App

## 📊 Data Structure

### Vendor Object
```javascript
{
  id: number,
  name: string,
  location: string,
  contact: string,
  requirements: [
    {
      date: string (YYYY-MM-DD),
      startTime: string (HH:MM),
      endTime: string (HH:MM),
      staffNeeded: number,
      role: string
    }
  ]
}
```

### Staff Object
```javascript
{
  id: number,
  name: string,
  phone: string,
  skills: string[],
  availability: string[],
  maxHoursPerWeek: number,
  currentHours: number,
  status: string
}
```

### Assignment Object
```javascript
{
  id: number,
  vendorId: number,
  vendorName: string,
  staffId: number,
  staffName: string,
  staffPhone: string,
  date: string,
  startTime: string,
  endTime: string,
  role: string,
  status: string,
  checkInTime: string | null,
  checkOutTime: string | null,
  hoursWorked: number
}
```

## 🎯 Usage Guide

### Generate Schedule
1. Click the "Generate Schedule" button on the Dashboard or Schedule Calendar
2. The system automatically assigns staff based on:
   - Skill match with vendor requirements
   - Staff availability on the date
   - Labor law compliance (max hours per week)
   - Current workload

### Manage Assignments
1. Navigate to "Assignments" tab
2. Filter by vendor or status
3. Click edit icon to modify assignment status
4. Click delete icon to remove assignment

### Track Attendance
1. Go to "Check-In/Out" tab
2. Search for staff member or vendor
3. Click "Check In" when staff arrives
4. Click "Check Out" when staff leaves
5. System automatically calculates hours worked

### View Schedule
1. Navigate to "Schedule" tab
2. Use calendar navigation to browse months
3. Click on dates to see assignments
4. View detailed assignments table below

## 🔌 API Integration Ready

The application is structured to easily integrate with backend APIs:

- Replace mock data with API calls using Axios
- Implement real-time notifications via WebSockets
- Connect to payment/payroll systems
- Integrate GPS check-in verification
- Add WhatsApp/SMS notification service

## 🎨 Customization

### Colors & Theme
Edit Tailwind classes in components or update `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      // Add custom colors
    }
  }
}
```

### Add New Vendors/Staff
Edit the initial state in `App.jsx`:
```javascript
const [vendors, setVendors] = useState([...])
const [staff, setStaff] = useState([...])
```

## 📱 Responsive Design

The application is fully responsive:
- Mobile: Single column layout with hamburger menu
- Tablet: Two-column grid layouts
- Desktop: Multi-column grids with full feature access

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 📝 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Tailwind CSS not loading
- Ensure `tailwind.config.js` and `postcss.config.js` exist
- Restart the development server
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

For support, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using React.js and Tailwind CSS**

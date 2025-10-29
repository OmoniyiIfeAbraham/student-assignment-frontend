# Student Assignment System - Frontend

A modern, responsive React application for managing and viewing student coding assignments. Features separate views for administrators and students.

## 🎯 Purpose

This frontend provides an intuitive interface for coding instructors to create and manage assignments, while giving students (Harold and Hera) a clean, distraction-free view of their assignments. Built as an educational project for teaching full-stack development to beginners.

## ✨ Features

- **🏠 Home Screen** - Easy navigation between Admin and Student views
- **👨‍💼 Admin Dashboard** - Create, edit, and delete assignments with a rich text editor
- **👨‍🎓 Student Views** - Personalized assignment pages for each student
- **🎨 Modern UI** - Clean, responsive design with Tailwind CSS
- **🔐 Secure Admin Access** - Login required for administrative functions
- **📅 Due Date Tracking** - Visual indicators for assignment deadlines
- **🎯 Student-Specific Content** - Color-coded sections for each student

## 🛠️ Tech Stack

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Fetch API** - HTTP requests to backend

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

## 🚀 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd assignment-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Make sure Tailwind CSS is configured (should be set up automatically):

```bash
npm install -D tailwindcss
npx tailwindcss init
```

4. Start the development server:

```bash
npm start
```

The app will open at `http://localhost:3000`

## 🎮 Usage

### For Instructors (Admin):

1. Click **"Admin Login"** from the home screen
2. Enter credentials (default: `*****` / `********`)
3. Click **"Create New Assignment"**
4. Fill in the form:
   - Select student (Harold or Hera)
   - Enter assignment title
   - Write assignment content (supports multi-line text)
   - Optionally set a due date
5. Click **"Create Assignment"**
6. View, edit, or delete existing assignments from the dashboard

### For Students:

1. Click either **"Harold's Assignments"** or **"Hera's Assignments"**
2. View all assigned work
3. See assignment details, creation dates, and due dates
4. No login required - instant access to assignments

## 🎨 Color Scheme

- **Admin**: Indigo theme (`bg-indigo-600`)
- **Harold**: Green theme (`bg-green-600`)
- **Hera**: Purple theme (`bg-purple-600`)

## 📁 Project Structure

```
src/
├── App.js          # Main component with all views
├── index.js        # Entry point
├── index.css       # Tailwind imports
└── ...
```

## 🔧 Configuration

### API Endpoint

The frontend connects to the backend at `http://localhost:5000/api`. To change this, update the `API_URL` constant in `App.js`:

```javascript
const API_URL = "http://your-backend-url/api";
```

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- Desktop computers
- Tablets
- Mobile phones

## 🎓 Learning Concepts

This project teaches:

- **React Hooks**: `useState`, `useEffect`
- **Component State Management**
- **API Integration**: Fetch requests and error handling
- **Conditional Rendering**: Different views based on user type
- **Form Handling**: Controlled components
- **Styling**: Tailwind CSS utility classes
- **UX Design**: Intuitive navigation and feedback

## 📝 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (⚠️ irreversible)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy Options

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `build` folder
- **GitHub Pages**: Use `gh-pages` package
- **Render**: Connect your GitHub repository

Don't forget to update the `API_URL` to your production backend URL!

## 🔐 Security Notes

- Admin credentials are sent to backend for verification
- No sensitive data is stored in frontend
- CORS is handled by the backend
- For production, use HTTPS and environment variables

## 🤝 Contributing

This is an educational project. Contributions, suggestions, and forks are welcome!

## 🐛 Known Issues

- No file upload capability (future enhancement)
- Single admin account only

## 🔮 Future Enhancements

- [ ] Assignment submission feature
- [ ] File upload support
- [ ] Progress tracking
- [ ] Email notifications
- [ ] Search and filter
- [ ] Multiple admin accounts
- [ ] Student profiles

## 📄 License

MIT

## 👨‍💻 Author

Created for teaching full-stack development to beginner coding students.

## 🔗 Related

- [Backend Repository](link-to-backend-repo)

## 📞 Support

For issues or questions, please open an issue in the GitHub repository.

---

**Happy Coding!** 🎉

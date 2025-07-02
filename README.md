# online-polling-system

A modern, full-stack polling application built with React, TypeScript, and Node.js. Create, share, and view real-time results for polls with an intuitive interface and responsive design.

## 🚀 Features

- **Create Polls**: Easy-to-use interface for creating polls with multiple options
- **Real-time Results**: View live poll results with interactive charts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Statistics Dashboard**: Comprehensive analytics and voting statistics
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **RESTful API**: Well-structured backend API for poll management

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js/Recharts** - Interactive data visualization

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **RESTful API** - Clean API architecture

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd polling-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   NODE_ENV=development
   ```

4. **Start the development servers**
   
   **Frontend (Vite dev server):**
   ```bash
   npm run dev
   ```
   
   **Backend (Express server):**
   ```bash
   npm run server
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

## 🎯 Usage

### Creating a Poll
1. Navigate to the create poll section
2. Enter your poll question
3. Add multiple answer options
4. Click "Create Poll" to publish

### Voting
1. Browse available polls from the poll list
2. Select your preferred option
3. Submit your vote
4. View real-time results

### Viewing Results
1. Access poll statistics from the dashboard
2. View detailed charts and analytics
3. Export results (if implemented)

## 📁 Project Structure

```
polling-application/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── CreatePoll.tsx       # Poll creation form
│   │   ├── PollList.tsx         # List of all polls
│   │   ├── PollCard.tsx         # Individual poll display
│   │   ├── PollChart.tsx        # Chart visualization
│   │   └── PollStats.tsx        # Statistics dashboard
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── server/                       # Backend source code
│   ├── models/                  # Database models
│   │   └── Poll.js              # Poll data model
│   ├── routes/                  # API routes
│   │   └── polls.js             # Poll-related endpoints
│   └── index.js                 # Express server setup
├── public/                       # Static assets
├── package.json                 # Project dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔌 API Endpoints

### Polls
- `GET /api/polls` - Retrieve all polls
- `POST /api/polls` - Create a new poll
- `GET /api/polls/:id` - Get a specific poll
- `PUT /api/polls/:id` - Update a poll
- `DELETE /api/polls/:id` - Delete a poll
- `POST /api/polls/:id/vote` - Submit a vote

### Example API Usage

**Create a Poll:**
```javascript
POST /api/polls
Content-Type: application/json

{
  "question": "What's your favorite programming language?",
  "options": ["JavaScript", "Python", "Java", "C++"],
  
}
```

**Vote on a Poll:**
```javascript
POST /api/polls/:id/vote
Content-Type: application/json

{
  "optionIndex": 0
}
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables

### Backend Deployment (Heroku/Railway)
1. Set up MongoDB Atlas or compass for production database
2. Configure environment variables
3. Deploy the server directory
4. Update frontend API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write clean, documented code
- Test your changes thoroughly
- Follow the existing code style

## 📝 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start Express server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
- Change the port in `vite.config.ts` or `.env` file
- Kill the process using the port: `lsof -ti:5173 | xargs kill -9`

**Database connection issues:**
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure database permissions are correct

**Build errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Update dependencies: `npm update`



## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation

---

**Happy Polling! 🗳️**

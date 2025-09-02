# StoryVerse 📚

> A collaborative storytelling platform where multiple authors can come together to create amazing stories

Hey there! 👋 This is **StoryVerse** - my full-stack project that lets people collaborate on stories in real-time. Think of it like a digital campfire where everyone can add their own chapter to the story!

## 🌐 Live Production Demo
- **Frontend:** https://d30ib605w8wpui.cloudfront.net
- **Backend API:** https://storyverse.duckdns.org

## ✨ What's Cool About It

- **🤝 Collaborative Writing**: Start a story and let others add their own chapters
- **🔐 Google Login**: No need to remember another password - just sign in with Google
- **❤️ Like System**: Show love to your favorite stories and contributions
- **👑 Admin Panel**: Keep the community safe with user management tools
- **📱 Works Everywhere**: Looks great on your phone, tablet, or computer
- **⚡ Fast Loading**: Smart pagination so you don't wait forever for stories to load
- **☁️ Cloud Deployed**: Professional AWS deployment with global CDN

## 🛠️ What I Built It With

### Frontend (The Pretty Part)
- **React 18** - Because hooks are life-changing
- **Bootstrap 5** - Makes everything look professional without the headache
- **React Router** - Smooth navigation between pages
- **Axios** - For talking to the backend
- **React Toastify** - Sweet notifications that don't annoy you

### Backend (The Brain)
- **Node.js + Express** - The reliable duo
- **MongoDB + Mongoose** - Store all the stories and user data
- **Passport.js** - Handle Google OAuth like a pro
- **JWT** - Keep users logged in securely
- **Helmet** - Security headers to keep the bad guys out
- **Rate Limiting** - Prevent spam and abuse

## ☁️ AWS Production Architecture

### **Deployment Stack**
- **Frontend:** AWS S3 + CloudFront CDN (Global distribution with HTTPS)
- **Backend:** AWS EC2 + Nginx reverse proxy + SSL certificates  
- **Database:** MongoDB Atlas (Cloud-hosted with auto-scaling)
- **Domain:** DuckDNS free domain service
- **Security:** Let's Encrypt SSL + Helmet.js + CORS + Rate limiting

### **Architecture Flow**
```
[Users] → [CloudFront CDN] → [S3 Static Hosting] (React Frontend)
         ↓  
[Users] → [DuckDNS Domain] → [EC2 Instance] → [Nginx] → [Node.js API] → [MongoDB Atlas]
```

### **Performance Features**
- **Global CDN:** Sub-100ms load times worldwide
- **Auto-scaling:** MongoDB Atlas handles traffic spikes
- **Caching:** Aggressive browser and CDN caching
- **Compression:** Gzip compression for all assets
- **SSL/TLS:** End-to-end encryption

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- MongoDB Atlas account - [Free tier available](https://www.mongodb.com/atlas)
- Google OAuth credentials - [Get them here](https://console.cloud.google.com/)

### Quick Setup

1. **Clone and install**
```bash
git clone <your-repo-url>
cd StoryVerse

# Install server stuff
cd server
npm install

# Install client stuff
cd ../client
npm install
```

2. **Set up environment variables**

Create `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/storyverse
JWT_SECRET=your_super_secret_jwt_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
SESSION_SECRET=another_secret_key_here
NODE_ENV=development
```

Create `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

3. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:5000/auth/google/callback` to authorized redirect URIs

4. **Set up MongoDB**
   - Create a MongoDB Atlas account
   - Create a cluster (free tier works fine)
   - Get your connection string
   - Put it in your `server/.env` file

### Running the App

**Start the backend:**
```bash
cd server
npm start
```
Your API will be running on `http://localhost:5000`

**Start the frontend:**
```bash
cd client
npm start
```
Your app will open on `http://localhost:3000`

## 🏗️ How It's Organized

```
StoryVerse/
├── client/                 # React frontend (the UI)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # Global state management
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend (the logic)
│   ├── config/            # OAuth and database config
│   ├── middleware/        # Authentication & security
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   └── package.json
└── README.md
```

## 🔐 Security Stuff

I took security seriously:
- **JWT tokens** for keeping users logged in
- **Google OAuth** so you don't have to trust me with passwords
- **Rate limiting** to prevent spam
- **CORS** properly configured
- **Helmet** for security headers
- **Input validation** on the server side
- **Content Security Policy** to prevent XSS attacks

## 📡 API Endpoints

### Auth Routes
- `GET /auth/google` - Start Google login
- `GET /auth/google/callback` - Handle Google login response
- `GET /auth/user` - Get current user info

### Story Routes
- `GET /stories` - Get all stories (with pagination)
- `POST /stories` - Create a new story
- `GET /stories/:id` - Get a specific story
- `PUT /stories/:id` - Update a story
- `DELETE /stories/:id` - Delete a story
- `POST /stories/:id/like` - Like/unlike a story
- `POST /stories/:id/contribute` - Add a contribution
- `DELETE /stories/:id/contributions/:contributionId` - Delete a contribution

### Admin Routes (Admin only)
- `GET /admin/users` - Get all users
- `DELETE /admin/users/:id` - Delete a user
- `PUT /admin/users/:id/promote` - Make someone an admin
- `PUT /admin/users/:id/demote` - Remove admin status
- `GET /admin/stories` - Get all stories
- `DELETE /admin/stories/:id` - Delete a story

## 🚀 Deploying to Production

### Environment Variables for Production
```env
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_production_session_secret
```

### Where to Deploy
- **Frontend**: Vercel, Netlify, or AWS S3
- **Backend**: Heroku, AWS EC2, or DigitalOcean
- **Database**: MongoDB Atlas (what I used)

## 🤝 Want to Contribute?

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test everything works
5. Submit a pull request

## 🚀 Production Deployment

### **Environment Variables for Production**
```env
NODE_ENV=production
CLIENT_URL=https://d30ib605w8wpui.cloudfront.net
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_production_session_secret
```

### **AWS Deployment Steps**
1. **Frontend (S3 + CloudFront):**
   ```bash
   npm run build
   # Upload build/ contents to S3 bucket
   # Configure CloudFront distribution
   # Set up custom domain (optional)
   ```

2. **Backend (EC2 + Nginx):**
   ```bash
   # Launch EC2 instance (t2.micro)
   # Install Node.js, Nginx, Certbot
   # Deploy application code
   # Configure SSL with Let's Encrypt
   # Set up reverse proxy
   ```

3. **Database:** MongoDB Atlas cloud deployment

## 🆘 Having Issues?

If something's not working:
1. Check the browser console for errors
2. Make sure your `.env` files are set up correctly
3. Verify MongoDB is connected
4. Double-check your Google OAuth setup
5. For production issues, check EC2 logs and Nginx configuration

## 📝 License

MIT License - feel free to use this code for your own projects!

## 🎯 What I Learned Building This

This project taught me a ton about:
- **Full-stack development** with MERN stack
- **Authentication flows** with OAuth and JWT  
- **Database design** with MongoDB and Mongoose
- **Security best practices** for web applications
- **State management** in React
- **API design** and RESTful principles
- **AWS Cloud Deployment** with S3, CloudFront, and EC2
- **DevOps practices** with Nginx, SSL certificates, and reverse proxies
- **Production optimization** for performance and scalability
- **Environment configuration** for development vs production

---

**Built with ❤️ by Arun Saha**

*Feel free to reach out if you have questions or want to collaborate!*

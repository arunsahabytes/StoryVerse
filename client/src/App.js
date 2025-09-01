import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './global.css';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load components for better performance
const Home = lazy(() => import('./components/Home'));
const StoryList = lazy(() => import('./components/StoryList'));
const StoryDetail = lazy(() => import('./components/StoryDetail'));
const CreateStory = lazy(() => import('./components/CreateStory'));
const MyStories = lazy(() => import('./components/MyStories'));
const AuthCallback = lazy(() => import('./components/AuthCallback'));
const LoginRegister = lazy(() => import('./components/LoginRegister'));
const Profile = lazy(() => import('./components/Profile'));
const Guidelines = lazy(() => import('./components/Guidelines'));
const Admin = lazy(() => import('./components/Admin'));

function App() {
  const showNotification = () => {
    toast.success('Operation successful!');
    // or
    toast.error('Something went wrong!');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Suspense fallback={<div className="loader">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stories" element={<StoryList />} />
                <Route path="/stories/:id" element={<StoryDetail />} />
                <Route path="/create" element={
                  <ProtectedRoute>
                    <CreateStory />
                  </ProtectedRoute>
                } />
                <Route path="/mystories" element={
                  <ProtectedRoute>
                    <MyStories />
                  </ProtectedRoute>
                } />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/guidelines" element={<Guidelines />} />
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <Admin />
                  </ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

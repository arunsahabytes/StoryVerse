import React from 'react';
import { Button } from 'react-bootstrap';
import { BookOpen, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="landing-page">
      <main className="main-content">
        <section className="hero-section">
          <h1>Welcome to StoryVerse</h1>
          <p>Unleash your creativity and collaborate with writers worldwide.</p>
          <div className="cta-buttons">
            <Button size="lg" as={Link} to="/create">
              <PenTool className="icon" /> Start Writing
            </Button>
            <Button size="lg" variant="outline" as={Link} to="/stories">
              <BookOpen className="icon" /> Explore Stories
            </Button>
          </div>
        </section>

        <section className="features-section">
          <FeatureCard
            icon={<PenTool className="feature-icon" />}
            title="Collaborative Writing"
            description="Join forces with other writers to create rich, diverse narratives."
          />
          <FeatureCard
            icon={<BookOpen className="feature-icon" />}
            title="Vibrant Community"
            description="Connect with like-minded storytellers and readers from around the world."
          />
          <FeatureCard
            icon={<BookOpen className="feature-icon" />}
            title="Endless Possibilities"
            description="Explore a vast library of stories or start your own literary adventure."
          />
        </section>
        
      </main>

    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon-wrapper">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

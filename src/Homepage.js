import React, { useEffect } from 'react';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToId) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState({}, document.title);
        }
      }, 100); // Delay to allow DOM to be ready
    }
  }, [location.state]);

  return (
    <div>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <footer className="bg-gray-900 text-white text-center p-4">
        <p>© 1990 SewelOilCo. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;

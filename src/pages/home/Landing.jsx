import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

// Background images
import heroBg from "../../assets/Landing Page/HeroPhot.jpg";
import heroSecBg from "../../assets/Landing Page/HeroSection.JPG";

// Intro video
import introVideo from "../../assets/Landing Page/introVideo.mp4";

// Carousel images
import couple1 from "../../assets/Landing Page/478d14ca8c345f67954fcfa743854d12.jpg";
import couple2 from "../../assets/Landing Page/4ce31943efd28bf2666df7c53ed8cbf9.jpg";
import couple3 from "../../assets/Landing Page/944e1bae361e7847016aa54f6a63148f.jpg";
import couple4 from "../../assets/Landing Page/9d256bf803fe618e7c1676ebb95b1fb8.jpg";
import couple5 from "../../assets/Landing Page/f981c2267a70a64b35f53c05064970be.jpg";
import couple6 from "../../assets/Landing Page/fdca5c31a2cd2ddf48b62a11b8553b30.jpg";
import couple7 from "../../assets/Landing Page/images (1).jpg";
import couple8 from "../../assets/Landing Page/images (2).jpg";
import couple9 from "../../assets/Landing Page/images (3).jpg";
import couple10 from "../../assets/Landing Page/images.jpg";

import {
  FaShieldHeart,
  FaUserLock,
  FaPeopleRoof,
  FaHeart,
  FaHeadset,
} from "react-icons/fa6";
import { FaSlidersH } from "react-icons/fa";

const couples = [
  {
    img: couple1,
    groom: "Ashish",
    bride: "Sneha",
    quote: "SnehaBandh made our journey so beautiful. Thank you!",
  },
  {
    img: couple2,
    groom: "Karan",
    bride: "Diya",
    quote: "Found my soulmate in just 3 months!",
  },
  {
    img: couple3,
    groom: "Shreyas",
    bride: "Riya",
    quote: "Genuine profiles and excellent support.",
  },
  {
    img: couple4,
    groom: "Darshan",
    bride: "Siya",
    quote: "We are grateful to SnehaBandh forever.",
  },
  {
    img: couple5,
    groom: "Chinmay",
    bride: "Teja",
    quote: "Perfect platform for serious relationships.",
  },
  // duplicate set for infinite scroll feel
  {
    img: couple6,
    groom: "Ashish",
    bride: "Sneha",
    quote: "SnehaBandh made our journey so beautiful. Thank you!",
  },
  {
    img: couple7,
    groom: "Karan",
    bride: "Diya",
    quote: "Found my soulmate in just 3 months!",
  },
  {
    img: couple8,
    groom: "Shreyas",
    bride: "Riya",
    quote: "Genuine profiles and excellent support.",
  },
  {
    img: couple9,
    groom: "Darshan",
    bride: "Siya",
    quote: "We are grateful to SnehaBandh forever.",
  },
  {
    img: couple10,
    groom: "Chinmay",
    bride: "Teja",
    quote: "Perfect platform for serious relationships.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  // Search filters (controlled)
  const [lookingFor, setLookingFor] = useState(""); // "Bride" | "Groom"
  const [fromAge, setFromAge] = useState("");
  const [toAge, setToAge] = useState("");
  const [religion, setReligion] = useState("Hindu");
  const [ageOptions, setAgeOptions] = useState([]);

  // ---- AGE LOGIC (same as your JS) ----
  const loadAges = (min, max) => {
    const arr = [];
    for (let i = min; i <= max; i++) arr.push(i);
    setAgeOptions(arr);
    setFromAge("");
    setToAge("");
  };

  useEffect(() => {
    if (lookingFor === "Bride") {
      loadAges(18, 50);
    } else if (lookingFor === "Groom") {
      loadAges(21, 60);
    } else {
      setAgeOptions([]);
      setFromAge("");
      setToAge("");
    }
  }, [lookingFor]);

  // Replaces alert: navigate to /search with query params
  const handleSearchPartner = (e) => {
    // If called from a form submit, prevent default
    if (e && e.preventDefault) e.preventDefault();

    // Build query params. Only include values that are set.
    const params = new URLSearchParams();

    if (lookingFor) params.set("gender", lookingFor === "Groom" ? "male" : "female");
    if (fromAge) params.set("minAge", fromAge);
    if (toAge) params.set("maxAge", toAge);
    if (religion) params.set("religion", religion);

    // Navigate to search page with parameters
    navigate(`/search?${params.toString()}`);
  };

  return (
    <main className="landing-page">
      {/* HERO SECTION (with same Bootstrap structure) */}
      <section
        className="hero-section mb-8"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 15%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content text-center">
          <h1 className="hero-main-title shimmer-text">
            Every story here begins with Sneha and ends with Bandhan.
          </h1>
          
          <p className="hero-subtitle">
            Find a partner who understands your values, respects your family and
            walks with you for life.
          </p>

          {/* SEARCH BOX */}

          {/* Converted to a proper form so Enter works; button triggers navigation */}
          <form className="hero-search-box p-4" onSubmit={handleSearchPartner}>
            <div className="row g-3 align-items-center">
              {/* Looking for */}
              <div className="col-md-3 col-6">
                <select
                  id="lookingFor"
                  name="lookingFor"
                  className="form-select hero-select small-text"
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                >
                  <option value="" disabled hidden>
                    I'm Looking for
                  </option>
                  <option value="Bride">Bride</option>
                  <option value="Groom">Groom</option>
                </select>
              </div>

              {/* From Age */}
              <div className="col-md-2 col-6">
                <select
                  id="fromAge"
                  name="fromAge"
                  className="form-select hero-select small-text"
                  value={fromAge}
                  onChange={(e) => setFromAge(e.target.value)}
                  disabled={!ageOptions.length}
                >
                  <option value="" disabled hidden>
                    From Age
                  </option>
                  {ageOptions.map((age) => (
                    <option key={`from-${age}`} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
                
              </div>

              {/* To Age */}
              <div className="col-md-2 col-6">
                <select
                  id="toAge"
                  name="toAge"
                  className="form-select hero-select small-text"
                  value={toAge}
                  onChange={(e) => setToAge(e.target.value)}
                  disabled={!ageOptions.length}
                >
                  <option value="" disabled hidden>
                    To Age
                  </option>
                  {ageOptions.map((age) => (
                    <option key={`to-${age}`} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>

              {/* Religion */}
              <div className="col-md-2 col-6">
                <select
                  name="religion"
                  className="form-select hero-select small-text"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="col-md-3 d-flex justify-content-center">
                <button className="btn-search" type="submit">
                  Search Partner
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ABOUT SNEHABANDH – INTRO VIDEO */}
      <section className="intro-video mt-5 mb-6">
        <div className="aboutSnehaBandh">
          <h2>
            About <span>SnehaBandh</span>
          </h2>

          <div className="content">
            {/* Video */}
            <div className="video-wrapper">
              <video autoPlay muted loop playsInline poster="fallback-poster.jpg">
                <source src={introVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Text */}
            <div className="text">
              <h3>Welcome to SnehaBandh,</h3>
              <br />
              At SnehaBandh, we don’t just create matches – we build meaningful
              bonds. Our aim is to help you find a life partner who truly
              understands your values, respects your family, and shares your
              dreams for the future. Every profile is created with care, and our
              platform is designed to keep your journey simple, safe and
              genuine. We believe that marriage is not just a relationship, but
              a beautiful journey of two families coming together – and we are
              here to be a small part of your big happiness.
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SNEHABANDH */}
      <section className="choose-sneha mt-5 mb-6">
        <div className="heading">
          <h2>Why Choose SnehaBandh?</h2>
          <p className="why-tagline">
            A safe, trusted and family-focused matrimony experience.
          </p>
        </div>

        <div className="features">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="icon icon-trust">
              <FaShieldHeart />
            </div>
            <div>
              <h3>Verified &amp; Genuine Profiles</h3>
              <p>
                Multiple checks and manual review to keep fake or incomplete
                profiles away, so you connect with real, serious prospects only.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="icon icon-privacy">
              <FaUserLock />
            </div>
            <div>
              <h3>Privacy First</h3>
              <p>
                Control who sees your details, photos and contact information.
                We keep your personal data protected at every step.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="icon icon-family">
              <FaPeopleRoof />
            </div>
            <div>
              <h3>Family-Oriented Matching</h3>
              <p>
                Filters and guidance designed for traditional, family-inclusive
                decisions – perfect for parents and guardians searching for
                their loved ones.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="feature-card">
            <div className="icon icon-marathi">
              <FaHeart />
            </div>
            <div>
              <h3>Strong Community Focus</h3>
              <p>
                Special focus on Maharashtrian and like-minded communities,
                helping you find a partner who understands your culture and
                traditions.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="feature-card">
            <div className="icon icon-smart">
              <FaSlidersH />
            </div>
            <div>
              <h3>Smart, Easy Filters</h3>
              <p>
                Refine your search by education, profession, family background,
                lifestyle, location and more in just a few clicks.
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="feature-card">
            <div className="icon icon-support">
              <FaHeadset />
            </div>
            <div>
              <h3>Dedicated Support</h3>
              <p>
                Friendly support team and offline guidance whenever you or your
                family needs help during the matchmaking journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES CAROUSEL */}
      <section className="choose-sneha">
        <h2 className="section-title">
          From First Match to Forever – SnehaBandh Love Stories
        </h2>

        <div className="carousel-wrapper">
          <div className="carousel-track">
            {couples.map((c, index) => (
              <div className="couple-card" key={index}>
                <div className="couple-img">
                  <img src={c.img} alt={`${c.groom} & ${c.bride}`} />
                </div>
                <div className="couple-name">
                  <span className="groom">{c.groom}</span>
                  <span className="and">&amp;</span>
                  <span className="bride">{c.bride}</span>
                </div>
                <p>{c.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER CTA SECTION */}
      <section
        className="hero-compact mb-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.60)), url(" +
            heroSecBg +
            ")",
          backgroundPosition: "50% 15%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-content">
          <h2 className="ready_regis">Ready to find your life partner?</h2>
          <p>
            Join SnehaBandh today and embark on your journey to a happy
            marriage.
            <br />
            Create your free profile now!
          </p>
          {/* In React you’ll likely navigate with Link / useNavigate instead of <a> */}
          <a href="/register" className="btn">
            Register Now
          </a>
        </div>
      </section>
    </main>
  );
};

export default Landing;

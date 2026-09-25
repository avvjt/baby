import { useEffect, useState } from "react";
import "./App.css";
import herSong from "./assets/her-song.mp3";


// ========================================
// 🎂 BIRTHDAY CONFIG
// ========================================

const BIRTHDAY_CONFIG = {
  name: "Debjani",
  birthday: "2026-10-04T00:00:00+05:30",
  age: 18,

  introLabel: "A little something for someone special",

  title: "Something magical is coming...",
  subtitle: "Until the world gets to celebrate you.",

  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
};

// ========================================
// ⏳ COUNTDOWN
// ========================================

function useCountdown(targetDate) {
  const calculate = () => {
    const difference =
      new Date(targetDate).getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),

      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),

      seconds: Math.floor(
        (difference / 1000) % 60
      ),

      expired: false,
    };
  };

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}

// ========================================
// 🔢 COUNTDOWN UNIT
// ========================================

function CountdownUnit({ value, label }) {
  return (
    <div className="countdown-unit">
      <div className="countdown-number">
        {String(value).padStart(2, "0")}
      </div>

      <div className="countdown-label">
        {label}
      </div>
    </div>
  );
}

// ========================================
// 🌙 INTRO SCREEN
// ========================================

function IntroScreen({ onEnter }) {
  return (
    <section className="intro-screen">

      <div className="intro-glow" />

      <div className="intro-content">

        <div className="intro-symbol">
          ✦
        </div>

        <p className="intro-small">
          {BIRTHDAY_CONFIG.introLabel}
        </p>

        <h1 className="intro-name">
          {BIRTHDAY_CONFIG.name}
        </h1>

        <p className="intro-description">
          A tiny universe,
          <br />
          made just for you.
        </p>

        <button
          type="button"
          className="enter-button"
          onClick={onEnter}
        >
          <span>Enter her world</span>

          <span className="enter-arrow">
            →
          </span>
        </button>

        <p className="intro-hint">
          headphones recommended
        </p>

      </div>

    </section>
  );
}

// ========================================
// ✨ COUNTDOWN PAGE
// ========================================

function CountdownPage() {
  const timeLeft = useCountdown(
    BIRTHDAY_CONFIG.birthday
  );

  const birthdayDate = new Date(
    BIRTHDAY_CONFIG.birthday
  );

  const formattedDate =
    birthdayDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <main className="birthday-page">

      {/* Ambient background */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* Grain */}
      <div className="noise" />

      {/* Stars */}
      <div className="stars">
        <span className="star star-1">✦</span>
        <span className="star star-2">✧</span>
        <span className="star star-3">·</span>
        <span className="star star-4">✦</span>
        <span className="star star-5">·</span>
        <span className="star star-6">✧</span>
      </div>

      <section className="hero">

        <div className="eyebrow">
          <span className="eyebrow-line" />

          <span>
            {BIRTHDAY_CONFIG.introLabel}
          </span>

          <span className="eyebrow-line" />
        </div>

        <h1 className="name">
          {BIRTHDAY_CONFIG.name}
        </h1>

        <p className="hero-title">
          {BIRTHDAY_CONFIG.title}
        </p>

        {!timeLeft.expired ? (
          <>
            <div className="countdown">

              {BIRTHDAY_CONFIG.showDays && (
                <CountdownUnit
                  value={timeLeft.days}
                  label="Days"
                />
              )}

              {BIRTHDAY_CONFIG.showHours && (
                <>
                  <span className="countdown-separator">
                    :
                  </span>

                  <CountdownUnit
                    value={timeLeft.hours}
                    label="Hours"
                  />
                </>
              )}

              {BIRTHDAY_CONFIG.showMinutes && (
                <>
                  <span className="countdown-separator">
                    :
                  </span>

                  <CountdownUnit
                    value={timeLeft.minutes}
                    label="Minutes"
                  />
                </>
              )}

              {BIRTHDAY_CONFIG.showSeconds && (
                <>
                  <span className="countdown-separator">
                    :
                  </span>

                  <CountdownUnit
                    value={timeLeft.seconds}
                    label="Seconds"
                  />
                </>
              )}

            </div>

            <p className="countdown-caption">
              {BIRTHDAY_CONFIG.subtitle}
            </p>
            <VoiceExperience />
          </>
        ) : (
          <div className="birthday-reveal">

            <div className="birthday-date">
              {formattedDate}
            </div>

            <h2>
              Happy {BIRTHDAY_CONFIG.age}th Birthday
            </h2>

            <p>
              The countdown is over.
              <br />
              Now the celebration begins.
            </p>

          </div>
        )}

        <div className="date-marker">
          <span />

          <p>
            04 · OCTOBER · 2026
          </p>

          <span />
        </div>

        <div className="scroll-hint">
          <span>
            Scroll to enter
          </span>

          <div className="scroll-arrow">
            ↓
          </div>
        </div>

      </section>

    </main>
  );
}


// ========================================
// 🎙️ VOICE EXPERIENCE
// ========================================

function VoiceExperience() {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const audioElement = new Audio(herSong);

    audioElement.loop = true;
    audioElement.volume = 0.45;
    audioElement.preload = "auto";

    setAudio(audioElement);

    const handleEnded = () => {
      setPlaying(false);
    };

    audioElement.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;

      audioElement.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, []);

  const toggleMusic = async () => {
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch (error) {
      console.error(
        "Unable to play audio:",
        error
      );

      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      className={`voice-player ${
        playing ? "is-playing" : ""
      }`}
      onClick={toggleMusic}
      aria-label={
        playing
          ? "Pause her voice"
          : "Play her voice"
      }
    >
      <div className="voice-bars">
        {Array.from({ length: 12 }).map(
          (_, index) => (
            <span
              key={index}
              style={{
                animationDelay:
                  `${index * 0.08}s`,
              }}
            />
          )
        )}
      </div>

      <div className="voice-player-text">
        <span className="voice-status">
          {playing
            ? "Now playing"
            : "Her voice"}
        </span>

        <span className="voice-title">
          A little piece of magic
        </span>
      </div>

      <div className="voice-play">
        {playing ? "Ⅱ" : "▶"}
      </div>
    </button>
  );
}




// ========================================
// 🚀 APP
// ========================================

function App() {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <div className={entered ? "app entered" : "app"}>

      {!entered && (
        <IntroScreen
          onEnter={handleEnter}
        />
      )}

      {entered && (
        <CountdownPage />
      )}

    </div>
  );
}

export default App;


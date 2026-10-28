/**
 * Recordify Official Website JavaScript
 * Handles interactive tabs, gallery screenshot switcher, FAQ accordions, mobile menu, and download feedback.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
      mobileMenuBtn.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("mobile-open")
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
      });
    });
  }

  // 2. Showcase Device Tabs (Phone vs Android TV)
  const tabBtns = document.querySelectorAll(".showcase-tab-btn");
  const panels = document.querySelectorAll(".showcase-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPlatform = btn.getAttribute("data-tab");

      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      panels.forEach((panel) => {
        if (panel.id === `panel-${targetPlatform}`) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });

  // 3. Interactive Screenshots Gallery Switcher
  const galleryData = {
    home: {
      title: "Personalized Home Hub",
      desc: "Instant greeting, quick 6 access tiles, India trending Bollywood feeds, and automated Heavy Rotation based on your music taste.",
      img: "assets/images/screenshots/screen_home.jpg",
      badge: "Home Hub",
      features: [
        "Quick 6 access cards with 1-tap playback",
        "Your Heavy Rotation: All-time most played tracks",
        "Daily Mixes generated directly from your audio history"
      ]
    },
    search: {
      title: "Visual Search & India Charts",
      desc: "Curated regional categories including Bollywood, Punjabi, Gujarati, Romantic, Pop Hits, and 90s Retro alongside popular India playlists.",
      img: "assets/images/screenshots/screen_search.jpg",
      badge: "Explore & Charts",
      features: [
        "Vibrant gradient genre tiles with high-res cover art",
        "Auto-rotating trending playlists from 60+ curated catalogs",
        "Single-tap instant category filter and full album playback"
      ]
    },
    recents: {
      title: "Active Search & Instant Recents",
      desc: "Search global music catalogs without interruptions. Type full queries freely or replay recent searches with 1-click plus actions.",
      img: "assets/images/screenshots/screen_search_recents.jpg",
      badge: "Live Search",
      features: [
        "Manual Enter-only search prevents premature typing dismissals",
        "1-click (+) action to add search tracks straight to queue",
        "Instant history caching with swipe & delete controls"
      ]
    },
    library: {
      title: "Color-Coded Library Tiles",
      desc: "Effortlessly manage your music collection with vibrant cyan, coral, purple, and emerald smart tiles for Downloaded, Liked, Playlists, and Artists.",
      img: "assets/images/screenshots/screen_library.jpg",
      badge: "Your Library",
      features: [
        "4 High-contrast gradient action pods for quick access",
        "Filter chips for All, Downloaded, Playlists, Artists, and Songs",
        "Offline status indicators showing saved local files"
      ]
    },
    video: {
      title: "YouTube HD Video Hub",
      desc: "Direct in-app YouTube video downloader. Paste any YouTube, Shorts, or Music Video link to save HD video and audio directly for offline enjoyment.",
      img: "assets/images/screenshots/screen_video_downloader.jpg",
      badge: "Video Downloader",
      features: [
        "Single-tap link paste with clipboard detection",
        "High-definition video and audio extraction engine",
        "Offline playback anytime directly within the Recordify app"
      ]
    }
  };

  const galleryPills = document.querySelectorAll(".gallery-pill");
  const galleryTitle = document.getElementById("gallery-title");
  const galleryDesc = document.getElementById("gallery-desc");
  const galleryImg = document.getElementById("gallery-img");
  const galleryPoints = document.getElementById("gallery-points");

  galleryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const screenKey = pill.getAttribute("data-screen");
      const data = galleryData[screenKey];
      if (!data) return;

      galleryPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      // Smooth transition
      if (galleryImg) {
        galleryImg.style.opacity = "0.2";
        galleryImg.style.transform = "scale(0.96)";
      }

      setTimeout(() => {
        if (galleryTitle) galleryTitle.innerText = data.title;
        if (galleryDesc) galleryDesc.innerText = data.desc;
        if (galleryImg) {
          galleryImg.src = data.img;
          galleryImg.alt = data.title;
          galleryImg.style.opacity = "1";
          galleryImg.style.transform = "scale(1)";
        }
        if (galleryPoints) {
          galleryPoints.innerHTML = data.features
            .map(
              (f) => `
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${f}</span>
            </li>
          `
            )
            .join("");
        }
      }, 150);
    });
  });

  // 4. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (questionBtn && answer) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("active");
            const otherAnswer = other.querySelector(".faq-answer");
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove("active");
          answer.style.maxHeight = null;
        } else {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });

  // 5. Download Button Toast Feedback
  const downloadButtons = document.querySelectorAll(".download-trigger");

  downloadButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const platformName = btn.getAttribute("data-platform") || "Recordify";
      showDownloadToast(`Downloading ${platformName}... Check your notification or downloads.`);
    });
  });

  function showDownloadToast(message) {
    const existing = document.querySelector(".toast-notification");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `
      <div style="
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: linear-gradient(135deg, #18191f 0%, #0e0f13 100%);
        border: 1px solid #1DB954;
        color: #ffffff;
        padding: 14px 22px;
        border-radius: 9999px;
        font-weight: 600;
        font-size: 0.95rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 25px rgba(29, 185, 84, 0.45);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 1000;
      ">
        <span style="color: #1ed760; font-size: 1.25rem;">✓</span>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px)";
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }
});

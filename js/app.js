/**
 * Recordify Official Website JavaScript
 * Handles interactive tabs, FAQ accordions, mobile menu, and download feedback.
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

    // Close menu when clicking outside or clicking any nav link
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

      // Update active button state
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update active panel
      panels.forEach((panel) => {
        if (panel.id === `panel-${targetPlatform}`) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (questionBtn && answer) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close all other accordions
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("active");
            const otherAnswer = other.querySelector(".faq-answer");
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle clicked accordion
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

  // 4. Download Button Visual Feedback
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
        background: #181818;
        border: 1px solid #1DB954;
        color: #ffffff;
        padding: 14px 22px;
        border-radius: 9999px;
        font-weight: 600;
        font-size: 0.95rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(29, 185, 84, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideInUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      ">
        <span style="color: #1DB954; font-size: 1.2rem;">✓</span>
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

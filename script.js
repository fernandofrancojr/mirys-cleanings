
// ========================================
// MIRYS CLEANINGS - WEBSITE JAVASCRIPT
// ========================================

// Temporary email for testing
const BUSINESS_EMAIL = "goldharbourwebsolutions@gmail.com";

// Free form submission service
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${BUSINESS_EMAIL}`;


// ========================================
// MOBILE NAVIGATION
// ========================================

const nav = document.getElementById("nav");
const toggle = document.querySelector(".menu-toggle");

if (nav && toggle) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");

    nav.classList.toggle("open", !expanded);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}


// ========================================
// AUTOMATIC SERVICE SELECTION
// ========================================

const serviceSelect = document.getElementById("service");

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    if (serviceSelect) {
      serviceSelect.value = link.dataset.service;
    }
  });
});


// ========================================
// COPYRIGHT YEAR
// ========================================

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// ========================================
// QUOTE FORM SUBMISSION
// ========================================

const form = document.getElementById("quote-form");
const formMessage = document.getElementById("form-message");

if (form && formMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    formMessage.textContent = "";

    // Validate required fields
    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);

    // Basic spam protection
    if (data.get("website")) {
      return;
    }

    // Disable button during submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonContent = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formMessage.textContent = "Submitting your request...";

    // Collect customer information
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      service: String(data.get("service") || "").trim(),
      location: String(data.get("location") || "").trim(),
      details: String(data.get("details") || "").trim(),

      // Email formatting
      _subject: "New Mirys Cleanings Quote Request",
      _template: "table",
      _replyto: String(data.get("email") || "").trim()
    };

    try {
      // Send data to FormSubmit
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status}`);
      }

      const result = await response.json();

      if (result.success === false || result.success === "false") {
        throw new Error(result.message || "Submission rejected");
      }

      // Show confirmation
      formMessage.textContent =
        "Your request has been submitted! Thank you for contacting us.";

      // Clear form
      form.reset();

    } catch (error) {
      console.error("Form submission error:", error);

      formMessage.textContent =
        "Sorry, we couldn't submit your request. Please try again.";

    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonContent;
    }
  });
}

(function () {
  // ---------- COVER REVEAL ----------
  const seal = document.getElementById("seal");
  const cover = document.getElementById("cover");
  const main = document.getElementById("main");
  if (seal) {
      seal.addEventListener("click", () => {
          if (seal.classList.contains("cracked")) return;
          seal.classList.add("cracked");
          setTimeout(() => cover.classList.add("fade-out"), 800);
          setTimeout(() => {
              cover.style.display = "none";
              main.hidden = false;
              window.scrollTo({ top: 0, behavior: "instant" });
          }, 1500);
      });
  }

  // ---------- SCRATCH CARDS ----------
  document.querySelectorAll("[data-scratch]").forEach((el) => {
      el.addEventListener("click", () => {
          if (el.classList.contains("revealed")) return;
          el.classList.add("revealed");
          const card = el.parentElement;
          const colors = ["#c9a14a", "#6b7340", "#b73c2c", "#e0c97a"];
          for (let i = 0; i < 14; i++) {
              const piece = document.createElement("span");
              piece.className = "confetti-piece";
              piece.style.left = Math.random() * 100 + "%";
              piece.style.background = colors[i % 4];
              piece.style.animationDelay = Math.random() * 0.4 + "s";
              piece.style.transform = `rotate(${Math.random() * 360}deg)`;
              card.appendChild(piece);
              setTimeout(() => piece.remove(), 1400);
          }
      });
  });

  // ---------- COUNTDOWN ----------
  const TARGET = new Date("2026-05-15T07:30:00").getTime();
  const cdEl = document.getElementById("countdown");
  if (cdEl) {
      const dEl = cdEl.querySelector("[data-d]");
      const hEl = cdEl.querySelector("[data-h]");
      const mEl = cdEl.querySelector("[data-m]");
      const sEl = cdEl.querySelector("[data-s]");
      const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
      const tick = () => {
          const diff = TARGET - Date.now();
          if (diff <= 0) {
              if(dEl) dEl.textContent = "00";
              if(hEl) hEl.textContent = "00";
              if(mEl) mEl.textContent = "00";
              if(sEl) sEl.textContent = "00";
              return;
          }
          if(dEl) dEl.textContent = pad(Math.floor(diff / 86400000));
          if(hEl) hEl.textContent = pad(Math.floor((diff / 3600000) % 24));
          if(mEl) mEl.textContent = pad(Math.floor((diff / 60000) % 60));
          if(sEl) sEl.textContent = pad(Math.floor((diff / 1000) % 60));
      };
      tick();
      setInterval(tick, 1000);
  }

  // ---------- EVENT CARDS ----------
  const events = [
      {
          key: "Haldi & Mehndi", name: "Haldi & Mehndi", day: "Day 01",
          date: "Monday, 11 May 2026", time: "7:00 PM — 9:00 AM",
          theme: "Colourful Pop", venue: "My Home",
          address: "Sikka Karnam Greens, Noida Sector-143",
          mapUrl: "https://maps.google.com/?q=SIKKA+KARNAM+GREENS,+Sector+143B",
          accent: "#d97a64",
          bg: "linear-gradient(135deg, #f9c5b3 0%, #f3a78d 60%, #e07e62 100%)",
      },
      {
          key: "Baraat", name: "Baraat", day: "Day 02",
          date: "Friday, 15 May 2026", time: "7:30 PM Onwards",
          theme: "Glitz & Glam", venue: "Grand Amara by Gurmeet",
          address: "Karkardooma court, Delhi",
          mapUrl: "https://maps.google.com/?q=Grand+Amara+Banquets-+Group+Gurmeet",
          accent: "#5c4a8a",
          bg: "linear-gradient(135deg, #2b2547 0%, #4a3d75 60%, #6b5fa0 100%)",
      },
      {
          key: "Vivaah", name: "Vivaah", day: "Day 02",
          date: "Friday, 15 May 2026", time: "9:00 PM Onwards",
          theme: "Indo-Western Elegance", venue: "Grand Amara by Gurmeet",
          address: "Karkardooma court, Delhi",
          mapUrl: "https://maps.google.com/?q=Grand+Amara+Banquets-+Group+Gurmeet",
          accent: "#3a4a6b",
          bg: "linear-gradient(135deg, #1a2240 0%, #2e3b66 60%, #4f608f 100%)",
      },
      {
          key: "Welcome Home", name: "Welcome Home", day: "Day 03",
          date: "Saturday, 16 May 2026", time: "6:15 AM Onwards",
          theme: "South Indian Traditional", venue: "My Home",
          address: "Sikka Karnam Greens",
          mapUrl: "https://maps.google.com/?q=SIKKA+KARNAM+GREENS,+Sector+143B",
          accent: "#b73c2c",
          bg: "linear-gradient(135deg, #f3c98b 0%, #e69948 60%, #b85b22 100%)",
          petals: true,
          schedule: [
              { time: "08:00 AM", title: "Milni & Tea" },
              { time: "09:00 AM", title: "Kangana" },
              { time: "9:30 PM", title: "Angoothi ka khel" },
          ],
      },
  ];

  const grid = document.getElementById("event-grid");
  if (grid) {
      grid.innerHTML = events.map((ev) => {
          const dots = Array.from({ length: 18 }).map((_, i) =>
              `<span class="dot" style="top:${(i * 37) % 100}%;left:${(i * 53) % 100}%"></span>`
          ).join("");
          const petals = ev.petals
              ? Array.from({ length: 8 }).map((_, i) =>
                  `<span class="petal" style="left:${(i * 13) % 100}%;animation-duration:${4 + (i % 4)}s;animation-delay:${i * 0.4}s"></span>`
              ).join("")
              : "";
          const sched = ev.schedule
              ? `<div class="event-schedule">
                  <p class="kicker" style="margin-bottom:14px">Schedule of the Day</p>
                  <ul>
                      ${ev.schedule.map((s) => `<li><span>${s.time}</span><span>${s.title}</span></li>`).join("")}
                  </ul>
              </div>`
              : "";
          return `
              <article class="event-card">
                  <div class="event-visual" style="background:${ev.bg}">
                      ${dots}
                      <div class="event-visual-inner">
                          <p class="name">${ev.name}</p>
                          <p class="theme">${ev.theme}</p>
                      </div>
                      ${petals}
                  </div>
                  <div class="event-body">
                      <p class="event-day" style="color:${ev.accent}">${ev.day}</p>
                      <h3 class="event-name">${ev.name}</h3>
                      <div class="event-meta">
                          <p><strong>Date:</strong> ${ev.date}</p>
                          <p><strong>Time:</strong> ${ev.time}</p>
                          <p><strong>Venue:</strong> ${ev.venue} — ${ev.address}</p>
                      </div>
                      <a class="btn-outline-olive" href="${ev.mapUrl}" target="_blank" rel="noreferrer">📍 View on Map</a>
                      ${sched}
                  </div>
              </article>
          `;
      }).join("");
  }

  // ---------- RSVP CHECKBOX VISUALS ----------
  document.querySelectorAll(".event-check input").forEach((inp) => {
      inp.addEventListener("change", () => {
          inp.closest(".event-check").classList.toggle("checked", inp.checked);
      });
  });

  // ---------- RSVP SUBMIT ----------
  const form = document.getElementById("rsvp-form");
  const toast = document.getElementById("toast");
  if (form) {
      form.addEventListener("submit", (e) => {
          const action = form.getAttribute("action") || "";
          if (action.includes("REPLACE_WITH_YOUR_FORM_ID")) {
              e.preventDefault();
              if (toast) {
                  toast.hidden = false;
                  toast.textContent = "Demo mode — connect your Google Form ID in index.html to enable submissions.";
              }
              form.reset();
              document.querySelectorAll(".event-check.checked").forEach((el) => el.classList.remove("checked"));
              setTimeout(() => { if(toast) toast.hidden = true; }, 5000);
              return;
          }
          // Form posts to hidden iframe; show toast after a beat
          setTimeout(() => {
              if (toast) {
                  toast.hidden = false;
                  toast.textContent = "Thank you! Your RSVP has been received.";
              }
              form.reset();
              document.querySelectorAll(".event-check.checked").forEach((el) => el.classList.remove("checked"));
              setTimeout(() => { if(toast) toast.hidden = true; }, 5000);
          }, 700);
      });
  }
})();

/* Direct Interiors NW — progressive enhancement only. The site works without JS. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById("site-nav");
  var toggle = nav && nav.querySelector(".site-nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Solutions dropdown (disclosure pattern) ---------- */
  document.querySelectorAll(".site-nav__item--has-children").forEach(function (item) {
    var btn = item.querySelector(".site-nav__disclosure");
    if (!btn) return;
    var close = function () {
      item.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    };
    btn.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && item.classList.contains("is-open")) {
        close();
        btn.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (!item.contains(e.target)) close();
    });
  });

  /* ---------- Reveal on scroll (reduced-motion gated in CSS too) ---------- */
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    document.querySelectorAll(".section > .container, .cta-band__inner, .testimonial__inner").forEach(function (el) {
      el.classList.add("reveal");
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }

  /* ---------- Gallery lightbox (keyboard operable) ---------- */
  var galleries = document.querySelectorAll("[data-lightbox]");
  if (galleries.length && typeof HTMLDialogElement === "function") {
    var dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Image viewer");
    dialog.innerHTML =
      '<figure><img class="lightbox__img" alt=""><figcaption class="lightbox__caption"></figcaption></figure>' +
      '<button type="button" class="lightbox__btn lightbox__btn--close" aria-label="Close viewer">&times;</button>' +
      '<button type="button" class="lightbox__btn lightbox__btn--prev" aria-label="Previous image">&larr;</button>' +
      '<button type="button" class="lightbox__btn lightbox__btn--next" aria-label="Next image">&rarr;</button>';
    document.body.appendChild(dialog);
    var lbImg = dialog.querySelector(".lightbox__img");
    var lbCap = dialog.querySelector(".lightbox__caption");

    galleries.forEach(function (gallery) {
      var links = Array.prototype.slice.call(gallery.querySelectorAll(".gallery__link"));
      var current = 0;
      var show = function (i) {
        current = (i + links.length) % links.length;
        var link = links[current];
        var thumbImg = link.querySelector("img");
        lbImg.src = link.href;
        lbImg.alt = thumbImg ? thumbImg.alt : "";
        lbCap.textContent = thumbImg ? thumbImg.alt : "";
      };
      links.forEach(function (link, i) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          show(i);
          dialog.showModal();
        });
      });
      dialog.querySelector(".lightbox__btn--prev").addEventListener("click", function () { show(current - 1); });
      dialog.querySelector(".lightbox__btn--next").addEventListener("click", function () { show(current + 1); });
      dialog.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "ArrowRight") show(current + 1);
      });
    });
    dialog.querySelector(".lightbox__btn--close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  }

  /* ---------- Our Work filter chips (progressive enhancement) ---------- */
  var filters = document.querySelector("[data-work-filters]");
  var workGrid = document.querySelector("[data-work-grid]");
  if (filters && workGrid) {
    filters.hidden = false;
    var chips = filters.querySelectorAll(".work-filters__chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          c.classList.toggle("is-active", c === chip);
          c.setAttribute("aria-pressed", String(c === chip));
        });
        var filter = chip.dataset.filter;
        workGrid.querySelectorAll(".card").forEach(function (card) {
          var services = (card.dataset.services || "").split("|");
          card.hidden = filter !== "all" && services.indexOf(filter) === -1;
        });
      });
    });
  }

  /* ---------- Enquiry form ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    // Pre-select from ?enquiry=quote|consultation|tender|general (the four old
    // enquiry pages 301 here with this parameter).
    var params = new URLSearchParams(window.location.search);
    var enquiry = params.get("enquiry");
    var select = document.getElementById("ef-enquiry");
    if (enquiry && select && select.querySelector('option[value="' + enquiry + '"]')) {
      select.value = enquiry;
    }

    var status = form.querySelector(".enquiry-form__status");
    var fields = [
      { input: document.getElementById("ef-name"), check: function (v) { return v.trim() !== ""; } },
      { input: document.getElementById("ef-email"), check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); } },
      { input: document.getElementById("ef-message"), check: function (v) { return v.trim() !== ""; } },
      { input: document.getElementById("ef-consent"), check: function (v, el) { return el.checked; } },
    ];

    var validateField = function (f) {
      var valid = f.check(f.input.value, f.input);
      var error = document.getElementById(f.input.id + "-error");
      var wrapper = f.input.closest(".enquiry-form__field");
      if (error) error.hidden = valid;
      if (wrapper) wrapper.classList.toggle("has-error", !valid);
      f.input.setAttribute("aria-invalid", String(!valid));
      return valid;
    };
    fields.forEach(function (f) {
      if (!f.input) return;
      f.input.addEventListener("blur", function () { validateField(f); });
      f.input.addEventListener("input", function () {
        if (f.input.getAttribute("aria-invalid") === "true") validateField(f);
      });
    });

    form.addEventListener("submit", function (e) {
      var allValid = fields.every(function (f) { return f.input ? validateField(f) : true; });
      if (!allValid) {
        e.preventDefault();
        var firstInvalid = fields.filter(function (f) { return f.input.getAttribute("aria-invalid") === "true"; })[0];
        if (firstInvalid) firstInvalid.input.focus();
        return;
      }
      // TODO(client) #9: with no endpoint configured, we cannot send — explain
      // instead of silently failing. Once site.formEndpoint is set the form
      // POSTs normally (with a fetch enhancement for inline status updates).
      if (form.dataset.noEndpoint) {
        e.preventDefault();
        status.textContent =
          "The enquiry form isn’t connected yet — please call us or email " +
          "using the details below and we’ll get straight back to you.";
        status.classList.add("is-error");
        status.classList.remove("is-success");
        return;
      }
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          status.textContent = status.dataset.success;
          status.classList.add("is-success");
          status.classList.remove("is-error");
          form.reset();
        })
        .catch(function () {
          status.textContent = status.dataset.error;
          status.classList.add("is-error");
          status.classList.remove("is-success");
        })
        .then(function () {
          submitBtn.disabled = false;
        });
    });
  }

  /* ---------- Cookie consent (only when analytics is configured) ---------- */
  var script = document.currentScript || document.querySelector("script[data-ga-id]");
  var gaId = script && script.dataset.gaId;
  var banner = document.getElementById("consent-banner");
  if (gaId && banner) {
    var CONSENT_KEY = "dinw-analytics-consent";
    var loadAnalytics = function () {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", gaId, { anonymize_ip: true });
    };
    var stored = null;
    try { stored = localStorage.getItem(CONSENT_KEY); } catch (e) { /* storage unavailable */ }
    if (stored === "accepted") {
      loadAnalytics();
    } else if (stored !== "declined") {
      banner.hidden = false;
      banner.addEventListener("click", function (e) {
        var choice = e.target && e.target.dataset && e.target.dataset.consent;
        if (!choice) return;
        try { localStorage.setItem(CONSENT_KEY, choice === "accept" ? "accepted" : "declined"); } catch (err) { /* ignore */ }
        banner.hidden = true;
        if (choice === "accept") loadAnalytics();
      });
    }
  }
})();

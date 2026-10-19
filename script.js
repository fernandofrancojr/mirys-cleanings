// Set the business inbox here BEFORE publishing. This is the only required form configuration.
const BUSINESS_EMAIL = '';
// Uses the visitor's mail app; no backend, tracking, or third-party form processor.

const nav = document.getElementById('nav');
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  toggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}));

document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  document.getElementById('service').value = link.dataset.service;
}));
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('quote-form');
const formMessage = document.getElementById('form-message');
form.addEventListener('submit', event => {
  event.preventDefault();
  formMessage.textContent = '';
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (data.get('website')) return; // simple spam trap
  if (!BUSINESS_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(BUSINESS_EMAIL)) {
    formMessage.textContent = 'Quote requests are not yet configured. Please check back soon.';
    return;
  }
  const subject = `Mirys Cleanings — ${data.get('service')} quote request`;
  const body = [
    'New cleaning request', '',
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone')}`,
    `Service: ${data.get('service')}`,
    `Location: ${data.get('location')}`,
    '', 'Project details:', String(data.get('details'))
  ].join('\n');
  const mailto = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  formMessage.textContent = 'Your email app should open with the request ready. Please press Send there to finish submitting.';
});

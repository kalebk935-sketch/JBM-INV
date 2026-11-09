const sections = document.querySelectorAll('.reveal:not(.is-visible)');

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  sections.forEach((section) => section.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sections.forEach((section) => observer.observe(section));
}

const invitationGate = document.querySelector('#invitation-gate');
const invitationContent = document.querySelector('#invitation-content');
const invitationCodeForm = document.querySelector('#invitation-code-form');
const invitationCodeInput = document.querySelector('#invitation-code');
const gateMessage = document.querySelector('#gate-message');
const invitationAudio = document.querySelector('#invitation-audio');

if (invitationGate && invitationContent && invitationCodeForm && invitationCodeInput && gateMessage) {
  invitationCodeInput.focus();

  invitationCodeInput.addEventListener('input', () => {
    invitationCodeInput.value = invitationCodeInput.value.replace(/\D/g, '').slice(0, 5);
    invitationGate.classList.remove('has-error');
    gateMessage.classList.remove('is-error');
    gateMessage.textContent = 'Un code à 5 chiffres vous a été communiqué.';
  });

  invitationCodeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const code = invitationCodeInput.value;

    if (!/^\d{5}$/.test(code)) {
      gateMessage.textContent = 'Veuillez saisir les 5 chiffres de votre code.';
      gateMessage.classList.add('is-error');
      invitationGate.classList.add('has-error');
      invitationCodeInput.focus();
      return;
    }

    if (!window.INVITATION_CODES || !window.INVITATION_CODES.has(code)) {
      gateMessage.textContent = 'Ce code ne correspond pas. Vérifiez-le puis réessayez.';
      gateMessage.classList.add('is-error');
      invitationGate.classList.remove('has-error');
      void invitationGate.offsetWidth;
      invitationGate.classList.add('has-error');
      invitationCodeInput.select();
      return;
    }

    invitationCodeForm.querySelector('button').disabled = true;
    invitationCodeInput.disabled = true;
    invitationContent.hidden = false;
    invitationContent.inert = false;
    invitationGate.setAttribute('aria-hidden', 'true');
    invitationGate.inert = true;
    invitationGate.classList.add('is-opening');

    if (invitationAudio) {
      invitationAudio.play().catch((error) => {
        console.error('La musique de l’invitation n’a pas pu être lancée.', error);
      });
    }

    window.setTimeout(() => {
      invitationGate.hidden = true;
    }, 1050);
  });
}
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

const invitationAudio = document.querySelector('#invitation-audio');

if (invitationAudio) {
  const removeAudioStartListeners = () => {
    document.removeEventListener('pointerdown', startAudio);
    document.removeEventListener('keydown', startAudio);
  };

  const startAudio = () => {
    invitationAudio.play().then(removeAudioStartListeners).catch((error) => {
      if (error.name !== 'NotAllowedError') {
        console.error('La musique de l’invitation n’a pas pu être lancée.', error);
      }
    });
  };

  document.addEventListener('pointerdown', startAudio);
  document.addEventListener('keydown', startAudio);
  startAudio();
}
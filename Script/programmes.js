window.INVITATION_PROGRAMS = {
  'jessica-bonheur': [
    { time: '10 h 00', title: 'Accueil des invités', description: 'Un verre de bienvenue au jardin' },
    { time: '11 h 00', title: 'Cérémonie de mariage', description: 'Dans la grande galerie' },
    { time: '13 h 00', title: 'Séance photo', description: 'Au détour des jardins' },
    { time: '14 h 00', title: 'Réception', description: 'Cocktail et douceurs' },
    { time: '16 h 00', title: 'Repas', description: 'À la table des Ormes' },
    { time: '20 h 00', title: 'Soirée dansante', description: 'Jusqu’au bout de la nuit' }
  ]
};

document.querySelectorAll('.program-list[data-program]').forEach((list) => {
  const programKey = list.dataset.program;
  const program = window.INVITATION_PROGRAMS[programKey];

  if (!Array.isArray(program)) {
    console.error(`Aucun programme n’est configuré pour « ${programKey} ».`);
    const errorItem = document.createElement('li');
    errorItem.className = 'program-item';
    errorItem.setAttribute('role', 'alert');
    errorItem.textContent = 'Le programme de cette invitation n’est pas disponible.';
    list.append(errorItem);
    return;
  }

  program.forEach((event, index) => {
    const item = document.createElement('li');
    item.className = 'program-item';

    const time = document.createElement('time');
    time.className = 'program-time';
    time.textContent = event.time;

    const marker = document.createElement('span');
    marker.className = 'program-marker';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = String(index + 1).padStart(2, '0');

    const details = document.createElement('div');
    details.className = 'program-details';

    const title = document.createElement('h3');
    title.textContent = event.title;

    const description = document.createElement('p');
    description.textContent = event.description;

    details.append(title, description);
    item.append(time, marker, details);
    list.append(item);
  });
});

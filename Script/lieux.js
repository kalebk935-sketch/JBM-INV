window.INVITATION_VENUES = {
  'jessica-bonheur': {
    name: 'Pullman Lubumbashi Hôtel',
    description: 'Une demeure de pierre au cœur d’un parc centenaire, où jardins et salons s’ouvrent sur la lumière de l’été.',
    image: '../Resources/images/2.jpeg',
    imageAlt: 'Vue du lieu de réception du mariage',
    imageCaption: 'Le lieu de nos promesses',
    address: ['18, chemin des Ormes', '78000 Versailles, Lubumbashi'],
    date: 'Vendredi 18 décembre 2026',
    ceremony: '11 h 00',
    mapUrl: 'https://www.google.com/maps/place/H%C3%B4tel+Pullman+Lubumbashi+Grand+Karavia/@-11.6525674,27.4554147,853m/data=!3m2!1e3!4b1!4m9!3m8!1s0x19723c001f32e05d:0x27dee5331ae71785!5m2!4m1!1i2!8m2!3d-11.6525674!4d27.4554147!16s%2Fg%2F1wbkf2pd?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D'
  }
};

function createVenueElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

document.querySelectorAll('.venue-section[data-venue]').forEach((section) => {
  const venueKey = section.dataset.venue;
  const venue = window.INVITATION_VENUES[venueKey];

  if (!venue) {
    console.error(`Aucun lieu n’est configuré pour « ${venueKey} ».`);
    const error = createVenueElement('p', 'venue-error', 'Le lieu de cette invitation n’est pas disponible.');
    error.setAttribute('role', 'alert');
    section.append(error);
    return;
  }

  const heading = createVenueElement('div', 'section-heading');
  heading.append(
    createVenueElement('p', 'eyebrow', 'LE GRAND JOUR'),
    createVenueElement('h2', '', 'Le lieu de notre union')
  );
  heading.lastElementChild.id = 'venue-title';

  const figure = createVenueElement('figure', 'venue-photo-figure');
  const image = createVenueElement('img', 'venue-photo');
  image.src = venue.image;
  image.alt = venue.imageAlt;
  const caption = createVenueElement('figcaption', 'venue-image-caption', venue.imageCaption);
  figure.append(image, caption);

  const details = createVenueElement('div', 'venue-details');
  details.append(
    createVenueElement('p', 'venue-name', venue.name),
    createVenueElement('p', 'venue-description', venue.description)
  );

  const address = createVenueElement('address');
  venue.address.forEach((line, index) => {
    if (index > 0) address.append(document.createElement('br'));
    address.append(document.createTextNode(line));
  });

  const facts = createVenueElement('div', 'event-facts');
  [
    { label: 'DATE', value: venue.date },
    { label: 'CÉRÉMONIE', value: venue.ceremony }
  ].forEach((fact) => {
    const item = createVenueElement('div');
    item.append(
      createVenueElement('span', 'fact-label', fact.label),
      createVenueElement('span', '', fact.value)
    );
    facts.append(item);
  });

  const mapLink = createVenueElement('a', 'text-link', 'Voir l’emplacement ');
  mapLink.href = venue.mapUrl;
  mapLink.target = '_blank';
  mapLink.rel = 'noopener noreferrer';
  const arrow = createVenueElement('span', '', '↗');
  arrow.setAttribute('aria-hidden', 'true');
  mapLink.append(arrow);

  details.append(address, facts, mapLink);
  section.replaceChildren(heading, figure, details);
});

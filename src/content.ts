export const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}.png`;

export const teas = [
  {
    name: 'Berrylicious',
    image: 'berrylicious',
    colour: '#f5e1e4',
    description: 'Pink packaging, berry illustrations and handwritten lettering.',
    width: 338,
    height: 116,
  },
  {
    name: 'Mint Study',
    image: 'mint-study',
    colour: '#e1edf0',
    description: 'Pale blue packaging with illustrated mint leaves.',
    width: 306,
    height: 106,
  },
  {
    name: 'Lemon Myrtle',
    image: 'lemon-myrtle',
    colour: '#f6f1d2',
    description: 'Soft yellow packaging with lemon and botanical illustrations.',
    width: 286,
    height: 136,
  },
];

export type Page = 'home' | 'packaging' | 'events';
export const pages: { id: Page; name: string; href: string }[] = [
  { id: 'home', name: 'Home', href: './' },
  { id: 'packaging', name: 'Packaging', href: './packaging.html' },
  { id: 'events', name: 'Events', href: './events.html' },
];

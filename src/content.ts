export const asset = (name: string) =>
  `${import.meta.env.BASE_URL}images/${name}.png`;

export const teas = [
  {
    id: "berry",
    name: "Berrylicious",
    colour: "#f4dce1",
    description:
      "The pink one, with berry illustrations and our handwritten lettering.",
    flavour: "Berry-inspired",
    offset: 0,
    cropWidth: 646,
  },
  {
    id: "mint",
    name: "Mint Study",
    colour: "#dfeced",
    description: "The blue one, wrapped in illustrated mint leaves.",
    flavour: "Mint-inspired",
    offset: 646,
    cropWidth: 620,
  },
  {
    id: "lemon",
    name: "Lemon Myrtle",
    colour: "#f5efcc",
    description: "The yellow one, with lemon and botanical illustrations.",
    flavour: "Lemon myrtle",
    offset: 1266,
    cropWidth: 658,
  },
];
export type Tea = (typeof teas)[number];
// Proposed AUD pack prices from the supplied marketing report, not live offers.
export const packs = [
  { id: "starter", name: "Starter pack", sachets: 5, cents: 500 },
  { id: "standard", name: "Standard pack", sachets: 20, cents: 1995 },
];
export type Pack = (typeof packs)[number];
export const money = (cents: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(
    cents / 100,
  );

export type Page = "home" | "about" | "products" | "cart" | "events" | "team";
export const pages: { id: Page; name: string; href: string }[] = [
  { id: "home", name: "Home", href: "./" },
  { id: "about", name: "About", href: "./about.html" },
  { id: "products", name: "Our Products", href: "./products.html" },
  { id: "events", name: "Events", href: "./events.html" },
  { id: "team", name: "Join Our Team", href: "./join-our-team.html" },
];
export function getPage(): Page {
  const file = window.location.pathname.split("/").pop();
  if (file === "cart.html") return "cart";
  if (file === "packaging.html") return "products";
  return pages.find((p) => p.href === `./${file}`)?.id || "home";
}

export type Product = {
  id: string;
  name: string;
  colour: string;
  label: string;
  description: string;
  image: string;
  note: string;
};
export const products: Product[] = [
  {
    id: "berry",
    name: "Berrylicious",
    colour: "#f2d5d9",
    label: "A little berry daydream",
    description:
      "For the berry lovers. A playful pink pick for a pause between pages.",
    image: "berrylicious",
    note: "Berry-inspired flavour",
  },
  {
    id: "mint",
    name: "Mint Study",
    colour: "#d8e9ec",
    label: "Turn over a fresh leaf",
    description:
      "A mint-inspired companion for your desk, your notebook and your next chapter.",
    image: "mint-study",
    note: "Mint-inspired flavour",
  },
  {
    id: "lemon",
    name: "Lemon Myrtle",
    colour: "#f4edb9",
    label: "A little pocket of sunshine",
    description:
      "A lemon myrtle pick for those who like their tea ritual on the bright side.",
    image: "lemon-myrtle",
    note: "Lemon myrtle flavour",
  },
];
// Editable preference rules. Answers add one point to a flavour; ties use product order.
export const questions = [
  {
    title: "What flavour catches your eye?",
    answers: [
      {
        text: "Something berry-inspired",
        detail: "A little fruity, a little playful",
        product: "berry",
      },
      {
        text: "A minty moment",
        detail: "A fresh leaf kind of feeling",
        product: "mint",
      },
      {
        text: "A citrus-inspired sip",
        detail: "Give me the sunny option",
        product: "lemon",
      },
    ],
  },
  {
    title: "Where does your tea break take you?",
    answers: [
      {
        text: "A catch-up between classes",
        detail: "A small pause with good company",
        product: "berry",
      },
      {
        text: "My favourite library corner",
        detail: "A notebook and a moment to myself",
        product: "mint",
      },
      {
        text: "Outside, under the trees",
        detail: "A change of scenery",
        product: "lemon",
      },
    ],
  },
  {
    title: "Pick a little everyday ritual.",
    answers: [
      {
        text: "Sharing something lovely",
        detail: "Tea tastes better with a friend",
        product: "berry",
      },
      {
        text: "Starting a fresh page",
        detail: "Make a little space in the day",
        product: "mint",
      },
      {
        text: "Taking the scenic route",
        detail: "There’s time to enjoy the little things",
        product: "lemon",
      },
    ],
  },
];

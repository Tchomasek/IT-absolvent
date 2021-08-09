import cat1 from "./cats/cat1.jpg";
import cat2 from "./cats/cat2.jpg";
import cat3 from "./cats/cat3.jpg";
import cat4 from "./cats/cat4.jpg";
import cat5 from "./cats/cat5.jpg";
import cat6 from "./cats/cat6.jpg";
import cat7 from "./cats/cat7.jpg";
import cat8 from "./cats/cat8.jpg";

const getCardsArray = () => {
  return [
    { value: 1, turned: false, cat: cat1 },
    { value: 2, turned: false, cat: cat2 },
    { value: 3, turned: false, cat: cat3 },
    { value: 4, turned: false, cat: cat4 },
    { value: 5, turned: false, cat: cat5 },
    { value: 6, turned: false, cat: cat6 },
    { value: 7, turned: false, cat: cat7 },
    { value: 8, turned: false, cat: cat8 },
  ];
};
export const doubledArray = [...getCardsArray(), ...getCardsArray()];

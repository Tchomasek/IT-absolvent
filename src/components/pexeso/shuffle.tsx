// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

//: { value: number; turned: boolean; cat: string }[][]
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export { shuffle };

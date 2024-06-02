"use strict";
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;
  const booking = {
    flightNum,
    numPassengers: 3,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

//createBooking("LH123", 2);
const flight = "LH23";
const valeriia = {
  name: "Valeriia Hrytsenko",
  passport: 24739479284,
};
const checkeIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Ms." + passenger.name;
  //if (passenger.passport === 24739479284) {
  // alert("Check in");
  //} else alert("Wrong passort");
};

checkeIn(flight, valeriia);
//console.log(flight);
//console.log(valeriia);

const newPassport = function (person) {
  person.passport = Math.trunc(random() * 1000000000);
};

//newPassport(valeriia);
//checkeIn(flight, passenger);
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//hiher-order functions
const transformer = function (str, fn) {
  console.log(`Original string:${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

//transformer("Java Script is the best", upperFirstWord);
//transformer("JavaScript is the best", oneWord);

const high5 = function () {
  console.log("👌");
};
//document.body.addEventListener("click", high5);

//["Jonas", "Martha", "Adama"].forEach(high5);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterhey = greet("Hey");
greeterhey("Jonas");

greet("Hello")("Jonas");

const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  //book function()
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
  },
};

lufthansa.book(239, "Valeriia");
lufthansa.book(635, "John");
console.log(lufthansa);
const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};
const book = lufthansa.book;
//doesn't work

//book(23, "Joe");
book.call(eurowings, 23, "Jahn");

book.call(lufthansa, 239, "May");

const swiss = {
  airline: "SwissAir",
  iataCode: 289,
  bookings: [],
};
book.call(swiss, 289, "Çoop");
const flightData = [583, "Georde"];
book.apply(swiss, flightData);

//bind method
const bookEw = book.bind(eurowings);
const bookLX = book.bind(swiss);
const bookLH = book.bind(lufthansa);
bookEw(23, "Steven");

const bookEw23 = book.bind(eurowings, 23);
bookEw23("Jonas");

//with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
//lufthansa.buyPlane();
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
//addVAT = value => value+ value *0.23 the same
console.log(addVAT(23));

//
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };
// const greeterhey = greet("Hey");
// greeterhey("Jonas");

// greet("Hello")("Jonas");

// const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);
function tax(rate) {
  return function example(value) {
    return value + value * rate;
  };
}
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3:  C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    console.log(answer);
    typeof answer === "number" &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, "string");

// poll.displayResults = function (type) {
//   if (typeof type === "string") {
//     console.log(`poll results are ${poll.answers}`);
//   } else {
//     console.log(poll.answers);
//   }
// };

const runOnce = function () {
  console.log("This is runOnce function");
};

// (function () {
//   console.log("This is runOnce function");
// })();

//(() => console.log("This is runOnce function"))();
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker);

//example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
//re-assigning f function
h();
f();
console.dir(f);

//example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are boarding now all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.body.addEventListener("click", function () {
    header.style.color = "blue";
  });
})();

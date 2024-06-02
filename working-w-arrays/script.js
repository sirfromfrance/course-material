"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = ` 
    <div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__value">${mov}</div>
 </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outMoney = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(outMoney)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //  console.log(arr);
      return int >= 1;
    })
    .reduce((acc, cur) => acc + cur);
  labelSumInterest.textContent = `${interest}€`;
};

// stw
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserName(accounts);

const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);

  //display balance
  calcPrintBalance(acc);
  //display sumary
  calcDisplaySummary(acc);
};
//event handlers
let currentAcc;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAcc = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAcc);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    //display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAcc.owner.split(" ")[0]
    } `;
    containerApp.style.opacity = 100;
    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    //update UI
    updateUI(currentAcc);
  }
});
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAcc.balance >= amount &&
    receiverAcc?.username !== currentAcc.username
  ) {
    //doing the transfer
    currentAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAcc);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAcc.movements.some((mov) => mov >= amount * 0.1)) {
    //add movement
    currentAcc.movements.push(amount);
    updateUI(currentAcc);
    inputLoanAmount.value = "";
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("ok");

  if (
    inputCloseUsername.value === currentAcc.username &&
    Number(inputClosePin.value) === currentAcc.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAcc.username
    );
    console.log(index);
    //delete the page
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = "";
  }
});

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAcc.movements, !sorted);
  sorted = !sorted;
});
//console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
let arr = ["a", "b", "c", "d", "e"];
//slice
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice(-1));
// console.log(arr.slice());

// //splice
// //console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);
// console.log(arr);

//reverse
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
// console.log(arr2.reverse());

// //concat
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// //join
// console.log(letters.join("-"));

//add method
// const arrAdd = [23, 11, 64];
// console.log(arrAdd[0]);
// console.log(arrAdd.at(0));

// //getting the last element
// console.log(arrAdd[arrAdd.length - 1]);
// console.log(arrAdd.slice(-1)[0]);
// console.log(arrAdd.at(-1));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else console.log(`You deposited ${Math.abs(movement)}`);
// }

// console.log(`---------------------------------------------`);
// //foreach
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   } else console.log(`Movement ${index + 1}: You deposited ${Math.abs(movement)}`);
// });

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

//map
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR"]);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}:`);
// });
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

function checkDogs(dogsJulia, dogsKate) {
  const onlyDog = dogsJulia;
  onlyDog.splice(-2);
  onlyDog.shift();
  const bothArr = onlyDog.concat(dogsKate);
  console.log(bothArr);
  bothArr.forEach(function (el, i, arr) {
    if (el >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${el} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
}
//checkDogs(dogsJulia, dogsKate);

const eurToUsd = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
// console.log(movements);
// console.log(movementsUSD);

const movementUSDFor = [];
for (const mov of movements) {
  movementUSDFor.push(mov * eurToUsd);
}
//console.log(movementUSDFor);

const movementsArr = movements.map((mov) => mov * eurToUsd);
//console.log(movementsArr);

const movementDescr = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);
//console.log(movementDescr);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

//console.log(deposits);
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
//console.log(depositsFor);

const withdrawals = movements.filter(function (negMov) {
  return negMov < 0;
});
//console.log(withdrawals);

const arrExample = movements.filter((mov) => mov < 0);
//console.log(arrExample);
//accumulator is like a snowball
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration number ${i}:${acc}`);
//   return acc + cur;
// }, 0);
//console.log(balance);

let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
//console.log(balance2);

const balance = movements.reduce((acc, curr) => acc + curr, 0);
//console.log(balance);

//maximum value of the movements arr
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
//console.log(max);

const testData = [5, 2, 4, 1, 15, 8, 3];

function calcAverageHumanAge(ages) {
  const humanAge = ages.map(function (age, i) {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
    }
  });
  console.log(humanAge);
  const adults = humanAge.filter((age) => age >= 18);
  console.log(adults);
  const averageAge = adults.reduce(function (acc, cur, i, arr) {
    return acc + cur / arr.length;
  }, 0);
  console.log(averageAge);
}

const arrCalc = testData
  .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
  .filter((age) => age >= 18)
  .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//console.log(arrCalc);
//calcAverageHumanAge(testData);
const totalUSD = movements
  .filter((mov) => mov > 0)
  .map(function (mov, i, arr) {
    //console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, cur) => acc + cur, 0);
//console.log(totalUSD);
const firstWithdrawal = movements.find((mov) => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);

// for (const acc of accounts) {
//   acc.owner === "Jessica Davis" && console.log(acc);

const anyDeposits = movements.some((mov) => mov > 0);
// console.log(anyDeposits);

// console.log(account4.movements.every((mov) => mov > 0));

//separate callback
const deposit = (mov) => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.filter(deposit));

const arrF = [
  [1, 2, 3],
  [4, 5, 6],
  [6, 7, 8],
];
console.log(arrF.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map((acc) => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalance);

const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(overallBalance);

//flatMap
const overallBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
//console.log(overallBalance2);

const owners = ["Jonas", "Zack", "Adam"];
console.log(owners.sort());

//numbers
console.log(movements);

//return <0, a,b
// > 0 b,a
//ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

movements.sort((a, b) => a - b);
//console.log(movements);
//descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
//console.log(movements);

const x = new Array(7);
console.log(x);

//console.log(x.fill(2));
console.log(x.fill(1, 3));

const arrFill = [1, 2, 3, 4, 5, 6, 7];
arrFill.fill(23, 2, 6);
console.log(arrFill);

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 1 }, (cur, i) => i + 1);

const random = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);

//console.log(random);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI);
});

const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);

// console.log(bankDepositSum);

//2 count how many deposits have been in the bank with at least 1000 dollars
const numDeposits1000 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov >= 1000).length;

//using reduce
const numDepositsReduce = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// console.log(numDeposits1000);
// console.log(numDepositsReduce);

// let a = 10;
// console.log(++a);
// console.log(a);

//3 create a new object which contains the sum of the deposits and of the withdrawals
const { depositsExample, withdrawalsExample } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0
      //   ? (sums.depositsExample += cur)
      //   : (sums.withdrawalsExample += cur);
      sums[cur > 0 ? "depositsExample" : "withdrawalsExample"] += cur;
      return sums;
    },
    { depositsExample: 0, withdrawalsExample: 0 }
  );
//console.log(depositsExample, withdrawalsExample);

//recreate one of the exercise to use only reduce method
//1 method recreation

const bankDepositReduce = accounts
  .reduce((acc, cur) => acc.concat(cur.movements), [])
  .reduce((acc, cur) => (cur > 0 ? acc + cur : acc), 0);

//console.log(bankDepositReduce);

//2 method recreation

//2 count how many deposits have been in the bank with at least 1000 dollars
// const numDeposits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000).length;
const numDeposits1000Reduce = accounts
  .reduce((acc, cur) => acc.concat(cur.movements), [])
  .reduce((acc, cur) => (cur >= 1000 ? acc + 1 : acc), 0);

//console.log(numDeposits1000Reduce);

//any string to title case This Is a Nice Title

const convertString = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const exceptions = ["a", "an", "the", "but", "or", "on", "in", "with", "and"];
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");
  return capitalize(titleCase);
};

// console.log(convertString("this is a long title"));
// console.log(convertString("this is a LONG title but not too long"));
// console.log(convertString("and here is another title with an EXAMPLE"));

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach((dogs) => (dogs.recommendedFood = dogs.weight ** 0.75 * 28));
console.log(dogs);

//2
const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(dogSarah.recommendedFood);
console.log();
const rec1 = dogSarah.recommendedFood * 0.9;
const rec2 = dogSarah.recommendedFood * 1.1;

const check =
  dogSarah.recommendedFood > rec1 && dogSarah.recommendedFood < rec2
    ? "This is ok"
    : "This is not ok";

console.log(check);

console.log(rec1, rec2);

const ownerEatTooMuch = dogs
  .filter((arr) => arr.curFood > arr.recommendedFood)
  .map((arr) => arr.owners)
  .flat();

console.log(ownerEatTooMuch);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood)
  .flatMap((owner) => owner.owners);

console.log(ownersEatTooLittle);

const allOwner = ownerEatTooMuch.join(" and ");
console.log(`${allOwner}'s dogs eat too much!`);

console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

const anyDog = dogs.some((arr) => arr.curFood === arr.recommendedFood);
console.log(anyDog);

const normDog = dogs.some(
  (arr) =>
    arr.curFood > arr.recommendedFood * 0.9 &&
    arr.curFood < arr.recommendedFood * 1.1
);

const dogsEatNorm = dogs.filter(
  (arr) =>
    arr.curFood > arr.recommendedFood * 0.9 &&
    arr.curFood < arr.recommendedFood * 1.1
);

console.log(dogsEatNorm);

const shallowCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(shallowCopy);

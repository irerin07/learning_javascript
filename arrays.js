const arr = [1, 2, 3];
console.log(arr);

console.log(arr.concat([4, 5], 6));
console.log(arr.concat(4, [5, 6]));

const arr1 = ["a", "b", "c", "d", "e", "f"];
console.log(arr1.slice(3));
console.log();
console.log(arr1.slice(2, 7));
console.log();
console.log(arr1.slice(-1));
console.log(arr1.slice(-2));
console.log(arr1.slice(-3));
console.log(arr1.slice(-4));
console.log(arr1.slice(-5));
console.log(arr1.slice(-6));
console.log();
console.log(arr1.slice(0, -1));
console.log(arr1.slice(1, -1));
console.log(arr1.slice(2, -1));
console.log(arr1.slice(3, -1));
console.log(arr1.slice(4, -1));
console.log(arr1.slice(5, -1));
console.log();
console.log(arr1.slice(-1, -1));
console.log(arr1.slice(-2, -1));
console.log(arr1.slice(-3, -1));
console.log(arr1.slice(-4, -1));
console.log(arr1.slice(-5, -1));
console.log(arr1.slice(-6, -1));

// const cart = [
//   { name: "Widget", price: 9.95 },
//   { name: "Gadget", price: 22.95 }
// ];
// const names = cart.map(x => x.name);
// const prices = cart.map(x => x.price);
// const discountPrice = prices.map(x => x * 0.8);
// console.log();
// console.log(names);
// console.log(prices);
// console.log(discountPrice);
/*
map은 배열 요소를 변형한다.
일정한 형식의 배열을 다른 형식으로 바꿔야 한다면 map을 사용한다.
map은 사본을 반환하며 원래 배열은 바뀌지 않는다.
*/

const items = ["Widget", "Gadget"];
const prices = [9.95, 22.95];
const cart = items.map((x, i) => ({ name: x, price: prices[i] }));
console.log(cart);
/*
콜백 함수는 각 요소에서 호출될 떄 요소 자체와 요소 인덱스, 배열 전체를 매개변수로 받는다.
위 예제에서는 따로 저장된 배열을 객체로 결합한다.
요소 자체(x)만을 사용하지 않고 인덱스(i)역시 사용한다.
인덱스를 쓴 까닭은 items의 요소와 prices의 요소를 인덱스에 따라 결합하기 위해서이다.
map은 다른 배열에서 정보를 가져와서 문자열로 이루어진 배열을 객체 배열로 변형했다.
객체를 괄호로 감싼 이유는 이렇게 하지 않으면 화살표 표기법에서 객체 리터럴의 중괄호를 블록으로 판단하기 때문.
*/

/*
filter는 배열에서 필요한 것들만 남길 목적으로 사용한다.
filter역시 사본을 반환하며 새 배열에는 필요한 요소만 남는다.
어떤 요소를 남길지는 함수를 넘겨 정한다.
*/
//카드 덱을 만든다.
const cards = [];
for (let suit of ["H", "C", "D", "S"]) {
  for (let value = 1; value <= 13; value++) {
    cards.push({ suit, value });
  }
}
const a = cards.filter(c => c.value === 2); //value가 2인 카드

const b = cards.filter(c => c.suit === "D"); //다이아몬드

const c = cards.filter(c => c.value > 10); // 킹 퀸 주니어

const d = cards.filter(c => c.value > 10 && c.suit === "H"); //하트의 킹 퀸 주니어

console.log(a);
console.log(b);
console.log(c);
console.log(d);

/*
map과 filter를 결합할 수 있다.
예를들어 앞에서 만든 카드 덱을 짧은 문자열로 표현하고 싶다면 카드 그림에는 유니코드 코드 포인트를 쓰고 에이스와 킹 퀸 주니어는 숫자대신 각각 A K Q J를 쓴다고 하자.
*/

function cardToString(c) {
  const suits = { H: "\u2665", C: "\u2663", D: "\u2666", S: "\u2660" };
  const values = { 1: "A", 11: "J", 12: "Q", 13: "K" };
  //cardToString을 호출할 때마다 매번 값을 만드는 건 그리 효율적이지 않다.
  for (let i = 2; i < 10; i++) {
    values[i] = i;
  }
  return values[c.value] + suits[c.suit];
}

cards.filter(c => c.value === 2).map(cardToString);
cards.filter(c => c.value > 10 && c.suit === "H").map(cardToString);

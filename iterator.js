/*
이터레이터, 제너레이터
제너레이터는 이터레이터에 의존하는 개념

이터레이터는 지금 어디 있는지 파악할 수 있도록 돕는 일종의 책갈피와 비슷한 개념.

*/
const book = [
  "Twinkle, twinkle, little bat!",
  "How I wonder what you are at!",
  "Up above the world you fly,",
  "Like a tea tray in the sky.",
  "Twinkle, twinkle, little bat!",
  "How I wonder what you are at!"
];
//book배열에 values 메서드를 사용하여 이터레이터를 만들 수 있다.
const it = book.values();

/*
next() 메서드를 사용하면 현재 보이는 페이지 value와 마지막 페이지를 읽으면 true로 바뀌는 done 프로퍼티가 있다.
*/
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

/*
1. next에서 책의 마지막 페이지를 반환해도 끝난것은 아니다. 더 진행할 것이 없다면 value는 undefined를 반환하지만 next는 계속 호출이 가능하다.

배열의 요소를 나열하는 것이 목적이라면 for루프나 for...of 루프를 사용한다.
iterator와 while을 사용한 for...of루프 흉내
*/
let current = it.next();
while (!current.done) {
  console.log(current.value);
  current = it.next();
}
/*
이터레이터는 모두 독립적이므로 이터레이터를 만들 때마다 처음에서 시작한다.
각각 다른 요소를 가리키는 이터레이터 여러 개를 동시에 사용할 수도 있다.
*/
const it1 = book.values();
const it2 = book.values();

console.log(it1.next());
console.log(it1.next());

console.log(it2.next());
console.log(it1.next());

/*
이터레이터 프로토콜은 모든 객체를 이터러블iterable객체로 바꿀 수 있다.
*/
// class Log {
//   constructor() {
//     this.messages = [];
//   }
//   add(message) {
//     this.messages.push({ message, timestamp: Date.now() });
//   }
// }
/*
기록한 로그 항목들을 iterate하고 싶다면 이터레이션 프로토콜을 사용한다.
클래스에 Symbol.iterator가 있고
이 메서드가 이터레이터처럼 동작하는 객체, value와 done프로퍼티가 있는 객체를 반환하는 next메서드를 가진 객체를 반환한다면
그 클래스의 인서턴스는 이터러블 객체라는 뜻이다.
*/
class Log {
  constructor() {
    this.messages = [];
  }
  add(message) {
    this.messages.push({ message, timestamp: Date.now() });
  }
  [Symbol.iterator]() {
    return this.messages.values();
  }
}

const log = new Log();
log.add("first day at sea");
log.add("spotted whale");
log.add("spotted another vessel");

for (let entry of log) {
  console.log(`${entry.message} @ ${entry.timestamp}`);
}
/*
다음과 같이 이터레이터를 직접 구현해도 된다.

[Symbol.iterator]() {
  let i = 0;
  const messages = this.messages;
  return {
    next() {
      if(i >= messages.length){
        return { value: undefined, done: true };
      }
      return { value: messages[i++], done: false };
    }
  }
}
*/

/*
피보나치 수열은 무한하고 언제까지 계산해야 할지 프로그램은 알 수 없기에 이터레이터를 사용하기에 알맞다.
아래의 예제 코드는 done: true를 반환하지 않는다.
*/
class FibonacciSequence {
  [Symbol.iterator]() {
    let a = 0,
      b = 1;
    return {
      next() {
        let rval = { value: b, done: false };
        b += a;
        a = rval.value;
        return rval;
      }
    };
  }
}

const fib = new FibonacciSequence();
let i = 0;
for (let n of fib) {
  console.log(n);
  if (++i > 9) break;
}

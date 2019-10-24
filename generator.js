/*
제너레이터generator란 이터레이터를 사용해 자신의 실행을 제어하는 함수.
일반적으로 함수는 매개변수를 받고 값을 반환하지만 
호출자는 매개변수를 넘기는 것 외에는 함수의 실행을 제어할 방법이 없다.
즉 함수를 호출하면 함수가 종료될 때까지 제어권을 완전히 넘기는 것이다

제너레이터에선 그렇지 않다.

제너레이터는 함수의 실행을 개별적 단계로 나눔으로써 함수의 실행을 제어한다.
제너레이터는 실행 중인 함수와 통신할 수 있다.
제너레이터는 언제든 호출자에게 제어권을 넘길 수 있다.
제너레이터는 호출한 즉시 실행이 되지 않는다. 대신 이터레이터를 반환하고 이터레이터의 next메서드를 호출함에 따라 실행된다.
*/
function* rainbow() {
  yield "red";
  yield "orange";
  yield "yellow";
  yield "green";
  yield "blue";
  yield "indigo";
  yield "purple";
}

const it = rainbow();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

for (color of rainbow()) {
  console.log(color);
}

/*
제너레이터와 호출자 사이의 양방향 통신.
yield 표현식을 통해 이뤄진다.
표현식은 값으로 평가되고 yield는 표현식이므로 반드시 어떤 값으로 평가된다.
yield 표현식의 값은 호출자가 제너레이터의 이터레이터에서 next를 호출할 때 제공하는 매개변수이다.
*/
function* interrogate() {
  const name = yield "What is your name";
  const color = yield "your favorite color?";
  return `${name}'s favorite color is: ${color}`;
}
const it2 = interrogate();
console.log(it2.next());
console.log(it2.next("Mike"));
console.log(it2.next("Black"));
/*
제너레이터는 화살표 표기법을 사용할 수 없다.

yield문은 설령 제너레이터의 마지막 문이더라도 제너레이터를 끝내지 않는다.
제너레이터에서 return문을 사용하면 그 위치와 관계없이 done은 true가 되고 value 프로퍼티는 return 값이 반환된다.
*/

function* abc() {
  yield "a";
  yield "b";
  return "c";
}

const it3 = abc();
console.log(it3.next());
console.log(it3.next());
console.log(it3.next());

/*
제너레이터에서 done이 true이면 value 프로퍼티에 주의를 기울이지 않는다.
다음과 같은 코드에서는 c는 출력되지 않는다.
제너레이터에서 중요한 값을 return으로 반환하려 하지 말아야하고 return은 중간에 종료하는 목적으로만 사용하도록 하자
*/
for (let i of abc()) {
  console.log(i);
}

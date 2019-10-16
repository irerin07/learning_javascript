/*
Scope는 변수와 상수, 매개변수가 언제 어디서 정의되는지 결정한다.
*/
function f(x) {
  return x + 3;
}
console.log(f(5));
// console.log(x);
/*
함수 바디를 벗어나면 x는 존재하지 않는것처럼 보인다.
즉 우리는 x의 스코프가 함수 f라고 말한다.
**스코프를 범위라고 이해하면 편하다.**

변수의 스코프가 어떤 함수라고 말할 때는 함수를 실제 호출할 때까지는 함수 바디의 정해진 매개변수가 존재하지 않음을 기억해야한다.
함수는 여러 번 호출할 수 있고, 함수를 호출할 때마다 매개변수가 나타나고, 함수가 제어권을 반환하면 스코프 밖으로 사라진다.
변수와 상수는 만들기 전에는 존재하지 않으며 let 혹은 const로 선언하기 전에는 스코프 안에 존재하지 않는다.
*/

/*
스코프는 프로그램의 현재 실행 중인 부분, 실행 컨텍스트에서 현재 보이고 접근 가능한 식별자들을 말한다.
존재한다는 말은 그 식별자가 메모리가 할당된 무언가를 가리키고 있다는 뜻이다.
*/

function f1() {
  console.log("one");
}
function f2() {
  console.log("two");
}
f2();
f1();
f2();

/*
자바스크립트의 스코프를 정적이다. -> 소스 코드만 봐도 변수가 스코프에 있는지 판단할 수 있다는 뜻. 
하지만 즉시 스코프를 분명히 알 수 있다는 뜻은 아니다.

정적 스코프 => 어떤 변수가 함수 스코프 안에 있는지 함수를 정의할 떄 알 수 있다는 뜻이며 호출할 떄 알 수 있는것은 아니다.
*/

const x = 3;

function f3() {
  console.log(x);
  //   console.log(y);
}
{
  //new scope
  const y = 5; //새로운 스코프 안에 있는 변수 y는 f3가 정의될 때 접근이 불가능하다.
  f3();
}
/*
The variable x exists when we define the function f, but y doesn’t. 
변수 x는 우리가 함수 f를 정의할 때 존재하지만 변수 y는 그렇지 않습니다.
Then we declare y and call f, and see that x is in scope inside the body of f when it’s called, but y isn’t.
그 이후 우리는 변수 y를 선언하고 함수 f를 호출합니다. 그럼 변수 x는 함수f가 호출되었을때 함수바디의 스코프 안에 들어있지만 변수 y는 그렇지 않습니다.
This is an example of lexical scoping: the function f has access to the identifiers that were available when it was defined, not when it was called.
이것이 lexical scoping의 예입니다: 함수 f는 자신이 정의될 때 접근이 가능했던 식별자에는 문제 없이 접근이 가능하지만, 자신이 호출될 때 접근이 가능한 식별자에는 접근할 수 없습니다.
*/

let x1 = 10;
function func1() {
  let x1 = 7;
  func2();
}
function func2() {
  console.log(x1);
}
func1();

/*
전역 스코프 - 프로그램을 시작할 떄 암시적으로 주어지는 스코프
전역 스코프에서 선언한 것이 무엇이든, 프로그램의 모든 스코프에서 볼 수 있다.
전역 스코프에서 선언된 것들을 전역 변수라고 한다.
전역 스코프에 의존하는것을 피해야한다.
*/
let name = "Irena";
let age = 25;

function greet() {
  name = "Kris";
  console.log(`Hello, ${name}. You were born in ${getBirthYear()}`);
}
function getBirthYear() {
  age = 50;
  return new Date().getFullYear() - age;
}

greet();
name = "Charles";
age = 98;
greet();
/*
위 코드의 문제점은 어떤 함수든, 프로그램 어디에서든 상관없이 name과 age값을 바꿀 수 있다는 점이다.
*/

let user = {
  name: "Irene",
  age: 25
};
function greet1() {
  console.log(`Hello, ${user.name}. You were born in ${getBirthYear()}`);
}
function getBirthYear1() {
  return new Date().getFullYear() - user.age;
}
greet1();

let user1 = {
  name: "Thomas",
  age: 43
};
function greet2(user1) {
  console.log(`Hello, ${user1.name}. You were born in ${getBirthYear()}`);
}
function getBirthYear2(user1) {
  return new Date().getFullYear() - user1.age;
}
greet2(user1);

console.log("before block");
{
  console.log("inside block");
  const x2 = 3;
  console.log(x2);
}
// console.log(x2); // x2 is not defined
/*
let과 const는 식별자를 블록 스코프에서 선언한다다.
블록은 문을 중괄호로 묶은 것이며 블록 스코프는 그 블록의 영역에서만 보이는 식별자를 의미한다.
*/

{
  //block 1
  const x3 = "blue";
  console.log(x3); //blue;
}
console.log(typeof x3); //x는 스코프 밖에 있으므로 undefined
{
  //block 2
  const x3 = 3;
  console.log(x3); // 3
}
console.log(typeof x3); //는 스코프 밖에 있으므로 undefined
// 위 예제의 x는 다른 스코프에 있는, 이름만 같은 두 개의 변수임을 나타낸다.

{
  //외부블록
  let x4 = "blue";
  console.log(x4); //blue
  {
    //내부블록
    let x4 = 3;
    console.log(x4); // 3
  }
  console.log(x4); //blue
}
console.log(typeof x4); //x가 스코프 밖에 있으므로 undefined.
/*
변수숨김 예제
내부 블록의 x4는 외부 블록에서 정의한 x4와는 이름만 같은 뿐 다른 변수이다.
그러므로 외부 스코프의 x4를 숨기는 효과가 있다.
중요한 점은, 실행 흐름이 내부 블록에 들어가 새 변수 x4를 정의하는 순간, 두 변수가 모두 스코프 안에 있다는 것.
변수의 이름이 같으므로 외부 스코프에 있는 변수에 접근할 방법이 없다.
*/

{
  //외부블록
  let x5 = {
    color: "blue"
  };
  let y5 = x5;
  let z5 = 3;
  {
    //내부블록
    let x5 = 5;
    console.log(x5); // 5
    console.log(y5.color); // blue => y5가 가리키고 외부 스코프의 x5가 가리키는 객체는 스코프 안에 있다.
    y5.color = "red";
    console.log(z5); //3
  }
  console.log(x5.color); //"red" 객체가 내부에서 수정되었다.
  console.log(y5.color); //"red" x5와 y5는 같은 객체를 가리킨다.
  console.log(z5); // 3
}
//스코프의 계층적인 성격 때문에 어떤 변수가 스코프에 있는지 확인하는 스코프-체인 이란 개념이 생겼다.
//현재 스코프 체인에 있는 모든 변수는 스코프에 있는 것이며, 숨겨지지 않았다면 접근할 수 있다.

/*
지금까지는 블록으로만 스코프를 설명했기 때문에 정적 스코프를 파악하기 쉬웠다.
불록을 들여 쓰면 정적 스코프를 파악하기 더 쉬워진다.
다만 함수는 여기서 정의하고 저기서 호출하는 식으로 사용하기 때문에 스코프를 제대로 이해하려면 더 고민해야한다.

모든 함수를 전역에서 정의하고 함수 안에서 전역 스코프를 참조하지 않도록 신경쓰는 프로그램에서는 함수가 어떤 스코프에 접근할 수 있는지 생각할 필요도 없다.
다만 최신 자바스크립트에서는 함수가 필요한 곳에서 즉석으로 정의하는 경우가 많다.
그렇기에 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 경우가 많다.
이런것을 보통 클로저closure라고 부른다.
스코프를 함수 주변으로 좁히는 것이라고 생각하면 된다.
*/
let globalFunc; //정의되지 않은 전역 함수
{
  let blockVar = "a";
  globalFunc = function() {
    console.log(blockVar);
  };
}
globalFunc();
/*
globalFunc는 블록 안에서 값을 할당 받았다.
이 블록 스코프와 그 부모인 전역 스코프가 클로저를 형성한다.
즉 globalFunc를 어디서 호출해도 이 함수는 클로저에 들어있는 식별자에 접근할 수 있다.
globalFunc를 호출하면 해당 함수는 스코프에서 빠져나왔음에도 불구하고 blockVar에 접근할 수 있다.
*/

let f4;
{
  let o = { note: "Safe" };
  f4 = function() {
    return o;
  };
}
let oRef = f4();
console.log(oRef);
oRef.note = "Not So safe after all";
console.log(oRef);
/*
스코프 내부에서 함수를 정의하면 해당 스코프는 더 오래 유지된다. 
또한 일반적으로 접근할 수 없는 것에 접근할 수도 있게 된다.
*/

/*
IEFF는 함수를 선언하고 즉시 실행한다.
IIFE의 장점은 내부에 있는것들이 모두 자신만의 스코프를 가지지만, IIFE 자체는 함수이므로 그 스코프 밖으로 무언가를 내보낼 수 있다는 것이다.
*/
const message = (function() {
  const secret = "Imma secret";
  return `The secret is ${secret.length} characters long`;
})();
console.log(message);
/*
변수 secret은 IIFE의 스코프 안에서 안전하게 보호되며 외부에서 접근할 수 없다.

*/

const f5 = (function() {
  let count = 0;
  return function() {
    return `I've been called ${++count} time(s).`;
  };
})();
for (let i = 0; i < 10; i++) {
  console.log(f5());
}
/*
변수 count는 IIFE안에 안전하게 보관되어 있으므로 손댈 방법이 없다.
*/

/*
let으로 변수를 선언하면, 그 변수는 선언하기 전에는 존재하지 않습니다.
var로 선언한 변수는 현재 스코프 안이라면 어디서든 사용할 수 있으며, 심지어 선언하기도 전에 사용할 수 있습니다.
선언되지 않은 변수 != undefined인 변수
*/

let var1;
let var2 = undefined;
var1;
var2;
// undefinedVar;

// x;
// let x = 3;
//let을 사용하면 변수를 선언하기 전 사용하려 할 떄 에러가 일어납니다.

x6;
var x6 = 3;
x6;
//var 로 선언한 변수는 호이스팅Hoisting이라는 메커니즘을 따릅니다.
//자바스크립트는 함수나 전역 스코프 전체를 살펴보고 var로 선언한 변수를 맨 위로 끌러올립니다.
//중요한 것은 선언만 끌어올려진다는 것이다 할당은 끌어올려지지 않습니다.
var x7;
x7;
x7 = 3;
x7;

// var x8 = 3;
// if (x8 === 3) {
//   var x8 = 2;
//   console.log(x8);
// }
// console.log(x8);
//자바 스크립트는 위의 코드를 아래처럼 해석한다.
//var를 이용해 변수를 선언하면 자바스크립트는 같은 변수를 여러 번 정의하더라도 무시한다.

var x8;
x8 = 3;
if (x8 === 3) {
  x8 = 2;
  console.log(x8);
}
console.log(x8);

f6();
function f6() {
  console.log("f6");
}
//변수에 할당한 함수 표현식은 끌어올려지지 않는다.
//f7(); //ReferenceError: f7 is not defined
let f7 = function() {
  console.log("f7");
};

if (typeof x9 === "undefined") {
  console.log("x9 does not exist or is undefined");
} else {
  console.log("good to go");
}
var x9 = 33; // x9 does not exist or is undefined

if (typeof x10 === "undefined") {
  console.log("x10 does not exist or is undefined");
} else {
  console.log("good to go");
}
//let x10 = 33; // ReferenceError: x10 is not defined

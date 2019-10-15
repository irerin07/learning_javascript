function f(x) {
  console.log(`f 내부: x = ${x}`);
  x = 5;
  console.log(`f 내부: x = ${x} ( 할당 후)`);
}

let x = 3;
console.log(`f 호출 전: x = ${x}`);
f(x);
console.log(`f를 호출한 다음: x = ${x}`);

/*
함수 내부에서 x에 값을 할당하더라도 함수 바깥의 변수 x에는 아무 영향도 없다는 것이다.
이름은 같지만, 둘은 다른 객체라는 것을 알 수 있다.
*/

function g(o) {
  o.message = `g 안에서 수정함 (이전 값: ${o.message})`;
}
let o = {
  message: "initial value"
};

console.log(`g를 호출하기 전: o.message = "${o.message}"`);
g(o);
console.log(`g를 호출한 다음: o.message = "${o.message}"`);
/*
함수 g 안에서 객체 o를 수정했고 수정 된 내용은 함수 바깥에서도 그대로 반영이 되어있다.
이것이 원시 값과 객체의 핵심적인 차이.
원시값은 불변이므로 수정할 수 없다.
원시 값을 담은 변수는 수정할 수 있지만(다른 값으로) 원시 값 그 자체는 바뀌지 않는다.

함수안의 o와 밖의 o는 서로 다른 객체이지만 둘은 같은 객체는 가리키고 있다.
*/

function h(p) {
  p.message = "h에서 수정함";
  p = {
    message: "새로운 객체 할당"
  };
  console.log(`h 내부: p.message="${p.message}" (할당후)`); ////2. h 내부: p.message="새로운 객체" (할당후)
}

let p = {
  message: "initial value"
};
console.log();
console.log(`h를 호출하기 전: p.message = "${p.message}"`); //1. h를 호출하기 전: p.message = "initial value"
h(p);
console.log(`h를 호출한 다음: p.message="${p.message}"`); //3. h를 호출한 다음: p.message="h에서 수정함"

/*
해당 코드의 핵심은 함수 내부의 매개변수 p와 함수 바깥의 변수 p가 다르다는 것이다.
h를 호출하면 둘은 같은 객체를 가리키지만, h 내부에서 p에 할당한 객체는 새로운 객체이다.
함수 바깥의 p는 여전히 원래 객체를 가리키고 있다.
*/
function i(q) {
  this.q = q;
  console.log(this.q);
  q.message = "h에서 수정함";
  console.log(this.q);
  q = {
    message: "새로운 객체 할당"
  };
  console.log(this.q);
  q.message = "new Message";
  console.log(this.q);
  q = {
    message: "another new message"
  };
  console.log(this.q);
  q.message = "and another new message";
  console.log(this.q);
  console.log(`i 내부: q.message="${q.message}" (할당후)`);
}

let q = {
  message: "initial value"
};
console.log();
console.log(`i를 호출하기 전: q.message = "${q.message}"`);
i(q);
console.log(`i를 호출한 다음: q.message="${q.message}"`);

function j(x) {
  return `in j: x = ${x}`;
}

console.log(j());
/*
자바스크립트에서는 매개변수가 함수를 결정하지 않는다.
정해진 매개변수에 값을 제공하지 않으면 암시적으로 undefuned가 할당된다.
*/

function getSentence({ subject, verb, object }) {
  return `${subject} ${verb} ${object}`;
}

const o1 = {
  subject: "I",
  verb: "love",
  object: "Javascript"
};

console.log(getSentence(o1));
//객체를 변수로 해체

function getSentence1([subject, verb, object]) {
  return `${subject} ${verb} ${object}`;
}

const arr = ["I", "Love", "Javascript"];
console.log(getSentence1(arr));
//배열을 변수로 해체

function addPrefix(prefix, ...words) {
  const prefixedWords = [];
  for (let i = 0; i < words.length; i++) {
    prefixedWords[i] = prefix + words[i];
  }
  return prefixedWords;
}
console.log(addPrefix("con", "verse", "vex"));
/*확산 연산자(...)를 써서 남는 매개변수를 이용한다
함수를 선언할 때 확산 연산자는 반드시 마지막 매개변수여야 한다. 
그렇지 않으면 전달된 값 중 어디까지를 확산 매개변수에 할당해야 하는지 판단할 수 없어서 에러가 난다.
*/

function f(a, b = "default", c = 3) {
  return `${a} - ${b} - ${c}`;
}

console.log(f(5, 6, 7));
console.log(f(5, 6));
console.log(f(5));
console.log(f());
/*
ES6에서는 매개변수에 default value를 지정하는 기능도 추가가 되었다.
일반적으로 매개변수에 값을 제공하지 않으면 undefined가 되지만 기본값을 지정할 수 있게 되었다.
*/

const o2 = {
  name: "Wallace", //원시값 프로퍼티
  bark: function() {
    //함수 프로퍼티(메서드)
    return "Woof";
  }
};

const o3 = {
  name: "Wallace",
  bark() {
    //ES6에서 추가된 간편하게 메서드를 추가할 수 있는 문법.
    return "Woof";
  }
};

const o4 = {
  name: "Wallace",
  speak() {
    return `My name is ${this.name}`;
  }
};
console.log(o4.speak());
/*
this의 값은 어떻게 선언했느냐가 아니라 어떻게 호출했느냐에 따라 달라진다는 것을 이해해야한다.
위의 예제에서 this가 o4에 묶인 이유는 o4에서 speak를 호출했기 때문이다.
*/
const speak = o4.speak;
console.log(speak === o4.speak); //true
console.log(speak()); // My name is undefined
/*
함수를 speak(); 와 같이 호출을 하게 되면 이 함수가 어디에 속하는지 알 수 없으므로 this는 undefuned에 묶인다.
*/

/*
const o5 = {
  name: "Julie",
  greetBackWards: function() {
    console.log(this.name);
    function getReverseName() {
      console.log(this.name);
      let nameBackWards = "";
      for (let i = this.name.length - 1; i >= 0; i--) {
        nameBackWards += this.name[i];
      }
      return nameBackWards;
    }
    return `${getReverseName()} si eman ym ,olleH`;
  }
};

console.log(o5.greetBackWards());
*/
/*
위 코드는 의도한대로 작동하지 않는다.
o.greetBackWards()를 호출하는 시점에서 자바스크립트는 this를 의도대로 o5에 연결하지만 ,greetBackWards안에서 getReverseName을 호출하면 this는 o5가 아닌 다른것에 묶인다.
이를 해결하기 위해 this를 다른 변수에 할당하는 것.
*/

const o6 = {
  name: "Julie",
  greetBackWards: function() {
    console.log(this.name);
    const self = this;
    function getReverseName() {
      console.log(self.name);
      let nameBackWards = "";
      for (let i = self.name.length - 1; i >= 0; i--) {
        nameBackWards += self.name[i];
      }
      return nameBackWards;
    }
    return `${getReverseName()} si eman ym ,olleH`;
  }
};
console.log(o6.greetBackWards());

// const g1 = function f1(stop) {
//   //함수 표현식을 사용해 그 결과를 변수에 할당한다.
//   if (stop) console.log("f1 stopped");
//   f1(true);
// };
// g1(false);
/*
함수 안에서 자신을 호출할 떄(재귀호출) 이런 방식이 필요할 수 있다.
함수 안에서는 f를 써서 자기 자신을 참조하고, 함수 바깥에서는 g를 써서 함수를 호출한다.
함수 선언이 표현식으로 사용되었다면 그건 함수 표현식이다.
*/

// const a = function() {
//   return "hello";
// };
// const a = () => "hello";

// const a2 = function(name) {
//   return `Hello, ${name}`;
// };
// const a2 = name => `Hello, ${name}!`;

// const a3 = function(a, b) {
//   return a + b;
// };
// const a3 = (a, b) => a + b;
/*
화살표 표기법은 function이라는 단어와 중괄호 숫자를 줄이려고 고안된 단축 문법.
1. function 생략 가능
2. 함수에 매개변수가 단 하나 뿐이라면 괄호 역시 생략 가능
3. 함수 바디가 표현식 하나라면 중괄호와 return문 역시 생략 가능

화살표 함수는 익명 함수를 만들어 다른 곳에 전달하려 할 떄 가장 유용하다.

화살표 함수에서는 this가 다른 변수와 마찬가지로 정적으로 묶인다.
화살표 함수를 사용하면 내부 함수 안에서 this를 사용할 수 있다.
*/
const o7 = {
  name: "Julie",
  greetBackWards: function() {
    const getReverseName = () => {
      let nameBackWards = "";
      for (let i = this.name.length - 1; i >= 0; i--) {
        nameBackWards += this.name[i];
      }
      return nameBackWards;
    };
    return `${getReverseName()} si eman ym ,olleH`;
  }
};
console.log(o7.greetBackWards());

/*
화살표 함수는 객체 생성자로 사용할 수 없다.
*/

const bruce = { name: "Bruce" };
const madeline = { name: "Madeline" };

// 이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용한다.
function greet() {
  return `Hello, I am ${this.name}`;
}

console.log();
console.log(greet());
console.log(greet.call(bruce));
console.log(greet.call(madeline));

/*
함수를 어디서, 어떻게 호출 했느냐와 관계없이 this가 무엇인지 지정할 수 있다.
call 메서드는 모든 함수에서 사용할 수 있고, this를 특정 값으로 지정할 수 있다.
*/

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}
update.call(bruce, 1949, "singer");
//bruce는 이제 {name: "Bruce", birthYear: 1949, occupation: "singer"}입니다.
update.call(madeline, 1942, "actress");
//madeline 이제 {name: "Madeline", birthYear: 1942, occupation: "actress"}입니다.

/*
함수를 호출하면서 call을 사용하고 this로 사용할 객체를 넘기면 해당 함수가 주어진 객체의 메서드인 것 처럼 사용할 수 있다.

call의 첫 번쨰 매개변수는 this로 사용할 값이고, 매개 변수가 더 있으면 그 매개변수는 호출하는 함수로 전달됩니다.
*/

update.apply(bruce, [1955, "actor"]);
//bruce는 이제 {name: "Bruce", birthYear: 1955, occupation: "actor"}입니다.
update.apply(madeline, [1918, "writer"]);
//madeline 이제 {name: "Madeline", birthYear: 1918, occupation: "writer"}입니다.

/*
apply는 함수 매개변수를 처리하는 방법을 제외하면 call과 완전히 같다.
apply는 매개변수를 '배열'로 받는다.
*/

const arr2 = [2, 3, -5, 15, 7];
Math.min.apply(null, arr);
Math.max.apply(null, arr);
/*
apply는 배열 요소를 함수 매개변수로 사용해야 할 떄 유용하다.
*/

const newBruce = [1940, "martial artist"];
update.call(bruce, ...newBruce); //apply(bruce, newBruce)와 같다.
Math.min(...arr);
Math.max(...arr);

const updateBruce = update.bind(bruce);
updateBruce(1904, "actor");
//bruce는 이제 {name: "Bruce", birthYear: 1904, occupation: "actor"}입니다.
updateBruce.call(madeline, 1274, "king");
//bruce는 이제 {name: "Bruce", birthYear: 1274, occupation: "king"}입니다.
//madeline은 변하지 않는다.

/*
bind를 사용하면 함수의 this값을 영구히 바꿀 수 있다.
update 메소드를 이리저리 호출할 때 this값은 항상 bruce가 되도록 고정된다.
이후 call, apply 혹은 다른 bind와 함께 호출하더라도 this값은 언제나 bruce가 된다.
*/

const updateBruce1949 = update.bind(bruce, 1949);
updateBruce1949("singer, songwriter");
/*
bruce가 태어난 해를 항상 1949로 고정하고 직업은 자유롭게 바꾸고 싶을떄 위와 같이 사용하면 된다.
*/

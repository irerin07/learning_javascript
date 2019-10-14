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
    message: "새로운 객체"
  };
  console.log(`h 내부: p.message="${p.message}" (할당후)`); ////2. h 내부: p.message="새로운 객체" (할당후)
}

let p = {
  message: "initial value"
};

console.log(`h를 호출하기 전: p.message = "${p.message}"`); //1. h를 호출하기 전: p.message = "initial value"
h(p);
console.log(`h를 호출한 다음: p.message="${p.message}"`); //3. h를 호출한 다음: p.message="h에서 수정함"

/*
해당 코드의 핵심은 함수 내부의 매개변수 p와 함수 바깥의 변수 p가 다르다는 것이다.
h를 호출하면 둘은 같은 객체를 가리키지만, h 내부에서 p에 할당한 객체는 새로운 객체이다.
함수 바깥의 p는 여전히 원래 객케를 가리키고 있다.
*/

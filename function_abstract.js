/*
서브루틴subroutine
복잡한 코드를 간단하게 만드는 기초적인 수단
반복되는 작업의 일부를 떼어내 이름을 붙이고 언제든 그 이름을 부르기만 하면 실행된다.
대개 어떤 알고리즘을 나타내는 형태이다.
*/
const year = new Date().getFullYear();
if (year % 4 !== 0) {
  console.log(`${year} is NOT a leap year`);
} else if (year % 100 != 0) {
  console.log(`${year} IS a leap year`);
} else if (year % 400 != 0) {
  console.log(`${year} is NOT a leap year`);
} else {
  console.log(`${year} IS a leap year`);
}
/*
프로그램 내부에서 위의 코드를 100번 실행해야 한다고 했을떄 이름 수정하는건 굉장히 힘든 일이다.
자바스크립트에서는 함수를 사용해 해결할 수 있다.
*/
function printLeapYearStatus() {
  const year1 = new Date().getFullYear();
  if (year1 % 4 !== 0) {
    console.log(`${year1} is NOT a leap year`);
  } else if (year1 % 100 != 0) {
    console.log(`${year1} IS a leap year`);
  } else if (year1 % 400 != 0) {
    console.log(`${year1} is NOT a leap year`);
  } else {
    console.log(`${year1} IS a leap year`);
  }
}

/*
함수의 이름을 정하는 것도 매우 중요하다.
함수의 이름만 봐도 다른사람이 대략적으로라도 이해할 수 있는 이름을 짓는것이 좋다.
*/

/*
값을 반환하는 서브루틴
*/

function isCurrentYearLeapYear() {
  const year2 = new Date().getFullYear();
  if (year2 % 4 !== 0) {
    return false;
  } else if (year2 % 100 != 0) {
    return true;
  } else if (year2 % 400 != 0) {
    return false;
  } else {
    return true;
  }
}

const daysInMonth = [
  31,
  isCurrentYearLeapYear() ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
if (isCurrentYearLeapYear()) {
  console.log("it is a leap year");
} else {
  console.log("it is not leap year");
}

/*
함수 -> 입력이 들어가면 결과가 나오는 관계
순수한 함수 -> 입력이 같으면 결과도 항상 같다. 그리고 부수 효과가 없다.
*/
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"];
let colorIndex = -1;
function getNextRainbowColor() {
  if (++colorIndex >= colors.length) {
    colorIndex = 0;
  }
  return colors[colorIndex];
}
console.log(getNextRainbowColor());
/*
위의 예제는 변수colorIndex가 getNextRainbowColor함수에 속하지 않는데도 함수를 호출하면 변수가 바뀌는 부수효과가 있다.
*/

function isCurrentYearLeapYear(year3) {
  if (year3 % 4 !== 0) {
    return false;
  } else if (year3 % 100 != 0) {
    return true;
  } else if (year3 % 400 != 0) {
    return false;
  } else {
    return true;
  }
}

const getNextRainbowColor1 = (function() {
  const colors1 = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple"
  ];
  let colorIndex1 = -1;
  return function() {
    if (++colorIndex1 >= colors1.length) {
      colorIndex1 = 0;
    }
    return colors1[colorIndex1];
  };
})();

setInterval(function() {
  document.querySelector(".rainbow").style[
    "background-color"
  ] = getNextRainbowColor1();
}, 5000);
/*
위의 코드는 클래스가 rainbow인 HTML요소의 샐을 계속 바꾼다.
다만 프로그램의 다른 부분에서 getRainbowColor()를 호출한다면 이 코드 역시 영향을 받는 문제가 있다.
*/

function getRainbowIterator() {
  const colors2 = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple"
  ];
  let colorIndex2 = -1;
  return {
    next() {
      if (++colors2 >= colors2.length) {
        colorIndex2 = 0;
      }
      return { value: colors[colorIndex2], done: false };
    }
  };
}

/*
이제 getRainbowIterator는 순수한 함수이다.
항상 같은 이터레이터를 반환하며 외부에 아무런 영향도 주지 않는다.
*/

const rainbowIterator = getRainbowIterator();
setInterval(function() {
  document.querySelector(".rainbow").style[
    "background-color"
  ] = rainbowIterator.next().value;
}, 500);
/*
next()메서드는 매번 다른 값을 반환할테니 문제를 뒤로 미루었을 뿐이 아니냐 할 수 있다.
틀린 말은 아니지만 next()는 함수가 아닌 메서드이다.
메서드는 자신이 속한 객체라는 컨텍스트 안에서 동작하므로 메서드의 동작은 그 객체에 의해 좌주된다.
프로그램의 다른 부분에서 getRainbowIterator를 호출하더라도 독립적인 이터레이터가 생성되므로 다른 이터레이터를 간섭하지 않는다.
*/

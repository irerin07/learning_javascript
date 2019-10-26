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

function printLeapYearStatus() {
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
}

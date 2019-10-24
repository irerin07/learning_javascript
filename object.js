/*
객체는 프로퍼티를 가지며 각 프로퍼티에는 문자열이나 심볼 인덱스가 있습니다.
객체는 순서가 보장되지 않는다.

프로퍼티 -> 키(문자열 혹은 심볼)과 값으로 구성된다.
객체는 키를 통해 프로퍼티에 접근할 수 있다.
*/

const SYM = Symbol();
const o = { a: 1, b: 2, c: 3, [SYM]: 4, d: 5, e: 6 };
for (let prop in o) {
  if (!o.hasOwnProperty(prop)) {
    continue;
  }
  console.log(`${prop}: ${o[prop]}`);
}
console.log();
/*
Object.keys는 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환한다.
객체의 프로퍼티 키를 배열로 가져와야 할 때는  Obkect.keys가 편리하다.
*/
Object.keys(o).forEach(prop => console.log(`${prop}: ${o[prop]}`));

const o2 = { apple: 1, xochitl: 2, balloon: 3, guitar: 4, xylophone: 5 };
console.log();
Object.keys(o2)
  .filter(prop => prop.match(/^x/))
  .forEach(prop => console.log(`${prop}: ${o2[prop]}`));
/*
객체지향 프로그래밍
클래스 - 추상적이고 범용적인 것
인스턴스 - 구체적이고 한정적인 것
메소드 - 기능
클래스 메소드 - 클래스에 속하지만 인스턴스에 묶이지 않는 기능
*/
/*
클래스와 인스턴스 생성
*/
class Car {
  /*
this키워드는 메서드를 호출한 인스턴스를 가리키는 목적으로 쓰였다.
메서드를 호출하는 시점에서 this가 무엇인지 알 수 있께 된다.
이 생성자를 실행하면 인스턴스를 만들면서 자동차의 제조사와 모델을 지정할 수 있다.
*/
  constructor(maker, model) {
    this.maker = maker;
    this.model = model;
    this.userGears = ["P", "N", "R", "D"];
    this.userGear = this.userGears[0];
  }
  shift(gear) {
    if (this.userGears.indexOf(gear) < 0) {
      throw new Error(`Invalid gear: ${gear}`);
    }
    this.userGear = gear;
  }
}

const car1 = new Car("Tesla", "Model S");
//객체가 클래스의 인스턴스인지 확인하는 instanceof연산자
console.log(car1 instanceof Car);
car1.shift("D");
/*
car1.shift('D')를 호출하면 this는 car1에 묶인다.
*/
console.log(car1.userGear);

/*
Car 클래스에 shift 메서드를 사용하면 잘못된 기어를 선택하는 실수를 방지할 수 있을 것 같지만 완벽하게 보호되지는 않는다.
예를 들어 car1.userGear = 'X'; 라고 설정하면 막을 수가 없기 때문이다.
자바스크립트는 다른 객체지향 언어와 같이 메서드와 프로프티에 어느 수준까지 접근할 수 있는지에 대한 세밀한 설정을 지원하지 않는다.
Car클래스를 다음과 같이 변경하면 어느정도는 이런 외부에서의 변경을 막을 수 있다.
*/
class Car2 {
  constructor(maker, model) {
    this.maker = maker;
    this.model = model;
    this._userGears = ["P", "N", "R", "D"];
    this._userGear = this._userGears[0];
  }
  gerUserGear() {
    return this._userGear;
  }
  set userGear(value) {
    if (this._userGears.indexOf(value) < 0) {
      throw new Error(`'Invalid gear: ${value}`);
    }
    this._userGear = value;
  }
  shift(gear) {
    this.userGear = gear;
  }
}
const car2 = new Car2("Hyundai", "i3");
console.log(car2);
car2._userGear = "X";
//에러가 발생하지 않는다.
console.log(car2);

/*
여전히 car1._userGear = 'X'처럼 _userGear를 직접 바꿀 수 있지만 _를 사용하는 가짜 접근제한을 사용하여 이는 잘못된 접근이라는 것을 빨리 찾을 수 있게 하는 방편이다.
프로퍼티를 꼭 보호해야 한다면 스코프를 이용해 보호하는 WeakMap 인스턴스를 사용할 수 있다.
*/

const Car3 = (function() {
  const carProps = new WeakMap();
  class Car3 {
    constructor(maker, model) {
      this.maker = maker;
      this.model = model;
      this._userGears = ["P", "N", "R", "D"];
      carProps.set(this, { userGear: this._userGears[0] });
    }
    get userGear() {
      return carProps.get(this).userGear;
    }
    set userGear(value) {
      if (this._userGears.indexOf(value) < 0) {
        throw new Error(`Invalid gear: ${value}`);
      }
      carProps.get(this).userGear = value;
    }
    shift(gear) {
      this.userGear = gear;
    }
  }
  return Car3;
})();

const car3 = new Car3("Kia", "K5");
console.log(car3);

/*
프로토타입
클래스의 인스턴스에서 사용할 수 있는 메서드
Car의 인스턴스에서 사용 가능한 shift메서드는 프로토타입이다.
new키워드로 새 인스턴스를 만들었을 때 prototype 프로퍼티가 중요해진다.
new 키워드로 생성한 새로운 객체는 생성자의 prototype 프로퍼티에 접근할 수 있다.
객체 인스턴스는 생성자의 prototype 프로퍼티를 __proto__프로퍼티에 저장한다.
프로포타입에서는 동적 디스패치라는 메커니즘이 있다.
디스패치 -> 메서드 호출
객체의 프로퍼티나 메서드에 접근하려 할 떄 접근하려는 프로퍼티나 메서드가 없다면 자바스크립트는 객체의 프로토타입에서 해당 프로퍼티나 메서드를 찾는다.
클래스의 인스턴스는 모두 같은 프로토타입을 공유하기에, 프로토타입에 프로퍼티나 메서드가 있다면 해당 클래스의 인스턴스는 모두 그 프로퍼티나 메서드에 접근할 수 있다.
인스턴스에서 메서드나 프로퍼티는 정의하면 프로토타입에 있는 것을 가리는 효과가 있다.
자바스크립트는 먼저 인스턴스를 체크 후 원하는 메서드나 프로퍼티가 없다면 프로토타입을 체크하기 때문이다.
*/
const car4 = new Car3();
const car5 = new Car3();
console.log(car4.shift === Car3.prototype.shift);
car4.shift("D");
// car4.shift("d");
console.log(car4.userGear);
console.log(car4.shift === car5.shift);
car4.shift = function(gear) {
  this.useGear = gear.toUpperCase();
};
console.log(car4.shift === Car3.prototype.shift);
console.log(car4.shift === car5.shift);
car4.shift("d");
console.log(car4.userGear);
/*
car4객체에는 shift메서드가 없지만 car4.shift('D');를 호출하면 자바스크립트는 car4의 프로토타입에서 해당 이름의 메서드를 검색한다.
car4에 shift 메서드를 추가하면 car4의 인스턴스와 프로토타입에 같은 이름의 메서드가 존재하게 되고
car4.shift('D');를 호출하게 되면 car1의 메서드가 호출되고 프로토타입의 메서드는 호출하지 않는다.
*/

/*
정적 메서드(클래스 메서드)
정적 메서드는 특정 인스턴스에 적용되지 않는다.
정적 메서드에서 this는 클래스 자체에 묶이지만 this대신 클래스 이름을 쓰는것이 좋다.
클래스에 관련되지만 인스턴스와는 관련이 없는 범용적인 작업에 정적 메서드를 사용한다.
*/
class Car4 {
  toString() {
    return `${this.maker} ${this.model}: ${this.vin}`;
  }
  static getNextVin() {
    return Car4.nextVin++;
  }
  constructor(maker, model) {
    this.maker = maker;
    this.model = model;
    this.vin = Car4.getNextVin();
  }
  static areSimilar(car6, car7) {
    return car6.make === car7.make && car6.model === car7.model;
  }
  static areSame(car6, car7) {
    return car6.vin === car7.vin;
  }
}
Car4.nextVin = 0;

const car8 = new Car4("Audi", "R8");
const car9 = new Car4("BMW", "Z3");
const car10 = new Car4("BMW", "Z3");

console.log(car8.vin);
console.log(car9.vin);
console.log(car10.vin);

console.log(Car4.areSimilar(car8, car9));
console.log(Car4.areSimilar(car9, car10));

console.log(Car4.areSame(car9, car10));
console.log(Car4.areSame(car9, car9));

/*
상속
클래스의 인스턴스는 클래스의 기능을 모두 사용할 수 있다.
객체의 프로토타입에서 원하는 메서드를 찾지 못하면 자바스크립트는 프로토타입의 프토로타입을 검색한다. -> 프로토타입 체인
이런식으로 프로토타입을 계속 거슬러 올라가며, 조건에 맞는 프로토타입을 찾지 못하면 에러를 발생시킨다.
프로토타입 체인에서 가장 적절한 위치에 메서드를 정의하는것이 중요하다.
*/

class Vehicle {
  constructor() {
    this.passengers = [];
    console.log("Vehicle created");
  }
  addPassenger(p) {
    this.passengers.push(p);
  }
}

class Car5 extends Vehicle {
  constructor() {
    super();
    console.log("Car created");
  }
  deployAirbags() {
    console.log("BOOM!");
  }
}

/*
extends는 Car를 Vehicle의 서브 클래스로 만든다.
super()는 부모 클래스의 생성자를 호출하는 함수
*/

const v = new Vehicle();
v.addPassenger("Frank");
v.addPassenger("Judy");
console.log(v.passengers);
const c = new Car5();
c.addPassenger("Alice");
c.addPassenger("Cameron");
console.log(c.passengers);
// v.deployAirbags();
c.deployAirbags();
/*
c에서는 deployAirbag을 호출 할 수 있지만 v에서는 호출 할 수 없다.
이렇듯이 상속은 단방향이다.
*/

/*
다형성
여러 슈퍼클래스의 멤버인 인스턴스를 나타내는 말
*/
class Motorcycle extends Vehicle {}
const m = new Motorcycle();
console.log(c instanceof Car5);
console.log(c instanceof Vehicle);
console.log(m instanceof Car5);
console.log(m instanceof Motorcycle);
console.log(m instanceof Vehicle);

/*
객체의 프로퍼티를 나열할 떄 사용한 hasOwnProperty
객체 obj와 프로퍼티 x에서, obj.hasOwnProperty(x)는 obj에 프로퍼티 x가 있다면 true를 반환한다.
프로퍼티 x가 obj에 정의되지 않았거나, 프로토타입 체인에만 정의되었다면 false를 반환한다.
ES6 클래스를 설계 의도대로 사용하려면 데이터 프로퍼티는 항상 인스턴스에 정의해야 한다.
*/
class Super {
  constructor() {
    this.name = "Super";
    this.isSuper = true;
  }
}
Super.prototype.sneaky = "not recommended";

class Sub extends Super {
  constructor() {
    super();
    this.name = "Sub";
    this.isSub = true;
  }
}
const obj = new Sub();

for (let p in obj) {
  console.log(
    `${p} : ${obj[p]}` + (obj.hasOwnProperty(p) ? "" : " (inherited)")
  );
}
/*
name, isSuper, isSub 프로퍼티는 모두 인스턴스에 정의되었다.
반면 sneaky 프로퍼티는 부모클래스의 프로토타입에 직접 정의되었다.
Object.keys를 사용하면 프로토타입 체인에 정의된 프로퍼티를 나열하는 문제를 피할 수 있다.
*/
console.log(car8.toString());
console.log(car9.toString());

/*
다중상속, 믹스인, 인터페이스
클래스가 부모 클래스 두개를 가지는 기능
자바스크립트가 다중 상속이 필요한 문제에 대한 해답으로 내놓은 개념이 믹스인(Mixin)
믹스인 -> 기능을 필요한 만큼 섞어 놓은 것
*/
// class InsurancePolicy {}
// function makeInsurable(o) {
//   o.addInsurancePolicy = function(p) {
//     console.log(p);
//     this.InsurancePolicy = p;
//   };
//   o.getInsurancePolicy = function() {
//     return this.insurancePolicy;
//   };
//   o.isInsured = function() {
//     return !!this.insurancePolicy;
//   };
// }

// const car11 = new Car4();
// makeInsurable(car11);
// car11.addInsurancePolicy(new InsurancePolicy());
// console.log(car11.getInsurancePolicy());
// console.log(car11.isInsured());
/*
위의 방법은 모든 자동차에서 makeInsurable을 호출해야한다.
Car4의 생성자에 추가할 수도 있지만 그렇게 하면 이 기능을 모든 자동차에 복사하는 꼴이 된다.
*/
// makeInsurable(Car4.prototype);
// const car12 = new Car4();
// car12.addInsurancePolicy(new InsurancePolicy());
// console.log(car12.getInsurancePolicy());
// console.log(car12.isInsured());
/*
이제 보험 관련 메서드들은 모두 Car클래스에 정의된 것 처럼 동작한다.

보험 회사에서 매우 범용적인 메소드 이름을 사용해서 우연히 Car클래스의 메서드와 충돌할지도 모른다.
이런 경우 Symbol로 해결할 수 있다.
*/

class InsurancePolicy {}
const ADD_POLICY = Symbol();
const GET_POLICY = Symbol();
const IS_INSURED = Symbol();
const _POLICY = Symbol();
function makeInsurable(o) {
  o[ADD_POLICY] = function(p) {
    console.log("p: " + p);
    this[_POLICY] = p;
  };
  o[GET_POLICY] = function() {
    return this[_POLICY];
  };
  o[IS_INSURED] = function() {
    return !!this[_POLICY];
  };
}
/*
심볼은 항상 고유하므로 믹스인이 Car클래스의 기능과 충돌할 가능성은 없다.
혹은 메서드 이름에는 일반적인 문자열을 쓰고 데이터 프로퍼티에는 _POLICY같은 심볼을 쓰는 절충안을 생각할 수도 있다.
*/
makeInsurable(Car.prototype);
const car12 = new Car4();
car12[ADD_POLICY];

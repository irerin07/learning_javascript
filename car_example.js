// const Car = (function() {
//   const carProps = new WeakMap();
//   class Car {
//     constructor(make, model) {
//       this.make = make;
//       this.model = model;
//       this._userGears = ["P", "N", "R", "D"];
//       carProps.set(this, { userGear: this._userGears[0] });
//     }
//     get userGear() {
//       return carProps.get(this).userGear;
//     }
//     set userGear(value) {
//       if (this._userGears.indexOf(value) < 0)
//         throw new Error(`Invalid gear: ${value}`);
//       carProps.get(this).userGear = value;
//     }
//     shift(gear) {
//       this.userGear = gear;
//     }
//   }
//   return Car;
// })();

// const car1 = new Car("Toyota", "Prius");
// console.log(car1);
// console.log(car1.userGear);

const Car = (function() {
  const carProps = new WeakMap();
  class Car {
    constructor(make, model) {
      this.make = make;
      this.model = model;
      this._userGears = ["P", "N", "R", "D"];
      carProps.set(this, { userGear: this._userGears[0] });
    }
    shift(gear) {
      this.userGear = gear;
    }
  }
  return Car;
})();

const car = new Car("foo", "bar");
// at this point, at this level of scope,
// there is no way for a user of "car" or "Car" to reference carProps
console.log(car.userGear);

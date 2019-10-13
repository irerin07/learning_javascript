class Test {
  // create private map
  constructor(_name) {
    // 외부로 공개되고 싶지 않은 private data
    this.__private__ = new WeakMap();
    this.privates.name = _name; // 이름을 받음
  }

  get privates() {
    if (this.__private__.has(this) === false) {
      this.__private__.set(this, {});
    }
    return this.__private__.get(this);
  }

  // 객체의 weakmap으로부터 데이터를 받아옵니다.
  // getter 특성으로 인해, 리턴된 값에 데이터를 직접 대입해 수정할 수 없습니다.
  get name() {
    return this.privates.name;
  }
}

const a = new Test("Harry");
a.name = "John"; // 대입했지만 getter로 반환된 값에 대입되지 않음
console.log(a.name); // Harry

var MyPromise = require('./promise')

describe("Promise", () => {
  it("invokes the callback", () => {
    var value = 0;
    var promise = new MyPromise(function() {
      value = 1;
    });
    expect(value).toEqual(1);
  });

  it("calls .then after the callback is completed", done => {
    var promise = new MyPromise(function(resolve) {
      console.log("this is the CALLBACK");
      setTimeout(function() {
        console.log("setTimeout complete!!!");
        resolve(2);
      }, 1000);
    });

    promise
      .then(function(anything) {
        console.log(".THEN?", anything);
        expect(anything).toEqual(2);
        done();
      });
  });

  it("calls .then after .then after the callback is completed", done => {
    var promise = new MyPromise(function (resolve) {
      console.log("this is the CALLBACK");
      setTimeout(function () {
        console.log("setTimeout complete!!!");
        resolve(2);
      }, 1000);
    });

    promise
      .then(function (anything) {
        console.log(".THEN?", anything);
        expect(anything).toEqual(2);
        return 'bob';
      })
      .then(function(second) {
        expect(second).toEqual('bob');
        done();
      });
  });
});

/*
callback gets execute immediately
.then
.then.then can be chained
.catch
.catch.catch can be chained
*/


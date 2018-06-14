/*
console.log('Create promise...');
var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log('setTimeout complete!!!')
    resolve();
  }, 1000);
});
console.log('promise.then');
promise
.then(function () {
  console.log('after setTimeout 1');
})
.then(function () {
  console.log('after setTimeout 2');
});
*/
/*

console.log('1');
new Promise(() => {
console.log('2');
})
console.log('3');
*/

module.exports = function MyPromise(callback) {
  var thenArray = [];
  function then(thenCallback) {
    thenArray.push(thenCallback);
    //console.log("then callback", thenCallback);
    //return thenCallback(/*value*/);
    return this;
  }

  function resolve(value) {
    console.log("resolve called");
    
    while(thenArray.length > 0) {
      var currentThen = thenArray.shift();
      value = currentThen(value);
    }
    return value;
  }

  callback(resolve);

  return {
    then: then
  };
}


var createNamespace = require('cls-hooked').createNamespace;
 
var writer = createNamespace('writer');
writer.run(function () {
  writer.set('value', 0);
 
  requestHandler();
});
 
function requestHandler() {
  writer.run(function(outer) {
    // writer.get('value') returns 0
    // outer.value is 0
    console.log("outer.value ==>", outer.value)

    writer.set('value', 1);
    // writer.get('value') returns 1
    // outer.value is 1
    console.log("outer.value ==>", outer.value)

    process.nextTick(function() {
      // writer.get('value') returns 1
      // outer.value is 1

      writer.run(function(inner) {
        // writer.get('value') returns 1
        // outer.value is 1
        console.log("outer.value ==>", outer.value)
        // inner.value is 1
        console.log("inner.value ==>", inner.value)

        writer.set('value', 2);
        // writer.get('value') returns 2
        console.log("writer.value ==>", writer.get('value'))
        // outer.value is 1
        console.log("outer.value ==>", outer.value)
        // inner.value is 2
        console.log("inner.value ==>",inner.value)
        setTimeout(function() {
          // runs with the default context, because nested contexts have ended
          console.log("time out in the chain ==>",writer.get('value')); // prints 0
        }, 1500);
      });
    });
  });
 
  setTimeout(function() {
    // runs with the default context, because nested contexts have ended
    console.log(writer.get('value')); // prints 0
  }, 1000);
}


const arrowFunc = async () => {
  console.log("do stuff here")
}
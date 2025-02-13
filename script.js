// "use strict";
// Your JavaScript code will go here

// Example: Log a message when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Accordions;
  var accordionParent = document.getElementById("accordions");
  for (var i = 0; i < 5; i++) {
    var accordionDiv = document.createElement("div");
    accordionDiv.innerHTML = `Accordion-${i + 1}`;
    // const node = document.createTextNode(`Accordion-${i + 1}`);
    // accordionDiv.appendChild(node);
    accordionDiv.id = `Accordion-${i + 1}`;
    accordionParent.appendChild(accordionDiv);
  }
  accordionParent.addEventListener("click", (e) => {
    var clickedChild = document.getElementById(e.target.id);
    var allChildren = accordionParent.children;
    Array.from(allChildren).forEach((element) => {
      var child = document.getElementById(element.id);
      var grandchild = child.children;
      if (clickedChild.id === child.id) {
        if (grandchild.length === 0) {
          var newGrandchild = document.createElement("div");
          newGrandchild.innerHTML = `Accordain-content-${clickedChild.id}`;
          newGrandchild.addEventListener("click", (e) => {
            e.stopPropagation();
          });
          clickedChild.appendChild(newGrandchild);
        } else {
          child.removeChild(grandchild[0]);
        }
      } else {
        if (grandchild.length > 0) {
          child.removeChild(grandchild[0]);
        }
      }
    });
  });
  // Retries -- Debounce
  // async function retry(
  //   asyncFn,
  //   retries = 3,
  //   delay = 50,
  //   finalError = "Failed"
  // ) {
  //   if (retries === 0) {
  //     throw new Error(finalError);
  //   }
  //   return asyncFn()
  //     .then((res) => res)
  //     .catch(async (err) => {
  //       await new Promise((res) => setTimeout(res, delay));
  //       return retry(asyncFn, retries - 1, delay, finalError);
  //     });
  // }
  // // Example Usage:
  // const exampleAsyncFn = () => {
  //   // Simulate a random failure with a 50% chance
  //   const choose = Math.round(Math.random() * 10, 0);
  //   const pass = choose % 2 === 0;
  //   console.log("choose", choose, pass);
  //   return new Promise((res, reject) => {
  //     setTimeout(() => {
  //       pass ? res("Success") : reject("Error");
  //     }, 2000);
  //   });
  // };
  // retry(exampleAsyncFn, 3, 2000, "All retries failed")
  //   .then((result) => console.log("result", result))
  //   .catch((err) => console.error("Err", err.message));
  // const promise1 = new Promise((rej, res) => {
  //   setTimeout(() => {
  //     res("Promise 1");
  //   }, 1000);
  // });
  // const promise3 = new Promise((res, rej) => {
  //   setTimeout(() => res("Promise 3"), 1000);
  // });
  //// Promise race Polyfill
  // const promise1 = new Promise((resolve, reject) => {
  //   setTimeout(resolve, 4000, "one");
  // });
  // const promise2 = new Promise((resolve, reject) => {
  //   setTimeout(resolve, 3000, "two");
  // });
  // const promise3 = new Promise((resolve, reject) => {
  //   setTimeout(reject, 2000, "three");
  // });
  // const promises = [promise1, promise2, promise3];
  // myRaceAll(promises)
  //   .then((res) => {
  //     console.log("res", res);
  //   })
  //   .catch((err) => {
  //     console.log("err", err);
  //   });
  // async function myRaceAll(promises) {
  //   let resArr = [];
  //   return new Promise((resolve, reject) => {
  //     promises.forEach(async (element) => {
  //       try {
  //         const res = await element;
  //         resArr.push(res);
  //         if (resArr.length === 1) {
  //           return resolve(resArr[0]);
  //         }
  //       } catch (error) {
  //         resArr.push(error);
  //         if (resArr.length === 1) {
  //           return reject(resArr[0]);
  //         }
  //       }
  //     });
  //   });
  // }
  // const f1 = () => {
  //   console.log(this);
  // };
  // f1();
  // function f2() {
  //   console.log(this);
  // }
  // f2();
  // var f3 = function () {
  //   console.log(this);
  // };
  // f3();
});
var x = 3;
var char = "A";

var foo = {
  x: 1,
  foo: {
    x: 2,
    foo: function () {
      char = "B";
      return this.x;
    },
  },
};

var go = foo.foo.foo;
console.log(char, go(), foo.foo.foo());

console.log("Record 1"); // 1

setTimeout(() => {
  console.log("Record 2"); //4
  Promise.resolve().then(() => {
    setTimeout(() => {
      сonsole.log("Record 3"); //5
      Promise.resolve().then(() => {
        console.log("Record 4"); //6
      });
    });
  });
});

console.log("Record 5"); //2

Promise.resolve().then(() =>
  Promise.resolve().then(() => console.log("Record 6"))
); //3

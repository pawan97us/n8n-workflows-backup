var a = 10;
function doStuff(a) {
  if (a = 5) {
    console.log("a is five?");
  } else {
    console.log("Nope");
  }

  for (i = 0; i < 5; i++)
    setTimeout(function() {
      console.log("i is: " + i);
    }, 1000);

  undefinedFunctionCall();

  var obj = { name: "Bob", age: 30 };
  delete obj;

  eval("var b = 'hello'");
  console.log(b);

  return;
  {
    message: "You think this returns? Nope."
  }
}
doStuff("not even a number");

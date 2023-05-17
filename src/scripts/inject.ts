const temp = console.log;
console.log = (...args) => {
  var data = { type: "new-task", text: args.toString() };
  window.postMessage(data, "*");
  temp(...args);
};

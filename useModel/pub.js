var queue = {};
export var broadcast = function broadcast(name, state) {
  if (!queue[name]) return;
  queue[name].forEach(function (fn) {
    return fn(state);
  });
};
export var subScribe = function subScribe(name, cb) {
  if (!queue[name]) queue[name] = [];
  queue[name].push(cb);
};
export var unSubScribe = function unSubScribe(name, cb) {
  if (!queue[name]) return;
  var index = queue[name].indexOf(cb);
  if (index !== -1) queue[name].splice(index, 1);
};
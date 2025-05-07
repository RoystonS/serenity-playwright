const form = document.querySelector("form");
const field1 = form["field1"];
const field2 = form["field2"];

field1.addEventListener("input", function (event) {
  const value = event.target.value;
  field2.value = value;
});
field2.addEventListener("input", function (event) {
  const value = event.target.value;
  field1.value = value;
});

const op1 = form["op1"];
const op2 = form["op2"];
const opResult = form["opResult"];
function calculate() {
  const value1 = parseFloat(op1.value);
  const value2 = parseFloat(op2.value);
  const result = (isNaN(value1) ? 0 : value1) + (isNaN(value2) ? 0 : value2);
  opResult.value = result;
}
op1.addEventListener("input", calculate);
op2.addEventListener("input", calculate);

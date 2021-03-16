import { executeTests } from "./tests";

console.clear();

// STEP 0: An imperative, non functional approach:
function decimaltoRomanNumeral_IMPERATIVE(decimal) {
  let romanNumeral = "I".repeat(decimal);
  romanNumeral = romanNumeral.replaceAll("IIIII", "V");
  romanNumeral = romanNumeral.replaceAll("VV", "X");
  romanNumeral = romanNumeral.replaceAll("XXXXX", "L");
  // etc.
  return romanNumeral;
}

// STEP 1: Create the "replicate I character" and a curried replace functions

// This function returns a string with the given number of "I"s
function replicateIs(howMany) {
  return "I".repeat(howMany);
}

// This is a curried version of a string replaceAll function.
function replace(oldValue, newValue) {
  return function (inputStr) {
    return inputStr.replaceAll(oldValue, newValue);
  };
}

// STEP 2: Compose replace functions out of the curried replace function: partial application

const replace_IIIII_with_V = replace("IIIII", "V");
const replace_VV_with_X = replace("VV", "X");
const replace_XXXXX_with_L = replace("XXXXX", "L");
// etc.

// STEP 3: Create a "decimal to Roman numeral" function

function decimaltoRomanNumeral(decimal) {
  return replace_XXXXX_with_L(
    replace_VV_with_X(replace_IIIII_with_V(replicateIs(decimal)))
  );
}

// STEP 4: Let's do some testing :)
decimaltoRomanNumeral(2); // "II"
decimaltoRomanNumeral(5); // "V"
decimaltoRomanNumeral(6); // "VI"
// etc.

// STEP 5: Prevent nested function calls by composing:
const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);

// Note how we order the function calls from last to first, just like we did when nesting:
const decimaltoRomanNumeral_2 = compose(
  replace_XXXXX_with_L,
  replace_VV_with_X,
  replace_IIIII_with_V,
  replicateIs
);

// STEP 6: Instead of composing use piping, so we can order the function calls from first to last

// Piping in other languages would work like this:
// As soon as this is supported: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator
// return decimal
//   |> replicateIs
//   |> replace_IIIII_with_V
//   |> replace_VV_with_X
//   |> replace_XXXXX_with_L;

// But we can do this:
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
const decimaltoRomanNumeral_3 = pipe(
  replicateIs,
  replace_IIIII_with_V,
  replace_VV_with_X,
  replace_XXXXX_with_L
);

// ===================== TESTS ==========================

// These are the functions we want to test:
const systemsUnderTest = [
  decimaltoRomanNumeral_IMPERATIVE,
  decimaltoRomanNumeral_2,
  decimaltoRomanNumeral_3
];

executeTests(systemsUnderTest);

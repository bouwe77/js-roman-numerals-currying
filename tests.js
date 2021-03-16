const assert = require("assert");

export function executeTests(systemsUnderTest) {
  // Test cases: decimal number is the key, the Roman numberal is the value.
  const testCases = {
    0: "",
    1: "I",
    2: "II",
    3: "III",
    4: "IIII",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "VIIII",
    10: "X"
  };

  // Execute all test cases for all systems under test:
  systemsUnderTest.forEach((sut) => {
    Object.entries(testCases).forEach(([key, value]) => test(key, value, sut));
  });

  // This is a utility function to make the tests more readable:
  function test(decimalNumber, romanNumeral, sut) {
    let result = "✅ OK";
    try {
      assert.strictEqual(sut(decimalNumber), romanNumeral);
    } catch {
      result = "❌ NOK";
    }

    console.log(`${result} (${decimalNumber} === ${romanNumeral})`);
  }
}

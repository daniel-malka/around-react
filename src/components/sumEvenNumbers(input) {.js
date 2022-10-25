function sumEvenNumbers(input) {
  let res = 0;
  for (let num = 0; num < input.length; num++) {
    if (input[num] % 2 === 0) {
      res += input[num];
    }
  }

  return res;
}
console.log(sumEvenNumbers([10, 12, 15, 2, 11, 13, 9, 5, 8, 10]));

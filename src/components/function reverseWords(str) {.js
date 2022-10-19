const highAndLow = (numbers, split = numbers.split(" ")) =>
  Math.max(...split) + " " + Math.min(...split);

function reverseWords(str) {
  return str.split(" ").reverse().join();

}

reverseWords('goal your reach to ways of lot a are there'); // "there are a lot of ways to reach your goal"
reverseWords('out them try should you'); // "you should try them out"

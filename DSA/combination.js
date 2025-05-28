function combination(arrays, output, combination_length) {
  var temp = [];
  for (var i = 0; i <= (arrays.length - 1); i++) {
    if(temp.length === 0 && arrays.length >= 2  && arrays[i] < arrays[i+1]) 
      temp.push(arrays[i]);
    else if (temp.length > 0 && temp[0] < arrays[i]) 
      temp.push(arrays[i]);
    if (combination_length === temp.length) {
      output.push(temp)
      return combination(
        arrays,
        output,
        combination_length
      );
    }
  }
  if (combination_length < 2) return output;
  else return combination(arrays, output, (combination_length - 1));
}


console.log(combination([2,5,4],[],3));
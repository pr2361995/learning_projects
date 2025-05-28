const persnalDetails = [
  { name: "Alice", hobbies: ["Reading", "Swimming", "Hiking"] },
  { name: "Bob", hobbies: ["Gaming", "Reading", "Hiking", "Cooking"] },
  { name: "Charlie", hobbies: ["Swimming", "Cycling"] }
];

var final = [];
for(let i = 0 ; i < persnalDetails.length ; i++){
  persnalDetails[i].hobbies.forEach(hob => {
    if(!final.find(hob)) 
      final.push(hob)
  })
}

console.log("Unique hobbies : ",final)

// output ------ ["Reading", "Hiking", "Gaming", "Cooking", "Swimming", "Cycling"]
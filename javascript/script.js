

// **** task 1 *********
// let f = 67;
// function ab (jk) {
//   var gh = 99; 
//   var rt = function trail (){
//     console.log(gh)
//     return function final() {
//       console.log(f);
//       console.log(jk);
//     }
//   }
//   return rt;
// }

// var asd = ab(f)

// asd()

// **** task 2 **********

//   function x1 (){
//     var rt = function (i) {
//       console.log(i);
//     };
//     for(var i =0;i<=5;i++){
//       setTimeout(rt(i),i*1000);
//     }
//   }
//   x1 ();


// function x2 (){
//   for(let i =0;i<=5;i++){
//       setTimeout(function () {
//         console.log(x);
//       },x*1000);
//   }
// }
// x2 ();

// function x (){
//   for(var i =0;i<=5;i++){
//     function close(x) {
//       setTimeout(function () {
//         console.log(x);
//       },x*1000);
//     }
//     close(i);
//   }
// }
// x ();
// task 3 

function attachEventListeners(){
  let count = 0;
  window.onload=function(){
    var elem = document.getElementById("clickme");
    if (elem !== null)
      elem.addEventListener("click",function as(){
        console.log("buton clicked",++count);
      },true);
  }
}

attachEventListeners();
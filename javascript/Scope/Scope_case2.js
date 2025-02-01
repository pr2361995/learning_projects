/*
  js try to access nearby varaible name, let block scope varaiable can redeclare using var, change something inside function happen that particular block_scoper it is affect the local varaible not block scoper
*/

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
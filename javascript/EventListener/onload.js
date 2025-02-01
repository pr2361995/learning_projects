/*

before loaing the page (element not founded) await unitil load the page

*/ 

function attachEventListeners(){
    let count = 0;
    window.onload = function(){
      console.log("entered")
      var elem = document.getElementById("clickme");
      if (elem !== null)
        elem.addEventListener("click",function as(){
          console.log("buton clicked",++count);
        },true);
    };
  }
  
attachEventListeners();
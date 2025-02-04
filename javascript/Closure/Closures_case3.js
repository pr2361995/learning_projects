function closures(){
    for(var i = 1 ; i < 4 ; i++){
        function close(x){
            debugger;
            setTimeout(function () {
                debugger;
                console.log(" setTimeOut : ", x)
            },x * 1000)
        }
        close(i);
    }
}
closures();

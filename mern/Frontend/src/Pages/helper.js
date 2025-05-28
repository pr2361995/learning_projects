
const baseurl = "http://localhost:8001"

function validation(name,value){
    switch(name){
        case "empId": 
            if (value == "")
                return "*Please enter a value";
            else if(!(value >= 100000 && value <= 3000000))
              return "*Employee ID is expected between 100000 and 3000000";
            else
                return null;
        case "empName" : 
            var regex = /^[a-zA-Z ]*$/;
            if (value === "" )
                return "*Please enter a value";
            else if(regex.test(value) === false)
                return "Employee name can have only alphabets and spaces";
            else if(value.length < 3)
                return "Employee Name should have atleast 3 letters";
            else 
                return null;
        case "experience" :
            if(value == "")
                return "*Please enter a value";
            else if(value <= 0)
                return "Experience should have greater then 0";
            else 
                return null;
        default         :
            return null;
    }
}

module.exports = { validation, baseurl }
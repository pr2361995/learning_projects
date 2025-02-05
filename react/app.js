// const header = React.createElement("div"
//     ,   {id: "parent"}
//     ,   React.createElement("div"
//         ,   {id:"child"}
//         ,   [ 
//                 React.createElement("h1",   {},   "Hello World")
//             ,    React.createElement("h1",   {},   "Good Morning")
//             ]
//         ));
const header = (
    <div id="parent">
        <div id="child">
            <h1>Hello world</h1>
            <h1>Good Morning</h1>
        </div>
    </div>
) 
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(header)
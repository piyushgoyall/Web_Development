import React, { useEffect, useState } from 'react'

export default function Component1() {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [operation, setOperation] = useState("+");
    const [result, setResult] = useState(null);

    useEffect(() => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);

        if (isNaN(a) || isNaN(b)) {
            setResult("Enter valid numbers");
            return;
        }

        let res;
        switch (operation) {
            case "+":
                res = a + b;
                break;
            case "-":
                res = a - b;
                break;
            case "*":
                res = a * b;
                break;
            case "/":
                res = a / b;
                break;
            default:
                res = "";
        }
        setResult(res);
    })

  return (
      <div style={{textAlign:'center', marginTop:"50px"}}>
          <h2>Simple Calculator</h2>
          <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)}></input>
          <select value={operation} onChange={(e)=>setOperation(e.target.value)}>
              <option >+</option>
              <option >-</option>
              <option >*</option>
              <option >/</option>
          </select>

          <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)}></input>

          <div style={{marginTop:"20px"}}>
              <strong>Result:</strong>{result}
          </div>
    </div>
  )
}


// import React, { useState, useEffect } from "react";

// export default function Component1() {
//   const [count, setCount] = useState(0);
//   const [bonus, setBonus] = useState(0);
//   console.log("State Change");

//   useEffect(() => {
//     console.log("useEffect");
//     document.title = `Button Clicked ${count} times`;
//   }, [bonus]);

//   return (
//     <div>
//       <h1>Count {count} </h1>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <h1>Bouns {bonus} </h1>
//       <button onClick={() => setBonus(bonus + 1)}>+1</button>
//       {console.log("Render")}
//     </div>
//   );
// }

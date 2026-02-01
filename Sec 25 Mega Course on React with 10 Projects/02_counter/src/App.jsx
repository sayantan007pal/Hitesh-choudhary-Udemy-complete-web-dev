import { useState } from "react"

function App() {

  const [counter, setCounter] = useState(15)
  
  const addValue = () => {
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
  }
  const removeValue = () => {
    setCounter(counter - 1)
    setCounter(counter - 1)
    setCounter(counter - 1)
    setCounter(counter - 1)
  }
  return (
    <>
    <h1>React course with Hitesh {counter}</h1>
    <h2>Counter Value: {counter}</h2>
    <button onClick={addValue}>Add Value</button> {" "}
    <button onClick={removeValue}>Remove Value</button>
    <p>Footer: {counter}</p>
    </>
  )
}

export default App

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    📚 INTERVIEW PREP NOTES - React State                     ║
╠══════════════════════════════════════════════════════════════════════════════╣

🔴 MY MISTAKE:
─────────────
I wrote: setCounter((prevCounter) => { prevCounter + 1 })
                                    ↑                   ↑
                                 Problem: Curly braces WITHOUT return!

When using {} in arrow functions, you MUST use 'return'.
Without return, the function returns 'undefined', breaking the state update.

✅ Correct ways:
   • Implicit return:  (prev) => prev + 1        (no curly braces)
   • Explicit return:  (prev) => { return prev + 1 }


═══════════════════════════════════════════════════════════════════════════════
                         🎯 CONCEPT 1: STATE BATCHING
═══════════════════════════════════════════════════════════════════════════════

Q: What is React State Batching?
A: React groups (batches) multiple setState calls into a SINGLE re-render for
   performance optimization.

Example (removeValue function):
┌─────────────────────────────────────────────────────────────────────────────┐
│  setCounter(counter - 1)  // counter = 15, sets to 14                       │
│  setCounter(counter - 1)  // counter = 15 (SAME!), sets to 14               │
│  setCounter(counter - 1)  // counter = 15 (SAME!), sets to 14               │
│  setCounter(counter - 1)  // counter = 15 (SAME!), sets to 14               │
│                                                                             │
│  Result: Only decrements by 1 (not 4!)                                      │
│  Why? All calls use the SAME stale 'counter' value (closure)                │
└─────────────────────────────────────────────────────────────────────────────┘

Interview Follow-up: "When does batching happen?"
- React 17: Only in React event handlers
- React 18+: Automatic batching in ALL cases (promises, setTimeout, native events)


═══════════════════════════════════════════════════════════════════════════════
                    🎯 CONCEPT 2: FUNCTIONAL UPDATES (Callbacks)
═══════════════════════════════════════════════════════════════════════════════

Q: How to get the LATEST state when calling setState multiple times?
A: Use the functional form: setState(prevState => newState)

Example (addValue function):
┌─────────────────────────────────────────────────────────────────────────────┐
│  setCounter(prev => prev + 1)  // prev = 15 → sets to 16                    │
│  setCounter(prev => prev + 1)  // prev = 16 → sets to 17                    │
│  setCounter(prev => prev + 1)  // prev = 17 → sets to 18                    │
│  setCounter(prev => prev + 1)  // prev = 18 → sets to 19                    │
│  setCounter(prev => prev + 1)  // prev = 19 → sets to 20                    │
│                                                                             │
│  Result: Increments by 5! ✅                                                │
│  Why? Each callback receives the LATEST pending state                       │
└─────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
                         📋 COMMON INTERVIEW QUESTIONS
═══════════════════════════════════════════════════════════════════════════════

Q1: "What will be the output?"
    const [count, setCount] = useState(0);
    const handleClick = () => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    }
    
    A: count will be 1 (not 3) due to batching and stale closure.

───────────────────────────────────────────────────────────────────────────────

Q2: "How to fix the above to get count = 3?"
    A: Use functional updates:
       setCount(prev => prev + 1);
       setCount(prev => prev + 1);
       setCount(prev => prev + 1);

───────────────────────────────────────────────────────────────────────────────

Q3: "Why does React batch state updates?"
    A: Performance optimization - avoids unnecessary re-renders.
       Multiple setState calls → Single re-render → Better performance.

───────────────────────────────────────────────────────────────────────────────

Q4: "When should you use functional updates?"
    A: When the new state depends on the previous state, especially:
       - Multiple updates in same function
       - Updates in async callbacks (setTimeout, fetch, etc.)
       - When you need guaranteed latest state

───────────────────────────────────────────────────────────────────────────────

Q5: "Is setState synchronous or asynchronous?"
    A: setState is ASYNCHRONOUS. React schedules updates and batches them.
       You cannot read the updated state immediately after setState.
       
       // ❌ Wrong - state not updated yet
       setCount(5);
       console.log(count);  // Still shows old value!
       
       // ✅ Use useEffect to react to state changes
       useEffect(() => {
         console.log(count);  // Shows updated value
       }, [count]);


═══════════════════════════════════════════════════════════════════════════════
                              📝 QUICK CHEAT SHEET
═══════════════════════════════════════════════════════════════════════════════

┌────────────────────────┬────────────────────────────────────────────────────┐
│ Direct Update          │ setCounter(counter + 1)                            │
│                        │ Uses closure value, can be stale                   │
├────────────────────────┼────────────────────────────────────────────────────┤
│ Functional Update      │ setCounter(prev => prev + 1)                       │
│                        │ Always gets latest pending state                   │
├────────────────────────┼────────────────────────────────────────────────────┤
│ Batching               │ Multiple setState → 1 re-render                    │
├────────────────────────┼────────────────────────────────────────────────────┤
│ Arrow Function Syntax  │ () => value  OR  () => { return value }            │
│                        │ {} without return = undefined!                     │
└────────────────────────┴────────────────────────────────────────────────────┘

╚══════════════════════════════════════════════════════════════════════════════╝
*/

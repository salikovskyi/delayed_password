import { useEffect, useState } from "react";

// password mask pattern generator
const func = (pattern, num) => {
  return Array.apply(null, Array(num))
    .map(() => pattern)
    .join("");
};

function App() {
  const [password, setPassword] = useState("");
  const [unmaskedPassword, setUnmaskedPassword] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPassword(func("●", password.length));
    }, 800);
    return () => window.clearTimeout(timer);
  }, [password]);

  const handlePasswordChange = (e) => {
    const inputText = e.target.value;
    const index = e.target.selectionStart;
    const addedTextLength = inputText.length - unmaskedPassword.length;

    if (inputText.length === 0) {
      setPassword("");
    } else {
      setPassword(
        func("●", inputText.length - 1) + inputText.charAt(inputText.length - 1)
      );
      console.log(unmaskedPassword);
    }

    if (addedTextLength > 0) {
      const newStr = inputText.slice(index - addedTextLength, index);
      setUnmaskedPassword(
        unmaskedPassword.slice(0, index - addedTextLength) +
          newStr +
          unmaskedPassword.slice(index - addedTextLength)
      );
    } 
  };

  return (
    <div>
      <input type="text" value={password} onChange={handlePasswordChange} />
      {unmaskedPassword}
    </div>
  );
}
export default App;

import { useCallback, useEffect, useState } from "react";
import "./App.css";

const func = (pattern, num) => {
  return Array.apply(null, Array(num))
    .map(() => pattern)
    .join("");
};

function App() {
  const [password, setPassword] = useState("");
  const [unmaskedPassword, setUnmaskedPassword] = useState("");
  const [error, setError] = useState(false);
  const regex = /[^\d●]/g;

  const input = document.querySelector("input");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPassword(func("●", password.length));
    }, 800);
    return () => window.clearTimeout(timer);
  }, [password]);

  const handlePasswordChange = useCallback(
    (e) => {
      const inputText = e.target.value.replace(regex, "");
      const index = e.target.selectionStart;
      const addedTextLength = inputText.length - unmaskedPassword.length;

      if (index > e.target.getAttribute("maxLength") - 1) {
        setError(true);
      } else {
        setError(false);
      }

      if (inputText.length === 0) {
        setPassword("");
      } else {
        setPassword(
          func("●", inputText.length - 1) +
            inputText.charAt(inputText.length - 1)
        );
      }

      if (addedTextLength > 0) {
        const newStr = inputText.slice(index - addedTextLength, index);
        setUnmaskedPassword(
          unmaskedPassword.slice(0, index - addedTextLength) +
            newStr +
            unmaskedPassword.slice(index - addedTextLength)
        );
      }
    },
    [unmaskedPassword]
  );

  return (
    <div>
      <input
        type="text"
        value={password}
        onChange={handlePasswordChange}
        className="input"
        maxLength="12"
      />
      {error ? (
        <p className="error"> Пароль може бути не більше 12 символів</p>
      ) : null}
      {password ? <p>Ваш Пароль - {unmaskedPassword}</p> : null}
    </div>
  );
}
export default App;

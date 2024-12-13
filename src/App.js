import React, { useState } from "react";
import "./App.css"; 

const mockApiRequest = (payload) => {
  return new Promise((resolve, reject) => {
    console.log("Полученные данные:", payload);

    setTimeout(() => {
      if (payload.username === "admin" && payload.password === "1234") {
        resolve({ message: "Успешный вход!", token: "nntoken" });
      } else {
        reject({ message: "Неверный логин или пароль" });
      }
    }, 1000); 
  });
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { username, password };
    setLoading(true);
    setError(""); 

    try {
      const response = await mockApiRequest(payload);
      console.log("Ответ сервера:", response);
      alert(response.message);
    } catch (error) {
      console.error("Ошибка:", error.message);
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="h1">Заними!</h1>
      </header>

      <div className="form-container">
        <h1 className="title">Вход в Барс Мэи</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              className="field__input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
            />
            <label className="field__label" htmlFor="username">
              Логин
            </label>
          </div>
          <div className="field field--spaced">
            <input
              className="field__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label className="field__label" htmlFor="password">
              Пароль
            </label>
          </div>
          <div className="button-wrapper">
            <button className="button" type="submit" disabled={loading}>
              {loading ? "Загрузка..." : "Войти"}
            </button>
            {error && <span className="error-message">{error}</span>}
          </div>
        </form>
      </div>
      <footer className="footer">
        <p className="ft">© 2024 Заними. В активной разработке.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
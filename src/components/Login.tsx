import "@/styles/form.css";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { inter } from "@/vendor/fonts";
import { CurrentUserContext } from "@/contexts/CurrentUserContext";

interface LoginProps {
  onClose?: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const { setLogged } = useContext(CurrentUserContext);
  const [data, setData] = useState({
    email: "" as string,
    password: "" as string,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Test user credentials
    const TEST_EMAIL = "test@test.com";
    const TEST_PASSWORD = "password123";

    if (data.email === TEST_EMAIL && data.password === TEST_PASSWORD) {
      // Successful login
      setLogged(true);
      console.log("User logged in successfully!");

      // Close the popup automatically
      if (onClose) {
        onClose();
      }

      // In a real app, you would:
      // 1. Send credentials to backend
      // 2. Receive and store JWT token
      // 3. Set user data in context
    } else {
      console.log("Invalid credentials! Use: test@test.com / password123");
      alert(
        "Invalid credentials! Use:\nEmail: test@test.com\nPassword: password123"
      );
    }
  };

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className={`modal__form form ${inter.className} flex flex-col`}
      noValidate
      onSubmit={handleSubmit}
      action=""
    >
      <fieldset className="form__fieldset flex flex-col">
        <label className="form__label flex flex-col">
          Correo electrónico
          <input
            id="email-input"
            type="email"
            className="form__input"
            name="email"
            minLength={2}
            maxLength={30}
            value={data.email}
            placeholder="Introduce tu correo electrónico"
            required
            onChange={handleChange}
          />
        </label>
        <span className="form__input-error email-input-error"></span>

        <label className="form__label">
          Contraseña
          <input
            id="password-input"
            type="password"
            className="form__input"
            name="password"
            minLength={2}
            maxLength={30}
            value={data.password}
            placeholder="Introduce contraseña"
            required
            onChange={handleChange}
          />
        </label>
        <span className="form__input-error password-input-error"></span>
      </fieldset>
      <button className="form__button rounded-full font-medium" type="submit">
        Iniciar sesión
      </button>
    </form>
  );
}

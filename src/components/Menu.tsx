import "@/styles/nav.css";
import { ReactNode, useContext } from "react";
import NavItem from "./NavItem";
import Login from "./Login";
import { CurrentUserContext } from "@/contexts/CurrentUserContext";

interface MenuProps {
  openPopup: (popup: { title: string; children: ReactNode }) => void;
  closePopup?: () => void;
}

export default function Menu({ openPopup, closePopup }: MenuProps) {
  const { logged, setLogged } = useContext(CurrentUserContext);

  const loginPopup = {
    title: "Iniciar sesión",
    children: <Login onClose={closePopup} />,
  };

  const handleLogout = () => {
    setLogged(false);
    console.log("User logged out successfully!");
  };

  return (
    <>
      <ul className="navigation__list flex h-full">
        <NavItem title="Inicio" link="/" />
        {logged && <NavItem title="Artículos guardados" link="/saved-news" />}
      </ul>

      {logged ? (
        <button
          className="navigation__button w-[176px] p-[12px] rounded-full hover:bg-current transition-all duration-300 font-medium"
          onClick={handleLogout}
        >
          <span className="navigation__button-text">Cerrar sesión</span>
        </button>
      ) : (
        <button
          className="navigation__button w-[176px] p-[12px] rounded-full hover:bg-current transition-all duration-300 font-medium"
          onClick={() => openPopup(loginPopup)}
        >
          <span className="navigation__button-text">Iniciar sesión</span>
        </button>
      )}
    </>
  );
}

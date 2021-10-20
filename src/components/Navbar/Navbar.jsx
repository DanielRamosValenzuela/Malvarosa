import React from "react";
import logo from "../../assets/image/logo.png";
import {
  Bars,
  Cart,
  Instagram,
  Nav,
  NavBtn,
  NavBtnIcon,
  NavBtnLink,
  NavBtnSearch,
  NavEnd,
  NavInputForm,
  NavLink,
  NavMenu,
  NavSearchForm,
  NavStart,
  Search,
  Times,
  Whatsapp,
  NavLinkLogo,
} from "./NavbarElements";
import { Badge } from "@material-ui/core";
import { useLocation } from "react-router";

export const Navbar = ({ toggleSidebar, totalItems }) => {
  const location = useLocation();

  return (
    <>
      <NavStart>
        <NavLinkLogo to="/">
          <img src={logo} alt="Malvarosa Verde" height="50px"></img>
        </NavLinkLogo>
        <NavSearchForm>
          <NavBtnSearch>
            <Search />
          </NavBtnSearch>
          <NavInputForm placeholder="Búsqueda..." />
          <NavBtnSearch>
            <Times />
          </NavBtnSearch>
        </NavSearchForm>

        <Bars onClick={toggleSidebar} />
      </NavStart>
      <Nav>
        <NavMenu>
          <NavLink to="/" className="activeStyle">
            Inicio
          </NavLink>
          <NavLink to="/maceteros" className="activeStyle">
            Maceteros
          </NavLink>
          <NavLink to="/flores" className="activeStyle">
            Flores
          </NavLink>
          <NavLink to="/plantas" className="activeStyle">
            Plantas
          </NavLink>
          <NavLink to="/herramientas" className="activeStyle">
            Herramientas
          </NavLink>
        </NavMenu>
        <NavEnd>
          <NavBtn>
            <NavBtnLink to="/signin">Iniciar sesión</NavBtnLink>
          </NavBtn>
          <NavBtnIcon to="instragram">
            <Instagram />
          </NavBtnIcon>
          <NavBtnIcon to="whatsapp">
            <Whatsapp />
          </NavBtnIcon>
          {location.pathname === "/" && (
            <NavBtnIcon to="/carro">
              <Badge badgeContent={totalItems} color="secondary">
                <Cart />
              </Badge>
            </NavBtnIcon>
          )}
        </NavEnd>
      </Nav>
    </>
  );
};

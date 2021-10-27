import React from "react";
import logo from "../../assets/image/logo.png";
import {
  Bars,
  Cart,
  Instagram,
  Nav,
  NavBtnIcon,
  NavBtnSearch,
  NavEnd,
  NavInputForm,
  NavLink,
  NavMenu,
  NavSearchForm,
  NavStart,
  Times,
  Whatsapp,
  NavLinkLogo,
} from "./NavbarElements";
import { Badge } from "@material-ui/core";
import { useLocation } from "react-router";

export const Navbar = ({
  toggleSidebar,
  totalItems,
  categories,
  handleReset,
  handleChange,
  search,
  handleResetCategorie,
  onClickCategorie,
}) => {
  const location = useLocation();

  return (
    <>
      <NavStart>
        <NavLinkLogo to="/">
          <img src={logo} alt="Malvarosa Verde" height="50px"></img>
        </NavLinkLogo>
        <NavSearchForm>
          <NavInputForm
            type="text"
            placeholder="Búsqueda..."
            onChange={handleChange}
            value={search}
          />
          <NavBtnSearch onClick={handleReset}>
            <Times />
          </NavBtnSearch>
        </NavSearchForm>
        <Bars onClick={toggleSidebar} />
      </NavStart>
      <Nav>
        <NavMenu>
          <NavLink onClick={handleResetCategorie}>Inicio</NavLink>
          {categories.data &&
            categories.data.map((categorie) => (
              <NavLink
                key={categorie.id}
                value={categorie.name}
                onClick={onClickCategorie}
              >
                {categorie.name}
              </NavLink>
            ))}
        </NavMenu>
        <NavEnd>
          <NavBtnIcon to="/">
            <Instagram />
          </NavBtnIcon>
          <NavBtnIcon to="/">
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

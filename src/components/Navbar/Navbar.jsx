import React, { useState } from "react";
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
  TotalNav,
  DisplayNav,
} from "./NavbarElements";
import { Badge } from "@mui/material";
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
  isOpenSidebar,
}) => {
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();

  const changeNavbar = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  return (
    <>
      <DisplayNav className={!isOpenSidebar ? "" : "displayNav"}>
        <TotalNav
          className={
            navbar
              ? "animate__animated animate__backInDown"
              : "animate__animated animate__fadeInTopRight"
          }
        >
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
        </TotalNav>
      </DisplayNav>
    </>
  );
};

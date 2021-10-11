import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import {
  FaBars,
  FaInstagram,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";

export const NavStart = styled.div`
  background: white;
  position: sticky;
  height: 70px;
  margin-top: 10px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: 60;
  @media screen and (max-width: 1000px) {
    justify-content: start;
  }
`;
export const Nav = styled.nav`
  background: LightGreen;
  height: 80px;
  display: flex;
  z-index: 50;
`;
export const NavLink = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: MediumOrchid;
    font-weight: bold;
  }
`;
export const NavLinkLogo = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  padding: 0 5rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: MediumOrchid;
    font-weight: bold;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: black;

  @media screen and (max-width: 1000px) {
    display: block;
    position: absolute;
    color: black;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 2.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  justify-content: start;
  display: flex;
  align-items: center;
  margin-left: 24px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 50px;
  background: #256ce1;
  padding: 10px 22px;
  font-size: 14px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #15cdfc;
    color: #010606;
  }
`;

export const NavSearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e26d5c;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  box-shadow: 0.25rem 0.25rem 0rem #f0b2a8;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
export const NavInputForm = styled.input`
  margin: 0 0.5rem 0 0.5rem;

  border: none;
  outline: none;
  background: #e26d5c;
  color: white;
`;

export const NavBtnSearch = styled.button`
  border: none;
  outline: none;
  background: #e26d5c;
  color: white;
`;

export const NavBtnIcon = styled(Link)`
  display: flex;
  padding: 10px 10px;
  align-items: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;

export const Search = styled(FaSearch)`
  color: black;
  display: grid;
  place-items: center;
`;
export const Times = styled(FaTimes)`
  color: black;
  display: grid;
  place-items: center;
`;
export const Cart = styled(FaShoppingCart)`
  color: black;
  height: 30px;
  font-size: 28px;

  &:hover {
    color: DeepSkyBlue;
    transition: all 0.2s ease-in-out;
  }
`;
export const Instagram = styled(FaInstagram)`
  color: black;
  height: 30px;
  font-size: 28px;

  &:hover {
    color: DeepSkyBlue;
    transition: all 0.2s ease-in-out;
  }
`;
export const Whatsapp = styled(FaWhatsapp)`
  color: black;
  height: 30px;
  font-size: 28px;

  &:hover {
    color: DeepSkyBlue;
    transition: all 0.2s ease-in-out;
  }
`;

export const NavEnd = styled.div`
  display: flex;
  margin-right: 50px;
  margin-left: auto;

  @media screen and (max-width: 1000px) {
    justify-content: center;
    margin: auto;
  }
`;

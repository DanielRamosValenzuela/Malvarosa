import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: white;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpenSidebar }) => (isOpenSidebar ? "100%" : "0")};
  top: ${({ isOpenSidebar }) => (isOpenSidebar ? "0" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
  color: black;
`;

export const IconClose = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: black;
`;
export const SidebarLink = styled.button`
  color: black;
  display: flex;
  background-color: transparent;
  border-style: none;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 16px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #15cdfc;
    font-weight: bold;
    transition: 0.2s ease-in-out;
  }
`;

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const SideSearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 14px;
  justify-content: space-between;
  background: #e26d5c;
  padding: 0.8rem;
  border-radius: 0.5rem;
  color: white;
  box-shadow: 0.25rem 0.25rem 0rem #f0b2a8;
`;

export const SideInputForm = styled.input`
  margin: 0 0.5rem 0 0.5rem;

  border: none;
  outline: none;
  background: #e26d5c;
  color: white;
`;

export const SideBtnSearch = styled.button`
  border: none;
  outline: none;
  background: #e26d5c;
  color: white;
`;

export const SideTimes = styled(FaTimes)`
  color: black;
  display: grid;
  place-items: center;
`;

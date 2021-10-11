import React from "react";
import {
  SidebarContainer,
  IconClose,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
  SidebarRoute,
  SideSearchForm,
  SideInputForm,
  SideBtnSearch,
  SideSearch,
  SideTimes,
} from "./SidebarElements";

export const Sidebar = ({ toggleSidebar, isOpenSidebar }) => {
  return (
    <SidebarContainer isOpenSidebar={isOpenSidebar}>
      <IconClose>
        <CloseIcon onClick={toggleSidebar} />
      </IconClose>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/" onClick={toggleSidebar}>
            Inicio
          </SidebarLink>
          <SidebarLink to="/macateros" onClick={toggleSidebar}>
            Maceteros
          </SidebarLink>
          <SidebarLink to="/flores" onClick={toggleSidebar}>
            Flores
          </SidebarLink>
          <SidebarLink to="/plantas" onClick={toggleSidebar}>
            Plantas
          </SidebarLink>
          <SidebarLink to="/herramientas" onClick={toggleSidebar}>
            Herramientas
          </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/signup" onClick={toggleSidebar}>
            Iniciar sesión
          </SidebarRoute>
        </SideBtnWrap>
        <SideBtnWrap>
          <SideSearchForm>
            <SideBtnSearch>
              <SideSearch />
            </SideBtnSearch>
            <SideInputForm placeholder="Búsqueda..." />
            <SideBtnSearch>
              <SideTimes />
            </SideBtnSearch>
          </SideSearchForm>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

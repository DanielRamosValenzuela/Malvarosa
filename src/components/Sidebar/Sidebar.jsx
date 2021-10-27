import React from "react";
import {
  SidebarContainer,
  IconClose,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
  SideSearchForm,
  SideInputForm,
  SideBtnSearch,
  SideTimes,
} from "./SidebarElements";

export const Sidebar = ({
  toggleSidebar,
  isOpenSidebar,
  categories,
  handleChange,
  handleReset,
  search,
}) => {
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
          {categories.data &&
            categories.data.map((categorie) => (
              <SidebarLink to={`/${categorie.name}`} key={categorie.id}>
                {categorie.name}
              </SidebarLink>
            ))}
        </SidebarMenu>
        <SideBtnWrap>
          <SideSearchForm>
            <SideInputForm
              type="text"
              placeholder="Búsqueda..."
              onChange={handleChange}
              value={search}
            />
            <SideBtnSearch>
              <SideTimes onClick={handleReset} />
            </SideBtnSearch>
          </SideSearchForm>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

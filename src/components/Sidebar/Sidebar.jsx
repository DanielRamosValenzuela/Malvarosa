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
  handleResetCategorie,
  onClickCategorie,
}) => {
  return (
    <SidebarContainer isOpenSidebar={isOpenSidebar}>
      <IconClose>
        <CloseIcon onClick={toggleSidebar} />
      </IconClose>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink onClick={handleResetCategorie}>Inicio</SidebarLink>
          {categories.data &&
            categories.data.map((categorie) => (
              <SidebarLink
                onClick={onClickCategorie}
                key={categorie.id}
                value={categorie.name}
              >
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

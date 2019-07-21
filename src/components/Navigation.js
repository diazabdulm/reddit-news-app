import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";

const NavigationMenu = styled(AppBar)`
  background: transparent;
  box-shadow: none;
  padding-top: 1rem;
`;

const NavigationText = styled.div`
  flex-grow: 1;
`;

const NavigationTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: .5rem;
`;

const NavigationSubtitle = styled(Typography)`
  color: rgba(255, 255, 255, 0.6);
`;

const Search = styled(IconButton)`
  color: #fff;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  align-self: flex-start;
  :hover {
    background: rgba(255, 255, 255, 0.35);
  }
`;

export default function Navigation() {
  return (
    <NavigationMenu position="static">
      <Toolbar>
        <NavigationText>
          <NavigationTitle variant="h4">Trending</NavigationTitle>
          <NavigationSubtitle variant="subtitle2">
            Today's popular posts
          </NavigationSubtitle>
        </NavigationText>
        <Search aria-label="search">
          <SearchIcon style={{ fontSize: '2rem' }} />
        </Search>
      </Toolbar>
    </NavigationMenu>
  );
}

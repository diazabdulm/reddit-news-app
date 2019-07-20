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
`;

const NavigationText = styled.div`
  flex-grow: 1;
`;

export default function Navigation() {
  return (
    <NavigationMenu position="static" style={{}}>
      <Toolbar>
        <NavigationText>
          <Typography variant="h6">Trending</Typography>
          <Typography variant="subtitle2">Today's popular posts</Typography>
        </NavigationText>
        <IconButton aria-label="search" style={{ color: "#fff" }}>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </NavigationMenu>
  );
}

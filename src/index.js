// TODO: Filter out mod posts
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./utils/createTheme";
import getThumbnail from "./utils/getThumbnail";
import { PostsContext, PostsProvider } from "./components/PostsProvider";
import CurrentlyReading from "./components/CurrentlyReading";
import Navigation from "./components/Navigation";
import PostListings from "./components/PostListings";
import TopPost from "./components/TopPost";

const MainContent = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.39) 67%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${props => props.backgroundImage}) 0% 0% / cover no-repeat;
`;

function MainContentSection({ firstPostThumbnail }) {
  return (
    <MainContent backgroundImage={getThumbnail(firstPostThumbnail)}>
      <Navigation />
      <TopPost />
    </MainContent>
  );
}

function PageSetup() {
  const postsConsumer = React.useContext(PostsContext);
  return postsConsumer.posts.length ? (
    <>
      <MainContentSection
        firstPostThumbnail={postsConsumer.posts[0].data.preview}
      />
      <PostListings />
      <CurrentlyReading />
    </>
  ) : (
    <div>Loading...</div>
  );
}

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <PostsProvider>
          <CssBaseline />
          <PageSetup />
        </PostsProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

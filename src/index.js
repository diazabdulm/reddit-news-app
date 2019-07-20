import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import theme from "./utils/createTheme";
import getThumbnail from "./utils/getThumbnail";
import { PostsContext, PostsProvider } from "./components/PostsProvider";
import CurrentlyReading from "./components/CurrentlyReading";
import Navigation from "./components/Navigation";
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

const PostListingTitle = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

function MainContentSection() {
  const postsContext = React.useContext(PostsContext);
  const firstPostThumbnail = postsContext.posts[0].data.preview;
  return (
    <MainContent backgroundImage={getThumbnail(firstPostThumbnail)}>
      <Navigation />
      <TopPost />
    </MainContent>
  );
}

function PostListings() {
  const postsConsumer = React.useContext(PostsContext);
  return (
    <List style={{ background: "black", color: "white" }}>
      {/* We slice in order to separate the rest of the articles from the top one */}
      {postsConsumer.posts.slice(1).map(({ data }, index) => (
        // We add 1 to currentIndex because we have to take into account the top post
        <ListItem
          key={index}
          alignItems="center"
          onClick={() => postsConsumer.setCurrentPost(index + 1)}
        >
          <ListItemAvatar style={{ minWidth: "96px" }}>
            <Avatar
              style={{ borderRadius: "10px", width: "80px", height: "80px" }}
              alt="post thumbnail"
              src={getThumbnail(data.preview)}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <PostListingTitle variant="body1" style={{ fontWeight: 600 }}>
                {data.title}
              </PostListingTitle>
            }
            secondary={
              <Typography style={{ color: "#989898" }}>
                {data.subreddit}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

function PageSetup() {
  const postsConsumer = React.useContext(PostsContext);
  return (
    <div>
      {postsConsumer.posts.length && (
        <>
          <MainContentSection />
          <CurrentlyReading />
          <PostListings />
        </>
      )}
    </div>
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

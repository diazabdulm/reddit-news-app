import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { PostsContext } from "./PostsProvider";

const Navigation = styled(AppBar)`
  position: relative;
  background: transparent;
`;

const Close = styled(IconButton)`
  color: #FF3366;
  padding-right: 0;
`;

const Title = styled(Typography)`
  font-weight: 700;
  color: #fff;
  padding-bottom: 16px;
`;

const Content = styled.div`
  padding: 16px;
  padding-top: 32px;
  word-wrap: break-word;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CurrentlyReading() {
  const postsConsumer = React.useContext(PostsContext);
  const postSelected = postsConsumer.currentPost > -1 ? true : false;
  const currentPost =
    postSelected && postsConsumer.posts[postsConsumer.currentPost].data;
  
  function handleDialogClose() {
    // setting the index to -1 closes the post because there are no posts with a -1 index
    postsConsumer.setCurrentPost(-1);
  }

  return (
    <Dialog
      fullScreen
      open={postSelected}
      onClose={handleDialogClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          backgroundColor: "#000"
        }
      }}
    >
      <Navigation>
        <Toolbar>
          <Typography variant="body1" style={{ flex: 1, color: "#737373" }}>
            {currentPost.subreddit}
          </Typography>
          <Close
            edge="start"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
          >
            <CloseIcon />
          </Close>
        </Toolbar>
      </Navigation>
      <Content>
        <Title variant="h4">
          {currentPost.title}
        </Title>
        <Typography
          component="p"
          dangerouslySetInnerHTML={{ __html: currentPost.selftext_html }}
          style={{ color: "#B8B8B8" }}
        />
      </Content>
    </Dialog>
  );
}

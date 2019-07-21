// TODO: Get thumbnail of current post, not first post
// TODO: Fix chip not showing up
// TODO: Add variable representing currentPost
import React from "react";
import moment from "moment";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import CommentIcon from "@material-ui/icons/ModeComment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { PostsContext } from "./PostsProvider";
import formatNumK from "../utils/formatNumK";
import getThumbnail from "../utils/getThumbnail";

const NavigationBar = styled(AppBar)`
  position: relative;
  background: transparent;
  box-shadow: none;
  align-items: flex-end;
  padding-top: 1rem;
`;

const HeaderCard = styled(Card)`
  background: transparent;
`;

const HeaderSection = styled.div`
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${props => props.backgroundImage}) 0% 0% / cover no-repeat;
`;

const Close = styled(IconButton)`
  color: #fff;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  :hover {
    background: rgba(255, 255, 255, 0.35);
  }
`;

const Title = styled(Typography)`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  color: #fff;
  padding-bottom: 11rem;
`;

const TimeStamp = styled(Typography)`
  flex-grow: 1;
`;

const PostStats = styled(Button)`
  color: #8D8D8D !important;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CurrentlyReading() {
  const postsConsumer = React.useContext(PostsContext);
  const postSelected = postsConsumer.currentPost > -1 ? true : false;
  const firstPostThumbnail =
    postSelected && postsConsumer.posts[postsConsumer.currentPost].data.preview;
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
      <HeaderSection backgroundImage={getThumbnail(firstPostThumbnail)}>
        <NavigationBar>
          <Toolbar>
            <Close
              edge="end"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="Close Post"
            >
              <CloseIcon style={{ fontSize: "2rem" }} />
            </Close>
          </Toolbar>
        </NavigationBar>
        <HeaderCard>
          <CardHeader
            avatar={
              <Chip
                style={{ borderRadius: "5px", textTransform: "uppercase" }}
                label={currentPost.subreddit}
              />
            }
          />
          <CardContent>
            <Title variant="h4">{currentPost.title}</Title>
          </CardContent>
          <CardActions>
            <TimeStamp style={{ color: "#969696" }}>
              {moment.unix(currentPost.created_utc).fromNow()}
            </TimeStamp>
            <PostStats disabled>
              <CommentIcon style={{ marginRight: '.5rem', color: '#8D8D8D' }} />
              <Typography style={{ fontWeight: '600' }}>{formatNumK(currentPost.num_comments)}</Typography>
            </PostStats>
            <PostStats disabled>
              <FavoriteIcon style={{ marginRight: '.5rem', color: '#8D8D8D' }} />
              <Typography style={{ fontWeight: '600' }}>{formatNumK(currentPost.score)}</Typography>
            </PostStats>
          </CardActions>
        </HeaderCard>
      </HeaderSection>
      <div>
        <Card style={{ background: "transparent", borderRadius: 0 }}>
          <CardContent
            style={{ color: "#fff" }}
            dangerouslySetInnerHTML={{ __html: currentPost.selftext_html }}
          />
        </Card>
      </div>
    </Dialog>
  );
}

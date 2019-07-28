import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import getThumbnail from "../utils/getThumbnail";
import { PostsContext } from "./PostsProvider";

const PostListingTitle = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Thumbnail = styled(Avatar)`
  border-radius: 10px;
  width: 80px;
  height: 80px;
`;

const PostThumbnail = ({ thumbnail }) => (
  <ListItemAvatar style={{ minWidth: "96px" }}>
    <Thumbnail alt="post thumbnail" src={getThumbnail(thumbnail)} />
  </ListItemAvatar>
);

const PostPreviewText = ({ title, subreddit }) => (
  <ListItemText
    primary={
      <PostListingTitle variant="body1" style={{ fontWeight: 600 }}>
        {title}
      </PostListingTitle>
    }
    secondary={
      <Typography style={{ color: "#989898" }}>{subreddit}</Typography>
    }
  />
);

export default function PostListings() {
  const postsConsumer = React.useContext(PostsContext);
  return (
    <List style={{ background: "black", color: "white" }}>
      {/* We slice in order to separate the rest of the articles from the top one */}
      {postsConsumer.posts.slice(1).map(({ data: { preview, title, subreddit } }, index) => (
        // We add 1 to currentIndex because we have to take into account the top post that was sliced
        <ListItem
          key={index}
          alignItems="center"
          onClick={() => postsConsumer.setCurrentPost(index + 1)}
        >
          <PostThumbnail thumbnail={preview} />
          <PostPreviewText title={title} subreddit={subreddit} />
        </ListItem>
      ))}
    </List>
  );
}

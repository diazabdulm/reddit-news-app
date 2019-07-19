import React, { useContext } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/ModeComment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import formatNumK from "../utils/formatNumK";
import { PostsContext } from "./PostsProvider";

const TopPostCard = styled(Card)`
  border-radius: 0;
  background: transparent;
`;

const Title = styled(Typography)``;

const Subtitle = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

function AuthorDetails({ author }) {
  return (
    <CardHeader
      avatar={<Avatar aria-label="profile pic">R</Avatar>}
      title={
        <Typography style={{ color: "#337AE6" }}>{ author }</Typography>
      }
    />
  );
}

function TitleAndSubtitle({ title, selftext }) {
  return (
    <CardContent style={{ color: "#fff" }}>
      <Title gutterBottom>{title}</Title>
      <Subtitle>{selftext}</Subtitle>
    </CardContent>
  );
}

function NumCommentsAndLikes({ num_comments, score }) {
  return (
    <CardActions>
      <Button disabled>
        <CommentIcon />
        {formatNumK(num_comments)}
      </Button>
      <Button disabled>
        <FavoriteIcon />
        {formatNumK(score)}
      </Button>
    </CardActions>
  );
}

export default function TopPost() {
  // The top post is the first post, so we're using the 0th index throughout this component
  const postsConsumer = useContext(PostsContext);
  const { title, selftext, num_comments, score } = postsConsumer.posts[0].data;
  return (
    <TopPostCard onClick={() => postsConsumer.setCurrentPost(0)}>
      <AuthorDetails author={author} />
      <TitleAndSubtitle title={title} subtitle={selftext} />
      <NumCommentsAndLikes num_comments={num_comments} score={score} />
    </TopPostCard>
  );
}

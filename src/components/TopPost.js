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
  padding-top: 11rem;
`;

const Author = styled(CardHeader)`
  padding-bottom: 0px;
`;

const Title = styled(Typography)`
  font-family: "Inter", sans-serif;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  font-weight: 700;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const Subtitle = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AuthorName = styled(Typography)`
  font-weight: 700;
`;

const PostStats = styled(Button)`
  color: #a6a5a5 !important;
`;

function AuthorDetails({ author }) {
  return (
    <Author
      avatar={<Avatar aria-label="profile pic">R</Avatar>}
      title={<AuthorName style={{ color: "#337AE6" }}>{author}</AuthorName>}
    />
  );
}

function TitleAndSubtitle({ title, selftext }) {
  return (
    <CardContent style={{ color: "#fff" }}>
      <Title variant="h4" gutterBottom>
        {title}
      </Title>
      <Subtitle>{selftext}</Subtitle>
    </CardContent>
  );
}

function NumCommentsAndLikes({ num_comments, score }) {
  return (
    <CardActions>
      <PostStats disabled>
        <CommentIcon style={{ marginRight: '.5rem' }} />
        {formatNumK(num_comments)}
      </PostStats>
      <PostStats disabled>
        <FavoriteIcon style={{ marginRight: '.5rem' }} />
        {formatNumK(score)}
      </PostStats>
    </CardActions>
  );
}

export default function TopPost() {
  // The top post is the first post, so we're using the 0th index throughout this component
  const postsConsumer = useContext(PostsContext);
  const {
    author,
    title,
    selftext,
    num_comments,
    score
  } = postsConsumer.posts[0].data;
  return (
    <TopPostCard onClick={() => postsConsumer.setCurrentPost(0)}>
      <AuthorDetails author={author} />
      <TitleAndSubtitle title={title} selftext={selftext} />
      <NumCommentsAndLikes num_comments={num_comments} score={score} />
    </TopPostCard>
  );
}

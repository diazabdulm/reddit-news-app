import React from "react";
import useFetch from "react-fetch-hook";

const PostsContext = React.createContext();

function PostsProvider(props) {
  const { data } = useFetch("https://www.reddit.com/r/nosleep.json?raw_json=1");
  const [posts, setPosts] = React.useState([]);
  const [currentPost, setCurrentPost] = React.useState();

  // update posts state when data loads
  React.useEffect(() => setPosts(data ? data.data.children : []), [data]);

  // function searchSubreddits(subreddit) {
  //   const { data } = useFetch("https://swapi.co/api/people/1");
  // }

  const useFetch2 = (url, options) => {
    const [response, setResponse] = React.useState(null);
    useEffect(async () => {
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
    }, []);
    return response;
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        currentPost,
        setCurrentPost
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
}

export { PostsContext, PostsProvider };

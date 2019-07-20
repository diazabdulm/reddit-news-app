export default function getThumbnail(post) {
  // either get post thumbnail or use a placeholder image
  return post
    ? post.images[0].source.url
    : "https://images.unsplash.com/photo-1543185396-518db4b5faef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
}

export default function getThumbnail(post) {
  // either get post thumbnail or use a placeholder image
  return post ? post.images[0].source.url : "https://urlzs.com/Ud9au";
}

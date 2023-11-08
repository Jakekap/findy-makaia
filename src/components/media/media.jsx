import * as React from "react";
import { Masonry } from "@mui/lab";
import { getTaggedPost } from "../../services/postService";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PostsProfile({ posts, typeMedia, idUser }) {
  const [arrayPosts, setArrayPosts] = React.useState([]);
  const navigate = useNavigate();

  const viewPost = (goTo) => {
    navigate(`${goTo}`);
  };

  React.useEffect(() => {
    const handleTypeMedia = async () => {
      switch (typeMedia) {
        case "photos":
          const photosPosts = posts.filter(
            (post) => post.type && post.type === "photo"
          );
          setArrayPosts(photosPosts);
          break;
        case "videos":
          const videosPosts = posts.filter(
            (post) => post.type && post.type === "video"
          );
          setArrayPosts(videosPosts);
          break;
        case "tag":
          const taggedPosts = await getTaggedPost(idUser);
          setArrayPosts(taggedPosts);
          break;
      }
    };
    handleTypeMedia();
  }, [typeMedia, posts]);

  return (
    <Masonry columns={2} spacing={1} className="profile__posts">
      {arrayPosts.length > 0 ? (
        arrayPosts.map((post) =>
          post.type == "photo" ? (
            <figure
              key={post.id}
              data-id={post.id}
              className="profile__posts__post"
              onClick={() => {
                viewPost(post.id);
              }}
            >
              <img src={post?.media} alt="post_media" />
            </figure>
          ) : (
            <figure
              key={post.id}
              data-id={post.id}
              className="profile__posts__post"
              onClick={() => {
                viewPost(post.id);
              }}
            >
              <iframe src={post?.media} allowfullscreen></iframe>
            </figure>
          )
        )
      ) : (
        <div>No hay posts</div>
      )}
    </Masonry>
  );
}
PostsProfile.propTypes = {
  posts: PropTypes.array,
  typeMedia: PropTypes.string,
  idUser: PropTypes.string,
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postAction from "../../redux/actions/postAction";
import PostCreateCard from "../cards/PostCreateCard";

const PostCreatePage = (props) => {
  var auth = useSelector((state) => state.auth.authorized);
  const [post, setPost] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postAction.getPost())
      .then(async (result) => {
        //console.log("result:", result);
        setPost(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!auth) {
    return <div>not authorized.</div>;
  }
  const getPosts = () => {
    dispatch(postAction.getPost())
      .then(async (result) => {
        console.log("result:", result);
        setPost(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>

      <PostCreateCard post={post} refresh={getPosts}></PostCreateCard>
      <div style={{ textAlign: "left" }}>
        <ul>
          <li>USERS POST PAGE:</li>
            Required:<ul>
              <li>rearrange how user creates a post. Make it a stepped process.</li>
              <ul>
                <li>Step 1: *create </li>
                <li>Step 2: *update</li>
                <li>Step 3: *update with Image</li>
                <li>Success, return to Dashboard.</li>
              </ul>
            </ul>
          <li>
            ENTIRE SITE TODOS:
            <ul>
              db:<ul></ul>
              ui:
              <ul>

                 <li>make the all posts layout cards look cool.</li>
                <li>need to add category: ie. construction, carpentry, plumbing, remodeling, tile work, ...</li>
              </ul>
              api:
              <ul>
                <li>Separate Image for Posts.*currently using the users profile image.</li>
                <li>Search By Distance from ZipCode.</li>

                <li>Tie Payments to Post Creation.</li>
                <li>Map Locations</li>
              </ul>
              other:
              <ul>
                <li>correct image rotation from droid uploads.</li>
              </ul>
              nice to haves:
              <ul>
                <li>keep old posts so they can be re-used </li>
                <li>
                  make a subscription option, to make keeping posts up to date
                  easier for the user.
                </li>
                <li>
                  IF posts are to have a 'life time of a week' need way to track
                  and check when no longer valid.
                </li>
                <li>Tag other posts.</li>
                <li>inner messaging system for privacy concerned users.</li>
                <li>display 'my tagged posts' in dashboard. </li>
              </ul>
            </ul>
          </li>
        </ul>
      </div>
      <p className="appDevNote">PostCreatePage</p>

    </div>
  );
};

export default PostCreatePage;

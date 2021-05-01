import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import * as authAction from "../../redux/actions/authAction";
import * as postAction from "../../redux/actions/postAction";
import PostDisplayCard from "../cards/PostDisplayCard";

/*
TO GO: SPINNER: 
deps:
import FadeLoader from "react-spinners/FadeLoader";

fn:
let [loading, setLoading] = useState(false);
let [color, setColor] = useState("red");

jsx:
<div style={{position:"absolute",bottom:"25%",left:"50%"}} >
<FadeLoader color={"red"} loading={loading}  size={1} height={4} width={2}   />
</div>
*/

const UsersPostsPage = (props) => {
  let [loading, setLoading] = useState(false);
  var auth = useSelector((state) => state.auth.authorized);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const Kolor = useSelector((state) => state.post.statusColor);
  const postStepsAvailable = useSelector(
    (state) => state.post.postStepsAvailable
  );
  // I NEED A USE EFFECT TO LISTEN FOR CHANGES ON LOWER COMPONENTS.

  useEffect(() => {
    setLoading(true)
    dispatch(authAction.userProfile())
      .then(async (result) => {
        //console.log("AUTH CHECK: profile to check auth ...result:", result);
        setUser(result.data);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);

  const [currentPosts, setCurrentPosts] = useState([]);
  const [haveCurrentPosts, setHaveCurrentPosts] = useState(false);

  const [sortName, setSortName] = useState(false);
  const [sortEmail, setSortEmail] = useState(false);
  const [sortId, setSortId] = useState(false);
  const [sortZip, setSortZip] = useState(false);
  const [sortState, setSortState] = useState(false);
  const [noSort, setNoSort] = useState(true); //true by default

  const [filterKey, setFilterKey] = useState("");

  const getDefaultPosts = (key) => {
    //Function needed to handle case where search input empty or a space.
    dispatch(postAction.allUserPosts(key))
      .then(async (result) => {
        console.log("ALL POSTS RESULTS FUNCTION:", result);
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
      })
      .catch((err) => console.log(err));
  };

  const getFilteredOwnerPosts = (key, userId) => {
    dispatch(postAction.filterOwnersPosts(key, userId))
      .then(async (result) => {
        console.log(" --xx--  FILTERED OWNER POSTS RESULTS:", result);
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
      })
      .catch((err) => console.log(err));
  };

  //THIS IS DUPLICATE:
  // useEffect(() => {
  //   //initial gets all users posts once.
  //   dispatch(postAction.allUserPosts(user._id))
  //     .then(async (result) => {
  //       setCurrentPosts(result);
  //       setHaveCurrentPosts(true);
  //     })
  //     .catch((err) => console.log(err));
  // }, []); // user or post post broke something ? yes. just removed 'user' from brackets.

  useEffect(() => {
    setLoading(true)
    dispatch(postAction.allUserPosts(user._id))
      .then(async (result) => {
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, [Kolor]);

  useEffect(() => {
    setLoading(true)
    //initial gets all users posts once.
    dispatch(postAction.allUserPosts(user._id))
      .then(async (result) => {
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, [user]); // get new ones when posted...did NOT solve the problem ....
  // ??????  [postStepsAvailable]  as condition ^^^

  // MAY NEED TO USE
  //HERE?
  // whenever currentPosts update I'd like to update state posts as well. (havePost and posts)
  // ? I creates userPosts array in reducer...now how does AllSitePostsPage page do it. ?

  // FLOW: currentPosts -> post to PostDisplayCard  props.post -> EditPostCard as 'data' THEN upon update...
  //  dispatch(postAction.updatePost(values)) -> props.refresh() ?

  //NOW: whenever a new post is created, ALL the posts need to be re-queried to get it included.
  // useEffect based on state.post

  const sortByTitle = (posts) => {
    posts
      .sort((a, b) => (a.title > b.title ? 1 : -1))
      .map((post, i) => {
        return <PostDisplayCard key={i} post={post}></PostDisplayCard>;
      });
  };
  const clearSortOptions = () => {
    setSortName(false);
    setSortEmail(false);
    setSortId(false);
    setNoSort(false);
  };
  const setSortOption = (e) => {
    console.log(e.target.value);
    const key = e.target.value;
    clearSortOptions();
    switch (key) {
      case "id":
        setSortId(true);
        break;
      case "name":
        setSortName(true);
        break;
      case "email":
        setSortEmail(true);
        break;
      default:
        setNoSort(true);
        break;
    }
  };

  const setFilterOption = (e) => {
    setFilterKey(e.target.value);
    console.log("SETTING FILTER:");
    const key = e.target.value;

    if (key === "" || key === " ") {
      console.log("GET DEFAULT DATA BACK...");
      getDefaultPosts(user._id);
    } else {
      const userId = user._id;
      getFilteredOwnerPosts(key, userId);
    }
  };
  //
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const refreshUserPosts = () => {
    console.log(
      "should refresh users posts here and now immediately after changing...."
    );
    //to do this...need to requery
    dispatch(postAction.allUserPosts(user._id))
      .then(async (result) => {
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
      })
      .catch((err) => console.log(err));

    console.log(
      "Question now is does this refreshed data continue down to the bottom component. YES SUCCESS!"
    );
  };

  const displayPosts = () => {
    //console.log("DISPLAY currentPosts:",currentPosts);
    if (currentPosts.length > 0) {
      //console.log("UsersPostsPage.js currentPosts:",currentPosts);
    }
    if (haveCurrentPosts) {
      if (sortName) {
        return currentPosts
          .sort((a, b) => (a.title > b.title ? 1 : -1))
          .map((post, i) => {
            return <PostDisplayCard key={i} post={post}></PostDisplayCard>;
          });
      }
      if (sortEmail) {
        return currentPosts
          .sort((a, b) => (a.email > b.email ? 1 : -1))
          .map((post, i) => {
            return <PostDisplayCard key={i} post={post}></PostDisplayCard>;
          });
      }
      if (sortId) {
        return currentPosts
          .sort((a, b) => (a._id > b._id ? 1 : -1))
          .map((post, i) => {
            return <PostDisplayCard key={i} post={post}></PostDisplayCard>;
          });
      }

      if (noSort) {
        return currentPosts.map((post, i) => {
          return (
            <PostDisplayCard
              key={i}
              post={post}
              refresh={refreshUserPosts}
            ></PostDisplayCard>
          );
        });
      }
    }
  };

  if (!auth) {
    return <div>not authorized.</div>;
  }

  return (
    //className="card-plain"
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className="appPage"
    >
      <div style={{ position: "absolute", bottom: "25%", left: "50%" }}>
        <FadeLoader
          color={"red"}
          loading={loading}
          size={5}
          height={4}
          width={2}
        />
      </div>
      <Grid item>
        <span>
          <h2>Current Posts</h2>
        </span>
      </Grid>
      <Grid item></Grid>

      {haveCurrentPosts && displayPosts()}
      <p className="cardDevNote">UsersPostPage</p>
    </Grid>
  );
};

export default UsersPostsPage;

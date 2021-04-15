import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "../../redux/actions/authAction";
import * as postAction from "../../redux/actions/postAction";
import PostDisplayCard from "../cards/PostDisplayCard";

const UsersPostsPage = (props) => {
  var auth = useSelector((state) => state.auth.authorized);
  var newPost = useSelector((state) => state.newPost); //whenever new post created, use to trigger all posts refresh.
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const Kolor = useSelector((state) => state.post.statusColor);

  // I NEED A USE EFFECT TO LISTEN FOR CHANGES ON LOWER COMPONENTS.

  useEffect(() => {
    dispatch(authAction.userProfile())
      .then(async (result) => {
        //console.log("AUTH CHECK: profile to check auth ...result:", result);
        setUser(result.data);
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

  useEffect(() => {
    //initial gets all users posts once.
    dispatch(postAction.allUserPosts(user._id))
      .then(async (result) => {
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
      })
      .catch((err) => console.log(err));
  }, [user]); // user or post post broke something ? yes.

  useEffect(() => {
    dispatch(postAction.allUserPosts(user._id))
      .then(async (result) => {
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
      })
      .catch((err) => console.log(err));
  }, [Kolor]);

  useEffect(() => {
    //initial gets all users posts once.
    dispatch(postAction.allUserPosts(user._id))
      .then(async (result) => {
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
      })
      .catch((err) => console.log(err));
  }, [newPost]); // get new ones when posted...did NOT solve the problem ....

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
    if(currentPosts.length > 0){
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
    <Grid container direction="column" className="card-plain">
        <Grid item>
          <span>
            <h2>Current Posts</h2>
            {/* Sort Options:
            <input
              type="radio"
              id="name"
              name="sortOption"
              value="name"
              onChange={setSortOption}
            />
            <label htmlFor="name">Name</label> */}
        
           
          </span>
        </Grid>
        <Grid item>
          {/* <span>
            Filter:
            <input
              type="text"
              id="filterKey"
              name="filterKey"
              onBlur={setFilterOption}
            />
            <button>Search</button>
          </span> */}
        </Grid>

        {haveCurrentPosts && displayPosts()}
        <p className="cardDevNote">UsersPostPage</p>
    </Grid>
  );
};

export default UsersPostsPage;

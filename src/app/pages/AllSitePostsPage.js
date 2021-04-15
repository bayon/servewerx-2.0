import Grid from "@material-ui/core/Grid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postAction from "../../redux/actions/postAction";
import AllSitePostsDisplayCard from "../cards/AllSitePostsDisplayCard";
import PostDisplayCard from "../cards/PostDisplayCard";


const AllSitePostsPage = (props) => {
  var auth = useSelector((state) => state.auth.authorized);

  const dispatch = useDispatch();

  const [currentPosts, setCurrentPosts] = useState([]);
  const [haveCurrentPosts, setHaveCurrentPosts] = useState(false);

  const [sortName, setSortName] = useState(false);
  const [sortLatest, setSortLatest] = useState(false);
  const [sortPostType1, setSortPostType1] = useState(false);
  const [sortPostType2, setSortPostType2] = useState(false);
  const [sortCategory, setSortCategory] = useState(false);


  const [sortId, setSortId] = useState(false);
  const [sortZip, setSortZip] = useState(false);
  const [sortState, setSortState] = useState(false);
  const [noSort, setNoSort] = useState(true); //true by default

  const [filterKey, setFilterKey] = useState("");

  const searchInputEl = useRef(null);
  
  const getDefaultPosts = () => {
    //Function needed to handle case where search input empty or a space.
    dispatch(postAction.allSitePosts())
      .then(async (result) => {
        console.log("ALL POSTS RESULTS FUNCTION:", result);
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
      })
      .catch((err) => console.log(err));
  };

  const getFilteredPosts = (key) => {
    dispatch(postAction.filterPosts(key))
      .then(async (result) => {
        console.log(" --oo--  FILTERED POSTS RESULTS:", result);
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //initial gets all users once.
    dispatch(postAction.allSitePosts())
      .then(async (result) => {
        console.log("ALL POSTS RESULTS USEEFFECT:", result);
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const sortByTitle = (posts) => {
    posts
      .sort((a, b) => (a.title > b.title ? 1 : -1))
      .map((post, i) => {
        return(
          <PostDisplayCard key={i} post={post} ></PostDisplayCard>
        )
        // return (
        //   <AllSitePostsDisplayCard
        //     key={i}
        //     post={post}
        //   ></AllSitePostsDisplayCard>
        // );
      });
  };
  const clearSortOptions = () => {
    setSortName(false);
    setSortLatest(false);
    setSortPostType1(false);
    setSortPostType2(false);
    setSortCategory(false);
    setNoSort(false);
  };
  const setSortOption = (e) => {
    console.log(e.target.value);
    const key = e.target.value;
    clearSortOptions();
    ////latest,postType1, postType2,

    switch (key) {
      case "id":
        setSortId(true);
        break;
      case "name":
        setSortName(true);
        break;
     
      case "latest":
        setSortLatest(true);
        break;
      case "postType1":
        setSortPostType1(true);
        break;
      case "postType2":
        setSortPostType2(true);
        break;
      case "category":
          setSortCategory(true);
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
      getDefaultPosts();
    } else {
      getFilteredPosts(key);
    }
  };

  const displayPosts = () => {
    if (haveCurrentPosts) {
      if (sortName) {
        return currentPosts
          .sort((a, b) => (a.title > b.title ? 1 : -1))
          .map((post, i) => {
            return (
              // <PostDisplayCard key={i} post={post} ></PostDisplayCard>
              <AllSitePostsDisplayCard
                key={i}
                post={post}
              ></AllSitePostsDisplayCard>
            );
          });
      }
      if (sortLatest) {
        return currentPosts
          .sort((a, b) => (a.lastUpdated > b.lastUpdated ? -1 : 1))
          .map((post, i) => {
            return (
              <AllSitePostsDisplayCard
                key={i}
                post={post}
              ></AllSitePostsDisplayCard>
            );
          });
      }
      if (sortPostType1) {
        return currentPosts
          .sort((a, b) => (a.postType > b.postType ? 1 : -1))
          .map((post, i) => {
            return (
              <AllSitePostsDisplayCard
                key={i}
                post={post}
              ></AllSitePostsDisplayCard>
            );
          });
      }
      if (sortPostType2) {
        return currentPosts
          .sort((a, b) => (a.postType > b.postType ? -1 : 1))
          .map((post, i) => {
            return (
              <AllSitePostsDisplayCard
                key={i}
                post={post}
              ></AllSitePostsDisplayCard>
            );
          });
      }
      if (sortCategory) {
        return currentPosts
          .sort((a, b) => (a.category > b.category ? 1 : -1))
          .map((post, i) => {
            return (
              <AllSitePostsDisplayCard
                key={i}
                post={post}
              ></AllSitePostsDisplayCard>
            );
          });
      }

      if (noSort) {
        return currentPosts.map((post, i) => {
          return (
            <AllSitePostsDisplayCard
              key={i}
              post={post}
            ></AllSitePostsDisplayCard>
          );
        });
      }
    }
  };
  const resetAll = async () => {
    console.log('resetting all ...')
    getDefaultPosts()
    searchInputEl.current.value ="";
    searchInputEl.current.focus();
    //  setNoSort(true);
    // displayPosts()
  }
  if (!auth) {
    return <div>not authorized.</div>;
  }

  return (
    <Grid container spacing={0}>

        <p className="cardDevNote">AllSitePostsPage</p>
        <Grid item xs={12}>
        
          <span>
            Sort Options:
            <input
              type="radio"
              id="name"
              name="sortOption"
              value="name"
              onChange={setSortOption}
            />
            <label htmlFor="name">Title</label>
            <input
              type="radio"
              id="latest"
              name="sortOption"
              value="latest"
              onChange={setSortOption}
            />
            <label htmlFor="latest">Latest</label>
            <input
              type="radio"
              id="postType1"
              name="sortOption"
              value="postType1"
              onChange={setSortOption}
            />
            <label htmlFor="postType1">Looking For Work</label>
            <input
              type="radio"
              id="postType2"
              name="sortOption"
              value="postType2"
              onChange={setSortOption}
            />
            <label htmlFor="postType2">Looking To Hire</label>
            <input
              type="radio"
              id="category"
              name="sortOption"
              value="category"
              onChange={setSortOption}
            />
            <label htmlFor="category">Category</label>
          </span>
          </Grid>
          <Grid item xs={12}>
          <span>
            Filter:
            <input
            className="appInputAuto"
              type="text"
              id="filterKey"
              name="filterKey"
              onBlur={setFilterOption}
              ref={searchInputEl} 
            />
            <button>Search</button>
            <button onClick={resetAll}>Reset</button>
          </span>
        </Grid>

        {haveCurrentPosts && displayPosts()}
     
    </Grid>
  );
};

export default AllSitePostsPage;

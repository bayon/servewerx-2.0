import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
// var zipcodes = require('zipcodes');
import haversine from "haversine-distance";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import * as postAction from "../../redux/actions/postAction";
import AllSitePostsDisplayCard from "../cards/AllSitePostsDisplayCard";
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

const AllSitePostsPage = (props) => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("red");

  const metersToMiles = (i) => {
    return i * 0.000621371192;
  };
  const milesToMeters = (i) => {
    return i * 1609.344;
  };
  const testZip = () => {
    const usZips = require("us-zips");
    console.log("zip results:---------------------");
    console.log(usZips["54301"]);
    var zipGeo = usZips["47115"];
    var zipGeo2 = usZips["40202"];
    console.log(zipGeo);

    const a = { latitude: zipGeo.latitude, longitude: zipGeo.longitude };
    const b = { latitude: zipGeo2.latitude, longitude: zipGeo2.longitude };

    console.log("haversine results: ----------------------");
    console.log(haversine(a, b)); // 714504.18 (in meters)
    console.log(metersToMiles(haversine(a, b))); //in miles
  };
  var auth = useSelector((state) => state.auth.authorized);

  const dispatch = useDispatch();

  // Within Certain Radius
  const zipWithinRadius = (zip, miles) => {
    // var arrayOfZips = zipcodes.radius(zip, miles);
    //  console.log('arrayOfZips Within Radius:',arrayOfZips);
    // select * from posts where zipcode ( IN arrayOfZips)
    // db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
    //////////////////////////////////////////////////
    // Posts.find( { zipcode: { $in: arrayOfZips } } )
    ///////////////////////////////////////////////////
    dispatch(postAction.postsWithinProximity(zip, miles))
      .then((res) => {
        console.log("result:", res);
        setCurrentPosts(res);
        setHaveCurrentPosts(true);
        setLoading(false);
        window.scrollTo(0, 0);
      })

      .catch((err) => console.log("error:", err));
  };

  const [currentPosts, setCurrentPosts] = useState([]);
  const [haveCurrentPosts, setHaveCurrentPosts] = useState(false);
  const [show, setShow] = useState(false);
  const [miles, setMiles] = useState(null);
  const [zipcode, setZipcode] = useState(null);

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
  const milesInput = useRef(null);
  const zipInput = useRef(null);
  const toggleShow = () => {
    setShow(!show);
  };
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
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //initial gets all users once.
    setLoading(true);
    dispatch(postAction.allSitePosts())
      .then(async (result) => {
        console.log("ALL POSTS RESULTS USEEFFECT:", result);
        setCurrentPosts(result);
        setHaveCurrentPosts(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const sortByTitle = (posts) => {
    posts
      .sort((a, b) => (a.title > b.title ? 1 : -1))
      .map((post, i) => {
        return <PostDisplayCard key={i} post={post}></PostDisplayCard>;

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
    window.scrollTo(0, 0);
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
            if (post.dateCreated === "2021-04-21T20:57:36.385Z") {
              return <>EXPIRED</>;
            } else {
              return (
                // <PostDisplayCard key={i} post={post} ></PostDisplayCard>
                <AllSitePostsDisplayCard
                  key={i}
                  post={post}
                ></AllSitePostsDisplayCard>
              );
            }
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
    console.log("resetting all ...");
    getDefaultPosts();
    searchInputEl.current.value = "";
    searchInputEl.current.focus();
    //  setNoSort(true);
    // displayPosts()
  };

  const resetProximity = async () => {
    console.log("resetting proximity ...");
    getDefaultPosts();
    milesInput.current.value = "";
    zipInput.current.focus();
    //  setNoSort(true);
    // displayPosts()
  };
  // if (!auth) {
  //   return <div>not authorized.</div>;
  // }

  const handleZip = (e) => {
    console.log("e.target:", e.target);
    setZipcode(e.target.value);
  };

  const handleMiles = (e) => {
    console.log("e.target:", e.target);
    setMiles(e.target.value);
  };

  const handleProximityForm = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("handle proximity form....");
    console.log(miles + "from " + zipcode);
    zipWithinRadius(zipcode, miles);
  };

  return (
    <Grid
      container
      spacing={0}
      className="main-component-container component-background-image"
    >
      <div style={{ position: "absolute", bottom: "25%", left: "50%" }}>
        <FadeLoader
          color={"red"}
          loading={loading}
          size={1}
          height={4}
          width={2}
        />
      </div>
      <Grid
        container
        spacing={0}
        style={{
          position: "fixed",
          top: "60px",
          left: "0px",
          right: "0px",
          zIndex: "100",
          background: "#fff",
          paddingTop: "1em",
          fontSize: ".7em",
          boxShadow: "1px 1px 4px #333",
        }}
        className="filter-grid"
      >
        <Grid container alignItems="center">
        <Grid item xs={12} sm={1}>
        <button
          onClick={toggleShow}
          style={{ cursor: "button", fontSize: "1.2em" }}
        >
          {show ? "Hide" : "Filter"}
        </button>
        </Grid>
        {show && (
          <>
            
              <Grid item xs={12} sm={4}>
                <label className="filterLabel" >Type:</label>
                <input
                  type="radio"
                  id="name"
                  name="sortOption"
                  value="name"
                  onChange={setSortOption}
                  className="radioInput"
                />
                <label htmlFor="name" className="radioLabel">
                  Title
                </label>
                <input
                  type="radio"
                  id="latest"
                  name="sortOption"
                  value="latest"
                  onChange={setSortOption}
                  className="radioInput"
                />
                <label htmlFor="latest" className="radioLabel">
                  Latest
                </label>
                <input
                  type="radio"
                  id="postType1"
                  name="sortOption"
                  value="postType1"
                  onChange={setSortOption}
                  className="radioInput"
                />
                <label htmlFor="postType1" className="radioLabel">
                  Looking For Work
                </label>
                <input
                  type="radio"
                  id="postType2"
                  name="sortOption"
                  value="postType2"
                  onChange={setSortOption}
                  className="radioInput"
                />
                <label htmlFor="postType2" className="radioLabel">
                  Hiring
                </label>
                <input
                  type="radio"
                  id="category"
                  name="sortOption"
                  value="category"
                  onChange={setSortOption}
                />
                <label htmlFor="category">Category</label>
              </Grid>

              <Grid item item xs={12} sm={3}>
                <label className="filterLabel" >Keyword:</label>
                <input
                  className="appInputAuto"
                  type="text"
                  id="filterKey"
                  name="filterKey"
                  onBlur={setFilterOption}
                  ref={searchInputEl}
                />
                <button className=" filterButton" style={{ cursor: "button" }}>
                  <Icon style={{ fontSize: "1em" }}>search</Icon>
                </button>
                <button
                  onClick={resetAll}
                  style={{ cursor: "button" }}
                  className=" filterButton"
                >
                  <Icon style={{ fontSize: "1em" }}>refresh</Icon>
                </button>
              </Grid>

              <Grid item xs={12} sm={3}    >
                <form style={{ fontSize: "1em" }}>
                  <label className="filterLabel" >Location:</label>
                  <input
                    type="number"
                    className="appTinyInput"
                    placeholder="miles"
                    onChange={handleMiles}
                    value={miles}
                    name="miles"
                    ref={milesInput}
                  ></input>
                  <label> from </label>
                  <input
                    type="text"
                    className="appTinyInput"
                    placeholder="zipcode"
                    onChange={handleZip}
                    name="zipcode"
                    value={zipcode}
                    ref={zipInput}
                  />
                  <button
                    type="submit"
                    className="filterButton"
                    onClick={handleProximityForm}
                    style={{ cursor: "button" }}
                  >
                    find
                  </button>

                  <button onClick={resetProximity} className="filterButton">
                    <Icon style={{ fontSize: "1em" }}>refresh</Icon>
                  </button>
                </form>
              </Grid>
           
          </>
        )}
         </Grid>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "200px" }}>
        {haveCurrentPosts && displayPosts()}
      </Grid>

      <p className="cardDevNote">AllSitePostsPage</p>
    </Grid>
  );
};

export default AllSitePostsPage;

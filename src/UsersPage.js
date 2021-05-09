import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "../../redux/actions/authAction";
import PlainCard from "../cards/PlainCard";

const UsersPage = (props) => {
  var auth = useSelector((state) => state.auth.authorized);
  var haveUsers = useSelector((state) => state.auth.haveUsers);
  const dispatch = useDispatch();

  const [currentUsers,setCurrentUsers] = useState([])

  const [sortName, setSortName] = useState(false);
  const [sortEmail, setSortEmail] = useState(false);
  const [sortId, setSortId] = useState(false);
  const [sortZip, setSortZip] = useState(false);
  const [sortState, setSortState] = useState(false);
  const [noSort, setNoSort] = useState(true); //true by default

  const [filterKey,setFilterKey] = useState('')

  const getDefaultUsers = () => {
    //Function needed to handle case where search input empty or a space.
    dispatch(authAction.allUsers())
    .then(async (result) => {
      console.log("ALL USERS RESULTS FUNCTION:", result);
      setCurrentUsers(result)
    })
    .catch((err) => console.log(err));
  }

  const getFilteredUsers = (key) => {
    dispatch(authAction.filterUsers(key))
    .then(async (result) => {
      console.log(" --oo--  FILTERED USERS RESULTS:", result);
      setCurrentUsers(result)
    })
    .catch((err) => console.log(err));
  }


  useEffect(() => {
    //initial gets all users once.
    dispatch(authAction.allUsers())
      .then(async (result) => {
        console.log("ALL USERS RESULTS USEEFFECT:", result);
        setCurrentUsers(result)
      })
      .catch((err) => console.log(err));
   }, []);
   
  

  const sortByFullName = (users) => {
    users
      .sort((a, b) => (a.fullName > b.fullName ? 1 : -1))
      .map((user, i) => {
        return <PlainCard key={i} user={user}></PlainCard>;
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
    console.log('SETTING FILTER:');
    const key = e.target.value;
     
     
    if(key === '' || key === ' '){
       
      console.log('GET DEFAULT DATA BACK...')
      getDefaultUsers();
    }else{
      getFilteredUsers(key);
    }
    
  
  }

const displayUsers = () => {
   if(haveUsers){
    if( sortName){
      return(
        currentUsers
        .sort((a, b) => (a.fullName > b.fullName ? 1 : -1))
        .map((user, i) => {
          return <PlainCard key={i} user={user}></PlainCard>;
        })
      )
    } 
    if(sortEmail){
      return(
        currentUsers
        .sort((a, b) => (a.email > b.email ? 1 : -1))
        .map((user, i) => {
          return <PlainCard key={i} user={user}></PlainCard>;
        })
      )
     
    }
    if(sortId){
      return(
        currentUsers
        .sort((a, b) => (a._id > b._id ? 1 : -1))
        .map((user, i) => {
          return <PlainCard key={i}  user={user}></PlainCard>;
        })
      )

    }

    if(noSort){
      return(
        currentUsers.map((user, i) => {
          return <PlainCard  key={i} user={user}></PlainCard>;
        })
      )
    }
  }
 
   
}

if (!auth) {
  return <div>not authorized.</div>;
}
   

  return (
    <Grid container alignItems="center" justify="center">
       
      <p className="appDevNote" >UsersPage</p>

        <div  >
          <span>
            Sort Options:
            <input
              type="radio"
              id="name"
              name="sortOption"
              value="name"
              onChange={setSortOption}
            />
            <label htmlFor="name">Name</label>
            <input
              type="radio"
              id="email"
              name="sortOption"
              value="email"
              onChange={setSortOption}
            />
            <label htmlFor="email">Email</label>
            <input
              type="radio"
              id="id"
              name="sortOption"
              value="id"
              onChange={setSortOption}
            />
            <label htmlFor="id">Id</label>
          </span>
        </div>
        <div>
          <span>Filter:
          
            <input
              type="text"
              id="filterKey"
              name="filterKey"
              onBlur={setFilterOption}
            />
            <button>search</button>
          </span>
        </div>

        {haveUsers && displayUsers()}
 
       
      
    </div>
  );
};

export default UsersPage;

 

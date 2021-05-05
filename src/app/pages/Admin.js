import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import "./admin.css";

const AdminPage = (props) => {
  
  const [homeScore, setHomeScore] = useState(0);
  const [visitorScore, setVisitorScore] = useState(0);
  const [inning, setInning] = useState(0);
  const [outs, setOuts] = useState(0);
  const [balls, setBalls] = useState(0);
  const [walks, setWalks] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [lastUp, setLastUp] = useState("");
 
  const players = ['Colton','Gabe','Wesson','Weston','Wyeth','Joshua', 'Liam','Bryce','Sean','Gavin']


  const ball = () => {
    if(balls < 3){
      setBalls(balls+1)
    }else{
      alert("WALK")
      setWalks(walks + 1)
      setBalls(0)
    }
  }
  
  const strike = () => {
    if(strikes < 2){
      setStrikes(strikes+1)
    }else{
     
      if(outs < 2){
        setOuts(outs +1)
        alert("STRIKE OUT!")
      }else{
        alert('THREE OUTS!')
        switchAtBat() //reset outs,strikes,balls,walks
      }
      setStrikes(0);
    }
  }

  const out = () => {
    if(outs < 2){
      setOuts(outs + 1);
    }else{
       alert('THREE OUTS!')
       switchAtBat() //reset outs,strikes,balls,walks
       
    }
  }

  const scoreHome = () => {
    setHomeScore(homeScore + 1) 
  }

  const scoreVisitor = () => {
    setVisitorScore(visitorScore + 1) 
  }
  const nextInning = () => {
    setInning(inning + 1);
  }

  const switchAtBat = () => {
    setBalls(0);
    setWalks(0);
    setStrikes(0);
    setOuts(0);
  }


  const newGame = () => {
    setBalls(0);
    setWalks(0);
    setStrikes(0);
    setOuts(0);
    setInning(1);
    setHomeScore(0);
    setVisitorScore(0);
  }

  return (
    <Card className="baseball">
      <Grid
        container
        spacing={0}
        direction="row"
        className="main-component-container"
      >
        <Grid container align="center" justify="center">
          <Grid item xs={6}>
          <h3>Baseball</h3>

          </Grid>
          <Grid item xs={6}>
            <button onClick={newGame}>NEW</button>
          </Grid>
        </Grid>
        <Grid container align="center" justify="center" className="innings">
          <Grid item xs={6}>
            <label>Inning:</label><div className="stat">{inning}</div>
          </Grid>
          <Grid item xs={6}>
          <button onClick={nextInning}>+</button>
        </Grid>
        </Grid>
       
        <Grid container xs={12} className="scores">
          <Grid item xs={6} className="homeScore">
            <label>Home:</label><div className="stat">{homeScore}</div>
          </Grid>
          <Grid item xs={6} className="visitorScore">
            <label>Visitors:</label><div className="stat">{visitorScore}</div>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <button onClick={scoreHome}>+</button>
          </Grid>
          <Grid item xs={6}>
          <button onClick={scoreVisitor}>+</button>
          </Grid>
        </Grid>

        <Grid container className="ballsAndStrikes">
          <Grid item xs={4}>
            <label>Balls:</label><div className="stat balls">{balls}</div>
          </Grid>
          <Grid item xs={4}>
            <label>Strikes:</label><div className="stat strikes">{strikes}</div>
          </Grid>
          <Grid item xs={4}>
           <label>Outs:</label><div className="stat out">{outs}</div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
          <button onClick={ball}>+</button>
          </Grid>
          <Grid item xs={4}>
          <button onClick={strike}>+</button>
          </Grid>
          <Grid item xs={4}>
          <button onClick={out}>+</button>
          </Grid>
        </Grid>
        <Grid container >
          <Grid item xs={4}>
            <label>walks: </label><div className="stat">{walks}</div>
          </Grid>
        </Grid>
        <Grid container >
        <Grid item xs={6}>
          <label>Last Up:</label>
        </Grid>
        <Grid item xs={6}>
        <select>
         {
           players.map( (p,i) => {
             return (
               <option key={i}>{p}</option>
             )
           })
         }
        </select>
        </Grid>
      
        </Grid>
       
        
      </Grid>
    </Card>
  );
};

export default AdminPage;

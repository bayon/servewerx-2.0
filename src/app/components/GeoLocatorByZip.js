//For Google Maps: npm install google-maps-react --save  --legacy-peer-deps
// Google: had to set up Sprite-Pilot project with Billing inorder to get it to operate.
import Grid from "@material-ui/core/Grid";
import { GoogleApiWrapper, Map } from "google-maps-react";
import React, { useEffect, useState } from "react";

var zipcodes = require("zipcodes");

function GeoLocatorByZip(props) {
   

  const zipInfo = (zipNumber) => {
    var zInfo = zipcodes.lookup(zipNumber);
    console.log("Zip Info:", zInfo);
    return zInfo;
  };

  //alert('zip '+props)
  console.log("props sent in to geolocator: props:", props);

  const [geoState, setGeoState] = useState({});
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [pos, setPos] = useState({});

  //get lat and lng from zipcode HERE:
  const zipToInfo = zipInfo(props.zip);
  console.log("zipToInfo:", zipToInfo);
  const latitude = zipToInfo.latitude;
  const longitude = zipToInfo.longitude;

  console.log("zip:", props.zip);

  const [ready, setReady] = useState(false);
  //google maps
  // const mapStyles = {
  //   width: "33%",
  //   height: "33%",
  //   transform: "translate(33%, 0%)",
  // };

    const mapStyles = {
    
    height: "50%",
    width:"70vw"
    // transform: "translate(33%, 0%)",
  };

  const [name, setName] = useState("React"); //google maps example ?

  useEffect(() => {
    console.log("jack");
    if (navigator) {
      console.log("yes");
    } else {
      console.log("no");
    }
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLat(latitude);
        setLng(longitude);
        console.log("lat and lng:", lat, lng);
        setReady(true);
        props.callback()
       },
      function (error) {
        console.error("Error Code=" + error.code + " - " + error.message);
      }
    );

    // navigator.geolocation.getCurrentPosition(
    //   function (position) {
    //     setPos(position);
    //     console.log("pos", pos);
    //   },
    //   function (error) {
    //     console.error("Error Code=" + error.code + " - " + error.message);
    //   }
    // );

    // WATCH CHANGES in LOCATION
    //   navigator.geolocation.watchPosition(function(position) {
    //     console.log("Latitude is :", position.coords.latitude);
    //     console.log("Longitude is :", position.coords.longitude);
    //   });
  }, [lat, lng]);

  const onMarkerClick = () => {
    console.log("clicked it...");
  };
  return (
    <Grid container>
     

      {ready && (
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            marginRight: "auto",
            marginLeft: "auto",
           marginBottom:"auto"
          }}
        >
          <Map
            google={props.google}
            zoom={14}
             style={mapStyles}
            initialCenter={{
              lat: lat,
              lng: lng,
            }}
          ></Map>

          {/* <Marker
   onClick={this.onMarkerClick}
   name={'This is test name'}
             /> */}
        </Grid>
      )}
    </Grid>
  );
}
//process.env.REACT_APP_GOOGLE_API_KEY,
export default GoogleApiWrapper({
  apiKey: "AIzaSyAuC2WeupS3eQM5xkQUrpkr-O9NxzdihlY",
})(GeoLocatorByZip);

/*
city: "Louisville"
country: "US"
latitude: 38.189
longitude: -85.6768
state: "KY"
zip: "40292"
*/



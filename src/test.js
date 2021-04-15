import {
    FreeCamera,

    HemisphericLight,
    MeshBuilder, Vector3
} from "@babylonjs/core";
// import Koji from '@withkoji/core';
import * as BABYLON from "babylonjs";
import React from "react";
import "./App.css";
import SceneComponent from "./SceneComponent"; // uses above component in same directory

let box;
const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());
  const canvas = scene.getEngine().getRenderingCanvas();
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  // Default intensity is 1. Let's dim the light a small amount
  /////////////////

  var mat = new BABYLON.StandardMaterial("mat", scene);
  var texture = new BABYLON.Texture(
    "http://jerome.bousquie.fr/BJS/images/spriteAtlas.png",
    scene
  );
  mat.diffuseTexture = texture;

  //   var columns = 6;  // 6 columns
  //   var rows = 4;  // 4 rows

  //   var faceUV = new Array(1);

  //   //for (var i = 0; i < 1; i++) {
  //       //faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
  //      // faceUV[0] = new BABYLON.Vector4(1, 1, 1, 1 );
  //  // }

  var columns = 6; // 6 columns
  var rows = 4; // 4 rows

  var faceUV = new Array(6);

  //set all values to zero
  for (var i = 0; i < 6; i++) {
    faceUV[i] = new BABYLON.Vector4(0, 0, 0, 0);
  }

  //overwrite wanted face with sprite coordinates
  faceUV[1] = new BABYLON.Vector4(3 / columns, 0, (3 + 1) / columns, 1 / rows);
  var x = 3 / columns;
  var y = 0;
  var z = (3 + 1) / columns;
  var w = 1 / rows;
  faceUV[1] = new BABYLON.Vector4(x, y, z, w);

  var options = {
    width: 5,
    height: 5,
    depth: 5,
    faceUV: faceUV,
  };
  ///////////////
  light.intensity = 0.7;
  // Our built-in 'box' shape.
  // box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  box = MeshBuilder.CreateBox("box", options, scene);
  box.material = mat;
  // Move the box upward 1/2 its height
  box.position.y = 2.5;
  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};
/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

/////////////////////////
function App() {
  //////////////////
  console.log("testing babylonjs");
  return (
    <div className="App">
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="my-canvas"
      />
    </div>
  );
}

export default App;

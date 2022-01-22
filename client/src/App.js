import hand from "./Hand/hand.glb";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import React, { Component } from "react";

class App extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var width = 100;
    var height = 100;
    var intensity = 1.4;
    var rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
    rectLight.position.set(1, 1, 10);
    rectLight.lookAt(1, 1, 3);
    scene.add(rectLight);

    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .getElementsByClassName("three-canvas")[0]
      .appendChild(renderer.domElement);

    camera.position.z = 5;
    camera.position.y = 1;

    var bone;

    let loader = new GLTFLoader();
    loader.load(
      hand,
      (gltf) => {
        bone = gltf.scene.getObjectByName("Bone");
        scene.add(gltf.scene);
      },
      (xhr) => {
        console.log(xhr);
      }
    );

    var animate = function(){
      requestAnimationFrame(animate);
      if(bone){
        bone.rotation.x+=0.02;
      }
      renderer.render(scene, camera);
    }

    animate();

  }
  render() {
    return <div className="three-canvas" />;
  }
}

export default App;

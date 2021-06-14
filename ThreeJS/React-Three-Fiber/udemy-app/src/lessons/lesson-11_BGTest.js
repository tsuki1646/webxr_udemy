//import logo from './logo.svg';
import './App.css';
//import * as THREE from 'three';
import {Canvas, useFrame, useThree, extend, useLoader} from '@react-three/fiber';
import React, {useState, useRef, Suspense} from 'react';
//import { Physics, useBox, ... } from '@react-three/cannon'
import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter,
} from "three";
import * as THREE from 'three'
import { css, jsx } from '@emotion/react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
extend({OrbitControls});

const theme = css`
    width: 100vw;
    height: 100vh;
`;

const Orbit = () =>{
  //const state = useThree();
  const {camera, gl} = useThree();
  return (
    <orbitControls args={[camera, gl.domElement]}/>
  );
}

const Box = props =>{
  const ref = useRef();
  const texture = useLoader(
    THREE.TextureLoader, 
    '/textures/lakeside.jpg');
  useFrame(state =>{
    console.log(state);
    //ref.current.rotation.x += 0.01;
    //ref.current.rotation.y += 0.01;
  })
  return(
    <mesh ref={ref} {...props} castShadow receiveShadow>
      {/* <boxBufferGeometry/> */}
      <boxBufferGeometry args={[1,1,1]}/>
      <meshPhysicalMaterial 
        map={texture}
        //color='blue' 
      //color='white' 
      //fog={false}
      //opacity={0.7}
      transparent
      //visible={false}
      //wireframe
      //metalness = {1}
      roughness = {0}
      clearcoat = {1}
      //transmission = {0.5}
      reflectivity = {1}
      />
    </mesh>
  )
}

const Background = props =>{
  const texture = useLoader(THREE.TextureLoader, 
    '/textures/autoshop_01.jpg');

  const {gl} = useThree();

  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height)
    .fromEquirectangularTexture(gl, texture);

  return (
    //null
    <primitive 
      attach='background' 
      //object ={texture}
      object ={formatted}
    />
  )
}

// Loads the skybox texture and applies it to the scene.
const SkyBox = () =>{
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "textures/cubemap/px.png",
    "textures/cubemap/nx.png",
    "textures/cubemap/py.png",
    "textures/cubemap/ny.png",
    "textures/cubemap/pz.png",
    "textures/cubemap/nz.png",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

const Floor = props =>{
  return(
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[20,0.01,10]}/>
      <meshPhysicalMaterial/>
    </mesh>
  )
}

const Bulb = props =>{
  return (
    <mesh {...props} >
      <pointLight castShadow
      shadow-mapSize-height={512}
      shadow-mapSize-width={512}
      />
      <sphereBufferGeometry args={[0.2]}/>
      <meshPhongMaterial emissive ='yellow'/>
    </mesh>
  )
}

function Lession11BG() {
  return (
    <div style={{height: '100vh', width:'100vw'}}>
      <Canvas shadows
        //shadowMap
        style={{background: 'black'}} 
        camera={{position: [3,3,3]}} 
        gl={{ antialias: false }} pixelRatio={window.devicePixelRatio}
      >
        {/* <fog attach = 'fog' args={['white', 1, 10]}/> */}
        
        <Floor position={[0,-0.5,0]}/>
        <ambientLight intensity={0.2}/>
        
        <Bulb position={[0,3,0]}/>
        <Orbit/>
        <axesHelper args={[5]}/>
        <Suspense fallback={null}>
          <Box position={[0,1,0]}/>
        </Suspense>
        <SkyBox/>
        {/* <Suspense fallback={null}>
          <Background/>
        </Suspense> */}
      </Canvas>
    </div>
    
  );
}

export default Lession11BG;

//import logo from './logo.svg';
import './App.css';
//import * as THREE from 'three';
import {Canvas, useFrame, useThree, extend, useLoader} from '@react-three/fiber';
import React, {useState, useRef, Suspense} from 'react';
//import { Physics, useBox, ... } from '@react-three/cannon'
import {
  CubeTextureLoader
} from "three";
import * as THREE from 'three'
import { css, jsx } from '@emotion/react';
import emotionReset from 'emotion-reset';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
extend({OrbitControls});

// const globalStyles = css`
//     ${emotionReset}
//     *, *::after, *::before {
//         box-sizing: border-box;
//         -moz-osx-font-smoothing: grayscale;
//         -webkit-font-smoothing: antialiased;
//         font-smoothing: antialiased;
//     }
// `;

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
    //console.log(state);
    //ref.current.rotation.x += 0.01;
    //ref.current.rotation.y += 0.01;
  });

  const handlePointerDown = e =>{
    console.log(e)
    e.object.active = true;
    if(window.activeMesh)
    {
      scaleDown(window.activeMesh);
      window.activeMesh.active = false;
    } 
    window.activeMesh = e.object
  }

  const handlePointerEnter = e =>{
    e.object.scale.x = 1.5
    e.object.scale.y = 1.5
    e.object.scale.z = 1.5
  }

  const handlePointerLeave = e =>{
    if(!e.object.active){
      scaleDown(e.object)
    }   
  }

  const scaleDown = object =>{
    object.scale.x = 1
    object.scale.y = 1
    object.scale.z = 1
  }

  return(
    <mesh 
      ref={ref} 
      {...props} 
      castShadow 
      //receiveShadow
      onPointerDown = { handlePointerDown }
      onPointerEnter = { handlePointerEnter }
      onPointerLeave = { handlePointerLeave }
    >
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
    process.env.PUBLIC_URL + '/textures/autoshop_01.jpg');

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

function App() {
  const handleClick = e =>{
    if(!window.activeMesh) return;
    window.activeMesh.material.color = new THREE.Color(e.target.style.background)
  }

  return (
    <div style={{height: '100vh', width:'100vw'}}>
      <div style={{position: 'absolute', zIndex: 1}}>
        <div
          onClick = {handleClick} 
          style = {{
            background:'blue', 
            height:50, 
            width: 50
          }}>
        </div>
        <div
          onClick = {handleClick}
          style = {{
            background:'yellow', 
            height:50, 
            width: 50
          }}>
        </div>
        <div
          onClick = {handleClick}
          style = {{
            background:'white', 
            height:50, 
            width: 50
          }}>
        </div>
      </div>
      <Canvas shadows
        //shadowMap
        style={{background: 'black'}} 
        camera={{position: [7,7,7]}} 
        gl={{ antialias: true }} pixelRatio={window.devicePixelRatio}
      >
        {/* <fog attach = 'fog' args={['white', 1, 10]}/> */}
        
        <Floor position={[0,-0.5,0]}/>
        <ambientLight intensity={0.2}/>
        
        <Bulb position={[0,3,0]}/>
        <Orbit/>
        <axesHelper args={[5]}/>
        <Suspense fallback={null}>
          <Box position={[-4,1,0]}/>
        </Suspense>
        <Suspense fallback={null}>
          <Box position={[4,1,0]}/>
        </Suspense>
        <SkyBox/>
        <Suspense fallback={null}>
          <SkyBox/>
        </Suspense>
        {/* <Suspense fallback={null}>
          <Background/>
        </Suspense> */}
      </Canvas>
    </div>
    
  );
}

export default App;

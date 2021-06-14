//import logo from './logo.svg';
import './App.css';
//import * as THREE from 'three';
import {Canvas, useFrame, useThree, extend} from '@react-three/fiber';
import React, {useState, useRef} from 'react';
//import { Physics, useBox, ... } from '@react-three/cannon'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
extend({OrbitControls});

const Orbit = () =>{
  //const state = useThree();
  const {camera, gl} = useThree();
  return (
    <orbitControls args={[camera, gl.domElement]}/>
  );
}

const Box = props =>{
  const ref = useRef();
  useFrame(state =>{
    console.log(state);
    //ref.current.rotation.x += 0.01;
    //ref.current.rotation.y += 0.01;
  })
  return(
    <mesh ref={ref} {...props} castShadow receiveShadow>
      <boxBufferGeometry/>
      <meshStandardMaterial color='blue'/>
    </mesh>
  )
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

function Lesson9() {
  return (
    <div style={{height: '100vh', width:'100vw'}}>
      <Canvas shadows
        //shadowMap
        style={{background: 'black'}} 
        camera={{position: [3,3,3]}} 
      >
        <Box position={[-1,1,2]}/>
        <Floor position={[0,-0.5,0]}/>
        <ambientLight intensity={0.2}/>
        
        <Bulb position={[0,3,0]}/>
        <Orbit/>
        <axesHelper args={[5]}/>
      </Canvas>
    </div>
    
  );
}

export default Lesson9;

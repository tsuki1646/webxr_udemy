//import logo from './logo.svg';
import './App.css';
//import * as THREE from 'three';
import {Canvas, useFrame, useThree, extend} from '@react-three/fiber';
import {useRef} from 'react';
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
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  })
  return(
    <mesh ref={ref} {...props}>
      <boxBufferGeometry/>
      <meshBasicMaterial color='blue'/>
    </mesh>
  )
}

function Lesson8() {
  return (
    <div style={{height: '100vh', width:'100vw'}}>
      <Canvas 
        style={{background: 'black'}} 
        camera={{position: [3,3,3]}} 
      >
        {/* <Box position={[1,1,0]}/> */}
        <mesh>
          <meshBasicMaterial side={THREE.DoubleSide}/>
          {/* <geometry>
            <vector3 attachArray='vertices'/>
          </geometry> */}
          <bufferGeometry>
            {/* <face3 
              args={[0,1,1]}
              attachArray='faces'/> */}
            <vector3 
              attachArray='vertices'
            />
            <vector3 
              args={[0,1,1]}
              attachArray='vertices'
            />
            <vector3 
              args={[0,1,-1]}
              attachArray='vertices'
            />
          </bufferGeometry>
        </mesh> 
        <Orbit/>
        <axesHelper args={[5]}/>
      </Canvas>
    </div>
    
  );
}

export default Lesson8;

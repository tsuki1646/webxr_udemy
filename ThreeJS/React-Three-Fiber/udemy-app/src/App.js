//import logo from './logo.svg';
import './App.css';
import BackgroundTest from './components/Background';
import FloorTest from './components/Floor_test';
import BulbTest from './components/Bulb_test';
import SkyboxTest from './components/Skybox_test';
import ColorPickerTest from './components/ColorPicker_test';
import Orbit from './components/Orbit';
import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {Physics} from '@react-three/cannon'
import Cars from './components/Cars'
import CameraControls from './components/CameraControls'
import CameraButtons from './components/CameraButtons'
import Lights from './components/Lights'
import Effects from './components/Effects'

//import Dragable from './components/Dragable_test';
function App() {
  
  return (
    <div style={{height: '100vh', width:'100vw'}}>
      <ColorPickerTest/>
      <CameraButtons/>
      <Canvas shadows
        //shadowMap
        style={{background: 'black'}} 
        camera={{position: [7,7,7]}} 
        //gl={{ antialias: true }} pixelRatio={window.devicePixelRatio}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: false
        }}
      >
        {/* <fog attach = 'fog' args={['white', 1, 10]}/> */}
                
        <Lights/>
        
        <CameraControls />
        <Orbit />
        <axesHelper args={[5]}/>
        
        <Suspense fallback={null}>
          <SkyboxTest/>
        </Suspense>
        {/* <Suspense fallback={null}>
          <BackgroundTest/>
        </Suspense> */}
        <Physics>
          <Cars/>
          <FloorTest position={[0,-0.5,0]}/>
                  
        </Physics>
        <Effects/>        
      </Canvas>
    </div>
    
  );
}

export default App;

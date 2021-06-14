import {Suspense} from 'react';
import Model from './Model';
import DragableTest from './Dragable_test';
import BoundingBox from './BoundingBox';

const Cars = () =>{
    return (
        <Suspense fallback={null}>
            <DragableTest transformGroup>
              <BoundingBox 
                visible 
                position={[4, 4, 0]}
                dims = {[3,2,6]}
                offset ={[0,-0.4,0.8]}
              >
                <Model 
                  path='/tesla_model_3/scene.gltf'
                  scale = {new Array(3).fill(0.01)}
                  //position = {[4,0.6,0]}
                />
              </BoundingBox>                         
            </DragableTest>
            <DragableTest >
              <BoundingBox 
                visible 
                position={[-4, 4, 0]}
                dims = {[3,2,7]}
                offset ={[0,-0.8,0.2]}
              >
                <Model 
                  path='/tesla_model_s/scene.gltf'
                  scale = {new Array(3).fill(0.013)}
                  //position = {[0,-0.8,0]}
                />
              </BoundingBox>               
            </DragableTest>
            <group rotation={[0,Math.PI,0]}>
              <Model
                path='mech_drone/scene.gltf'
                scale={new Array(3).fill(0.01)}
              />
            </group>
            
          </Suspense>
    )
}

export default Cars
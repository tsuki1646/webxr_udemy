import {useEffect, useRef} from 'react'
import {useThree} from '@react-three/fiber'
//import { Scene } from 'three'

const Bulb_test = props =>{
  const ref = useRef()
  const {scene} = useThree()
  useEffect(() =>{
    if(scene.lights) scene.lights.push(ref)
    else scene.lights = [ref]
  }, [])

  return (
    <mesh {...props} >
      <pointLight 
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        shadow-radius = {10}
      />
      <sphereBufferGeometry args={[0.2]}/>
      <meshPhongMaterial emissive ='white'/>
    </mesh>
  )
}

export default Bulb_test;
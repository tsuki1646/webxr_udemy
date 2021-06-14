import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo } from 'react';

const Background_test = props =>{
  const texture = useLoader(THREE.TextureLoader, 
    textures/autoshop.jpg');

  const {gl} = useThree();
  const formatted = useMemo(() =>{
    new THREE.WebGLCubeRenderTarget(
    texture.image.height)
    .fromEquirectangularTexture(gl, texture);
  }, [])

  return (
    //null
    <primitive 
      attach='background' 
      //object ={texture}
      object ={formatted}
    />
  )
}

export default Background_test;
import { useThree } from '@react-three/fiber';

import {
  CubeTextureLoader
} from "three";


const SkyBox_test = () =>{
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "textures/cubemap/0/px.png",
    "textures/cubemap/0/nx.png",
    "textures/cubemap/0/py.png",
    "textures/cubemap/0/ny.png",
    "textures/cubemap/0/pz.png",
    "textures/cubemap/0/nz.png",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

export default SkyBox_test;
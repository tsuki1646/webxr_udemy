import BulbTest from './Bulb_test';

const Lights = ({}) =>{
    return (
        <>
            <ambientLight intensity={0.2}/>    
            <directionalLight 
            shadow-mapSize-height={2**10}
            shadow-mapSize-width={2**10}
            shadow-radius={10}
            position={[6,3,0]}
            intensity={2}
            castShadow
            /> 
            <BulbTest position={[-6,3,0]}/>
            <BulbTest position={[0,3,0]}/>
            <BulbTest position={[6,3,0]}/>
        </>
    )
}
export default Lights
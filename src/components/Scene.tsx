import { OrbitControls } from "@react-three/drei"
import { useThree, useLoader, useFrame } from "@react-three/fiber"
import { AmbientLight } from "@threlte/core"
import { useEffect, useReducer, useRef, useState } from "react"
import { Mesh, Raycaster, TextureLoader } from "three"





export default function Scene() {
    const map = useLoader(TextureLoader, '8081_earthmap10k.jpg')
    const bumpMap = useLoader(TextureLoader,'8081_earthbump10k.jpg')
    const cloudMap = useLoader(TextureLoader,'8081_earthhiresclouds4K.jpg')
    const cloudMapTransparent = useLoader(TextureLoader,'earthcloudmaptrans.jpg')
    const earthRadius = .6371
    
      
     const cloudRotation = useRef(0)
     const displacementScale = useRef(0.01)
     const cloudRef = useRef( new Mesh())
     const earthRef = useRef( new Mesh())
     const rayCasterRef = useRef( new Raycaster())
     const enableClouds = useRef(false)
     const [detailLevel, setDetailLevel ]= useState(0.5)
     const [blobs, setBlobs] = useState<{position: [number,number,number]}[]>([])
    const {scene} = useThree()
    
    const addBlob = (x: number ,y: number,z: number) => {
        setBlobs([...blobs, {position: [x,y,z]}])    
    }
    const handleClick = (e: any) => {
        console.log(e)
        addBlob(e.point.x, e.point.y, e.point.z)
        console.log(blobs)
    }
   
      
    useEffect(() => {
       
      console.log(scene)
      console.log(rayCasterRef.current)
    }, [scene, rayCasterRef])
  return (
    <>
    <OrbitControls maxZoom={3} />
    <raycaster ref={rayCasterRef}/>
    <ambientLight intensity={1}/>
    <mesh position={[0,0,0]} ref={earthRef} onPointerDown={(e) => handleClick(e)}>
        <sphereGeometry args={[earthRadius*4, earthRadius*360*detailLevel, earthRadius*1440]}/>
        <meshPhysicalMaterial map={map} displacementMap={bumpMap} displacementScale={displacementScale.current}/>

    </mesh>
    {blobs.map((blob, index) => {
        return (
            <mesh position={blob.position} key={index} >
                <sphereGeometry args={[.01, 16, 16]}/>
                <meshBasicMaterial/>
            </mesh>
        )
    })}
   
    <mesh position={[0,0,0]} ref={cloudRef} visible={enableClouds.current}>
        <sphereGeometry args={[earthRadius*4.125, earthRadius*720, earthRadius*720]}/>
        <meshPhysicalMaterial color={0xffffff} map={cloudMap}  displacementMap={cloudMap} displacementScale={.0125} transparent opacity={.5} iridescence={.5} />

    </mesh>
    
    </>
  )
}

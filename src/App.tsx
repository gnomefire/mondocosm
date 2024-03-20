import {Canvas, extend, Object3DNode }from '@react-three/fiber'

import {Loader3DTiles} from 'three-loader-3dtiles'

import './App.css'
import { useEffect } from 'react'
import Scene from './components/Scene'

class MyLoader extends Loader3DTiles {}

extend({ MyLoader })

declare module '@react-three/fiber' {
  interface ThreeElements {
    myLoader: Object3DNode<MyLoader, typeof MyLoader>
  }
  
}
function App() {
  
  useEffect(() => {
      
     
    })
  return (
    <>
    <div id="canvas-container" style={{ width: '100%', height: '100%', position: 'absolute', margin:0 }}>
      <Canvas camera={{ position: [0, 0, 5] }} >
      <Scene/>
      <perspectiveCamera/>
      </Canvas>
      </div>
    </>
  )
}

export default App

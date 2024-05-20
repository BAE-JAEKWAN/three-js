'use client'

import Image from 'next/image'
import styles from './page.module.css'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  DirectionalLight,
  SRGBColorSpace,
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useEffect, useRef } from 'react'

const Home = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const renderer = new WebGLRenderer({
    canvas: canvas.current ? canvas.current : undefined,
    antialias: true,
  })
  renderer.outputColorSpace = SRGBColorSpace // 색상 인코딩. 이게 없으면 모델링 예제와 색이 다르게 나올수도.

  // 1. 장면 생성
  const scene = new Scene()

  // 2. 카메라 생성
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0.3, 1) // 카메라 위치 설정
  let light = new DirectionalLight(0xffff00, 10)
  scene.background = new Color('white')

  // 3. 3D모델을 불러오는 로더 생성
  const loader = new GLTFLoader()
  loader.load(
    '/3D_model/armchair_amarantha_by_porada/scene.gltf',
    function (gltf) {
      scene.add(gltf.scene)
      scene.add(light)
      renderer.render(scene, camera)
    },
    undefined,
    error => {
      console.error(error)
    }
  )

  useEffect(() => {}, [])

  return (
    <main className={styles.main}>
      <div>3D 모델 들어갈 자리</div>
      <canvas ref={canvas} width={'500'} height={'500'}></canvas>
    </main>
  )
}

export default Home

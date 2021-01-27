// @ts-ignore
import * as THREE from "three"

import {createRenderer} from '../utils/index'

window.onload = function () {
    const canvas: HTMLCanvasElement = document.querySelector("#canvas")
    window.document.body.removeChild(canvas)
    init()
}

function init(): void {
    const scene: THREE.Scene = new THREE.Scene()
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    const render: THREE.WebGLRenderer = new THREE.WebGLRenderer()
    render.setClearColor(new THREE.Color(0x000000))
    render.setSize(window.innerWidth, window.innerHeight)
    render.shadowMap.enabled = true

    scene.fog = new THREE.Fog(0xffffff, 0.015, 100)

    const axes: THREE.AxesHelper = new THREE.AxesHelper(20)

    scene.add(axes)

    const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(60, 60)
    const planeMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xAAAAAA
    })
    const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(0, 0, 0)
    scene.add(plane)

    const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubeMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    })
    const cubeList: Array<THREE.Mesh> = []
    const cube: THREE.Mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.position.set(-4, 3, 0)
    scene.add(cube)
    cubeList.push(cube)

    const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    const sphereMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    })

    const sphere: THREE.Mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.castShadow = true
    sphere.position.set(20, 3, 0)
    scene.add(sphere)

    const spotLight: THREE.Light = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-40, 40, -15)
    spotLight.castShadow = true
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    spotLight.shadow.camera.far = 130
    spotLight.shadow.camera.neer = 40

    scene.add(spotLight)

    camera.position.set(0, 40, 30)
    camera.lookAt(scene.position)

    const controller = {
        rotationSpeed: 0.02,
        bounceSpeed: 0.04,
        addCube() {
            const size: number = Math.ceil((Math.random() * 4))
            const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(size, size, size)
            const cubeMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff * Math.random(),
            })
            const cube: THREE.Mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.castShadow = true
            cube.position.set(Math.ceil(Math.random() * 60) - 30, 3, Math.ceil(Math.random() * 60) - 30)
            scene.add(cube)
            cubeList.push(cube)
        }
    }


    function rotationCube() {
        for (let i = 0; i < cubeList.length; i++) {
            cubeList[i].rotation.x += controller.rotationSpeed
            cubeList[i].rotation.y += controller.rotationSpeed
            cubeList[i].rotation.z += controller.rotationSpeed
        }

    }

    let step: number = 0

    function bounceSphere() {
        step += controller.bounceSpeed
        sphere.position.x = 20 + 10 * Math.cos(step)
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))
    }

    function renderScene() {
        rotationCube()
        bounceSphere()
    }

    let {renderer, gui} = createRenderer({render, scene, camera, cb: renderScene})
    gui.add(controller, "rotationSpeed", 0.01, 0.5)
    gui.add(controller, "bounceSpeed", 0.01, 0.5)
    gui.add(controller, "addCube")
    renderer()
}

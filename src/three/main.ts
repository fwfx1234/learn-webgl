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

    const axes: THREE.AxesHelper = new THREE.AxesHelper(40)

    scene.add(axes)



    const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(8, 8, 8)
    const cubeMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
        color: 0x00eeee,
        wireframe: true
    })
    cubeMaterial.transparent = true
    cubeMaterial.opacity = 0.7
    const cube: THREE.Mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
    scene.add(cube)

    const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    const sphereMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    })


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
        }
    }


    function rotationCube() {


    }

    let step: number = 0

    function bounceSphere() {
        step += controller.bounceSpeed
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

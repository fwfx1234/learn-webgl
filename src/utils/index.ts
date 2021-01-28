// @ts-ignore
import * as Stats from "stats.js"

// @ts-ignore
import * as dat from 'dat.gui';

// @ts-ignore
import * as THREE from "three"

// @ts-ignore
import {TrackballControls} from './TrackballControls'


export function gui() {
    const gui = new dat.GUI();
    document.documentElement.append(gui.dom)
    return gui
}

export function initStats() {
    const stats = new Stats()
    document.documentElement.append(stats.dom)
    return stats
}

const ref = window.requestAnimationFrame


interface IRenderParams {
    render: THREE.Renderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    cb: Function,
}
interface IRenderResult {
    renderer: Function
    gui: dat.GUI
}
export function createRenderer(r: IRenderParams): IRenderResult {
    const stats = initStats();
    const g:dat.GUI = gui()
    document.body.append(r.render.domElement)

    const trackballControls = new TrackballControls(r.camera, r.render.domElement)
    const clock = new THREE.Clock()
    window.addEventListener('resize', () => {
        if (r.camera instanceof THREE.PerspectiveCamera) {
            r.camera.aspect = window.innerWidth / window.innerHeight
            r.camera.updateProjectionMatrix()
        }
        r.render.setSize(window.innerWidth, window.innerHeight)
    }, false)
    const renderer = () => {
        trackballControls.update(clock.getDelta())
        stats.update()
        r.cb()
        r.render.render(r.scene, r.camera)
        ref(renderer)
    }
    return {
        renderer,
        gui: g
    }
}



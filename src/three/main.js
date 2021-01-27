import * as THREE from "three";
import { createRenderer } from '../utils/index';
window.onload = function () {
    var canvas = document.querySelector("#canvas");
    window.document.body.removeChild(canvas);
    init();
};
function init() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var render = new THREE.WebGLRenderer();
    render.setClearColor(new THREE.Color(0x000000));
    render.setSize(window.innerWidth, window.innerHeight);
    render.shadowMap.enabled = true;
    scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
    var planeGeometry = new THREE.PlaneGeometry(60, 60);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xAAAAAA
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    scene.add(plane);
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    });
    var cubeList = [];
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.set(-4, 3, 0);
    scene.add(cube);
    cubeList.push(cube);
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.set(20, 3, 0);
    scene.add(sphere);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.neer = 40;
    scene.add(spotLight);
    camera.position.set(0, 40, 30);
    camera.lookAt(scene.position);
    var controller = {
        rotationSpeed: 0.02,
        bounceSpeed: 0.04,
        addCube: function () {
            var size = Math.ceil((Math.random() * 4));
            var cubeGeometry = new THREE.BoxGeometry(size, size, size);
            var cubeMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff * Math.random(),
            });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;
            cube.position.set(Math.ceil(Math.random() * 60) - 30, 3, Math.ceil(Math.random() * 60) - 30);
            scene.add(cube);
            cubeList.push(cube);
        }
    };
    function rotationCube() {
        for (var i = 0; i < cubeList.length; i++) {
            cubeList[i].rotation.x += controller.rotationSpeed;
            cubeList[i].rotation.y += controller.rotationSpeed;
            cubeList[i].rotation.z += controller.rotationSpeed;
        }
    }
    var step = 0;
    function bounceSphere() {
        step += controller.bounceSpeed;
        sphere.position.x = 20 + 10 * Math.cos(step);
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
    }
    function renderScene() {
        rotationCube();
        bounceSphere();
    }
    var _a = createRenderer({ render: render, scene: scene, camera: camera, cb: renderScene }), renderer = _a.renderer, gui = _a.gui;
    gui.add(controller, "rotationSpeed", 0.01, 0.5);
    gui.add(controller, "bounceSpeed", 0.01, 0.5);
    gui.add(controller, "addCube");
    renderer();
}
//# sourceMappingURL=main.js.map
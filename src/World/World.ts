import "./main.css";
import { GridHelper, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three";
// Components
import { loadBirds } from "./components/birds/birds";
import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createMeshGroup } from "./components/meshGroup";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";
// Systems
import { createControls } from "./systems/controls";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";
import { Updatable } from "./systems/Updatable";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let loop: Loop;
let controls: Updatable<OrbitControls>;
let cube: Updatable<Mesh>;

enum Bird {
    Stork, Flamingo, Parrot
}
let focusedBird = Bird.Flamingo;
console.log(focusedBird);

class World {
    switchBirdFocus!/*<- `!`: this will definitely be assigned */: () => void;
    setAnimationWeight!/*<- `!`: this will definitely be assigned */: (weight: number) => void;

    constructor(container: Element) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        cube = createCube();

        controls = createControls(camera, renderer.domElement);
        // controls.object.target.copy(cube.object.position);
        controls.object.enableDamping = true;
        controls.object.zoomSpeed = 3;
        console.log(controls.object.dampingFactor);

        const { ambientLight, mainLight } = createLights();

        // controls.object.addEventListener("change", () => this.render());

        const meshGroup = createMeshGroup();


        loop.updatables.push(
            cube, meshGroup,
            controls
        );

        const gridHelper = new GridHelper(5, 25, "gray", "gray");
        scene.add(gridHelper);

        scene.add(cube.object, camera, meshGroup.object, mainLight, ambientLight/*, lightbulb, ambientLight2*/);

        new Resizer(container, camera, renderer);
    }

    start() { loop.start(); }

    stop() { loop.stop(); }

    render() { renderer.render(scene, camera); }

    newCameraPosition() {
        camera.position.setX(Math.random() * 100);
        camera.position.setY(Math.random() * 100);
        camera.lookAt(cube.object.position);
    }

    async init() {
        const { parrot, flamingo, stork, seashell, weirdness } = await loadBirds();

        controls.object.target.copy(flamingo.object.object.position);

        this.switchBirdFocus = () => {
            focusedBird += 1;

            switch (focusedBird) {
                default:
                    focusedBird = Bird.Stork;
                case Bird.Stork:
                    controls.object.target.copy(stork.object.object.position);
                    break;
                case Bird.Flamingo:
                    controls.object.target.copy(flamingo.object.object.position);
                    break;
                case Bird.Parrot:
                    controls.object.target.copy(parrot.object.object.position);
                    break;
            }
        };
        this.setAnimationWeight = weight => {
            parrot.object.action.setEffectiveWeight(weight);
            flamingo.object.action.setEffectiveWeight(weight);
            stork.object.action.setEffectiveWeight(weight);
        };

        loop.updatables.push(parrot, flamingo, stork);
        scene.add(parrot.object.object, flamingo.object.object, stork.object.object, seashell, weirdness);
    }
};


export { World };

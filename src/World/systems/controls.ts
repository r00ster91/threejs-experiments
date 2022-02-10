import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Updatable } from "./Updatable";

function createControls(camera: PerspectiveCamera, canvas: HTMLElement) {
    const controls = new OrbitControls(camera, canvas);

    const updatable: Updatable<OrbitControls> = {
        object: controls,
        tick: () => controls.update()
    };

    return updatable;
}

export { createControls };

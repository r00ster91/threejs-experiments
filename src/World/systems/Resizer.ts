import { PerspectiveCamera, WebGLRenderer } from "three";

function setSize(container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    // The camera's aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setPixelRatio(window.devicePixelRatio);
}

class Resizer {
    constructor(container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) {
        setSize(container, camera, renderer);

        window.addEventListener("resize", () => setSize(container, camera, renderer));
    }
};

export { Resizer };

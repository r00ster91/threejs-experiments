import { WebGLRenderer } from "three";

function createRenderer() {
    // The renderer is what paints the scene it sees through the camera onto the screen.
    const renderer = new WebGLRenderer({ antialias: true });

    // turn on the physically correct lightning model
    renderer.physicallyCorrectLights = true;

    return renderer;
}

export { createRenderer };

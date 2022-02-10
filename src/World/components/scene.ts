import { Color, Scene } from "three";

function createScene() {
    // The scene is what contains all of our objects.
    const scene = new Scene();

    scene.background = new Color("aquamarine");

    return scene;
}

export { createScene };

import { PerspectiveCamera } from "three";

function createCamera() {
    // The camera decides what will be visible of the scene.
    // This camera's view is shaped like a frustum: https://discoverthreejs.com/images/first-steps/frustum.png
    const camera = new PerspectiveCamera(
        35, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane
        1000, // far clipping plane
    );

    // move the camera back so we can view the scene
    camera.position.set(0, 0, 10);

    // const light = new SpotLight("red", 10);
    // light.position.setZ(10);
    // camera.add(light);

    // const color = "white";
    // const intensity = 40.5;
    // const mainLight = new PointLight(color, intensity);


    // mainLight.position.set(10, 10, 10);
    // camera.add(mainLight);

    // const updatable: Updatable<PerspectiveCamera> = {
    //     object: camera,
    //     tick: (delta) => {
    //         // mainLight.setRotationFromEuler(camera.rotation);

    //         // camera.position.z = (camera.position.z + 10 * delta) % 100;
    //     }
    // };

    // All objects are placed at the origin by default. Move it back towards us.
    return camera;
}

export { createCamera };

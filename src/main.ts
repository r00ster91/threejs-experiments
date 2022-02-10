import { World } from './World/World';

async function main() {
    // Get a reference to the container element
    const container = document.querySelector('#scene-container');

    // 1. Create an instance of the World app
    // We use the `!` non-null assertion operator here because if it is null, it's a bug that should never happen normally
    const world = new World(container!);

    await world.init();

    let animationControl = document.getElementById("animation-control");
    let running = true;
    // And here too, we use the `!` non-null assertion operator here because if it is null, it's a bug that should never happen normally
    animationControl!.onclick = () => {
        if (running) {
            world.stop();
        } else {
            world.start();
        }
        running = !running;
    };

    let cameraControl = document.getElementById("camera-control");
    cameraControl!.onclick = () => world.newCameraPosition();

    let switchBirdFocus = document.getElementById("switch-bird-focus");
    switchBirdFocus!.onclick = () => world.switchBirdFocus();

    let weightSlider = document.getElementById("weight-slider");
    weightSlider!.oninput = event => world.setAnimationWeight((event.target as HTMLInputElement).valueAsNumber);

    // 2. Render the scene
    world.start();
}

main().catch(error => console.error(error));

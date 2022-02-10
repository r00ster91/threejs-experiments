import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Updatable } from "../../systems/Updatable";
import { setupModel } from "./setupModel";
import { AnimatedModel } from "./setupModel";

async function loadBirds() {
    const loader = new GLTFLoader();

    // just imagine these are birds
    const seashellData = await loader.loadAsync("scene.gltf");
    const seashell = seashellData.scene.children[0];
    const weirdnessData = await loader.loadAsync("models/untitled.glb");
    const weirdness = weirdnessData.scene.children[0];
    weirdness.position.setY(50);

    const [parrotData, flamingoData, storkData] = await Promise.all([
        loader.loadAsync("models/Parrot.glb"),
        loader.loadAsync("models/Flamingo.glb"),
        loader.loadAsync("models/Stork.glb"),
    ]);

    console.log("Squawk!", parrotData);

    let timer = 0;
    const parrotModel = setupModel(parrotData);
    parrotModel.object.object.position.set(100, 0, -100);
    const parrot: Updatable<AnimatedModel> = {
        object: parrotModel.object,
        tick: (delta, elapsedTime) => {
            timer += 2.5 * delta;

            parrotModel.object.object.position.z += (125 * Math.cos(timer)) * delta;

            parrotModel.tick(delta, elapsedTime);
        }
    };

    const flamingoModel = setupModel(flamingoData);
    flamingoModel.object.object.position.set(0, -50, -150);
    const flamingo: Updatable<AnimatedModel> = {
        object: flamingoModel.object,
        tick: (delta, elapsedTime) => {
            flamingoModel.object.object.position.z += (125 * Math.sin(timer)) * delta;

            flamingoModel.tick(delta, elapsedTime);
        }
    };

    const storkModel = setupModel(storkData);
    storkModel.object.object.position.set(-100, 0, -100);
    const stork: Updatable<AnimatedModel> = {
        object: storkModel.object,
        tick: (delta, elapsedTime) => {
            storkModel.object.object.position.z += (125 * Math.cos(timer)) * delta;

            storkModel.tick(delta, elapsedTime);
        }
    };

    return { parrot, flamingo, stork, seashell, weirdness };
}

export { loadBirds };

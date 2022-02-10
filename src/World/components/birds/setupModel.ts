import { AnimationAction, AnimationMixer, Object3D } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Updatable } from "../../systems/Updatable";

class AnimatedModel {
    object: Object3D;
    action: AnimationAction;

    constructor(object: Object3D, action: AnimationAction) {
        this.object = object;
        this.action = action;
    }

    setEffectiveWeight(weight: number) {
        this.action.setEffectiveWeight(weight);
    }
}

function setupModel(data: GLTF) {
    const model = data.scene.children[0];
    const clip = data.animations[0];

    // const times = [0, 3, 6];
    // const values = [0, 0, 0, 200, 20, 20, 50, 50, 500];
    // const keyframeTrack = new VectorKeyframeTrack(".position", times, values);
    // clip.tracks.push(keyframeTrack);
    // clip.resetDuration();

    // const tracks = [keyframeTrack];
    // const clip = new AnimationClip("some animation clip", 1, tracks);

    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.startAt(1);
    action.play();

    const animatedModel = new AnimatedModel(model, action);

    const updatable: Updatable<AnimatedModel> = {
        object: animatedModel,
        tick: (delta, elapsedTime) => {
            mixer.update(delta);
            action.timeScale = Math.cos(0.5 + elapsedTime);

            if (elapsedTime > 25) {
                action.halt(2);
            }
        }
    };

    return updatable;
}

export { setupModel, AnimatedModel };

import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Updatable } from "./Updatable";

const clock = new Clock();

class Loop {
    camera: PerspectiveCamera;
    scene: Scene;
    renderer: WebGLRenderer;
    updatables: Array<Updatable<any>>;
    constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
        // This will send a constant stream of frames.
        this.renderer.setAnimationLoop(() => {
            // tick each animation forward by one frame!
            this.tick();

            // render it all
            this.renderer.render(this.scene, this.camera);
        });

        // As an alternative, there is also rendering on demand which consumes less device power.
        // Use rendering on demand if possible.
        // https://threejs.org/manual/#en/rendering-on-demand
        // It's best to render when there's actually a change
    }

    stop() { this.renderer.setAnimationLoop(null); }

    tick() {
        const delta = clock.getDelta();
        for (const updatable of this.updatables) {
            updatable.tick(delta, clock.elapsedTime);
        }
    }
}

export { Loop };

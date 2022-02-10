import { DirectionalLight, HemisphereLight } from "three";

function createLights() {
    const ambientLight = new HemisphereLight(
        "white", "darkslategrey", 2
    );
    // const ambientLight2 = new AmbientLight("white", 0.5);

    // const color = "white";
    // const intensity = 15;
    const mainLight = new DirectionalLight("white", 4);
    mainLight.position.set(10, 10, 10);

    ambientLight.color.set("white");

    // const lightbulb = new PointLight("yellow", 5);
    // lightbulb.position.setZ(3);

    return { ambientLight, mainLight/*, lightbulb, ambientLight2*/ };
}

export { createLights };

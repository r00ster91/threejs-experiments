import { Mesh, MeshStandardMaterial, TextureLoader, BoxBufferGeometry } from "three";
import { Updatable } from "../systems/Updatable";

function createMaterial() {
    const textureLoader = new TextureLoader();

    const texture = textureLoader.load("textures/PRI_Argopectengibbus_baseColor.jpeg");

    // The material is what defines the *look* of the mesh.
    // `MeshBasicMaterial` is the simplest and fastest material.
    // This one is the physically correct standard material
    const material = new MeshStandardMaterial({ map: texture });
    // const material = new MeshStandardMaterial({ color: "green", normalMap: texture, map: texture, bumpMap: texture, alphaMap: texture, emissiveMap: texture });
    // material.transparent = true;
    // material.opacity = 0.9;
    // material.bumpScale = 20.0;
    // material.emissive.set("red");
    // console.log(texture);
    // texture.offset.set(0.1, 0.25);
    // texture.repeat.set(2, 1.5);

    return material;
}

function createCube() {
    // The geometry is what defines the *shape* of the mesh.
    // BoxBufferGeometry is faster than BufferGeometry because it's typed and less dynamic.
    // https://stackoverflow.com/questions/49956422/what-is-difference-between-boxbuffergeometry-vs-boxgeometry-in-three-js
    // NB: units of size in three.js are METERS!
    const geometry = new BoxBufferGeometry(
        2, // meters
        2, // meters
        2 // meters
    );

    const material = createMaterial();

    // A `Mesh` is a triangular (made of triangles) polygon mesh/object.
    const cube = new Mesh(geometry, material);

    let timer = 0;
    const updatable: Updatable<Mesh> = {
        object: cube,
        tick: (delta) => {
            cube.rotation.x += 2 * delta;
            cube.rotation.y += 2 * delta;
            cube.rotation.z += 2 * delta;

            timer += 10 * delta;
            cube.position.y = 10 + (30 * Math.cos(timer)) * delta;
        }
    };

    return updatable;
}

export { createCube };

import { Group, MathUtils, Mesh, MeshNormalMaterial, MeshStandardMaterial, SphereBufferGeometry } from "three";
import { Updatable } from "../systems/Updatable";

function createMeshGroup() {
    const group = new Group();

    const geometry = new SphereBufferGeometry(0.25, 16, 16);

    const standardMaterial = new MeshStandardMaterial({ color: "indigo" });
    const normalMaterial = new MeshNormalMaterial();

    const protoSphere = new Mesh(geometry, standardMaterial);

    group.add(protoSphere);

    for (let i = 0; i < 20; i++) {
        const clonedSphere: Mesh<SphereBufferGeometry, MeshNormalMaterial> = protoSphere.clone();

        const i2 = i * 0.05;
        clonedSphere.position.x = Math.cos(2 * Math.PI * i2);
        clonedSphere.position.y = Math.sin(2 * Math.PI * i2);

        normalMaterial.flatShading = true;
        clonedSphere.material = normalMaterial;

        clonedSphere.scale.multiplyScalar(0.05 + i2);

        group.add(clonedSphere);
    }

    group.scale.multiplyScalar(2.5);

    protoSphere.add(group);
    const radiansPerSecond = MathUtils.degToRad(30);
    const updatable: Updatable<Mesh> = {
        object: protoSphere,
        tick: (delta) => {
            group.rotation.z += delta * radiansPerSecond;
        }
    };

    return updatable;
}

export { createMeshGroup };

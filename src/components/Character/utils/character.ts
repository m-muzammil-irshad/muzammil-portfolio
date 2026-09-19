import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF | null> => {
    try {
      const encryptedBlob = await decryptFile(
        "/models/character.enc?v=2",
        "MyCharacter12"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      return await new Promise<GLTF>((resolve, reject) => {
        loader.load(
          blobUrl,
          (gltf) => {
            void (async () => {
              try {
                const character = gltf.scene;
                await renderer.compileAsync(character, camera, scene);
                character.traverse((child) => {
                  if (!(child instanceof THREE.Mesh)) return;

                  if (
                    child.material instanceof THREE.MeshStandardMaterial &&
                    (child.name === "BODY.SHIRT" || child.name === "Pant")
                  ) {
                    const newMaterial = child.material.clone();
                    newMaterial.color.set(
                      child.name === "BODY.SHIRT" ? "#8B4513" : "#000000"
                    );
                    child.material = newMaterial;
                  }

                  child.castShadow = true;
                  child.receiveShadow = true;
                  child.frustumCulled = true;
                });

                setCharTimeline(character, camera);
                setAllTimeline();
                character.getObjectByName("footR")?.position.setY(3.36);
                character.getObjectByName("footL")?.position.setY(3.36);
                resolve(gltf);
              } catch (error) {
                reject(error);
              } finally {
                URL.revokeObjectURL(blobUrl);
                dracoLoader.dispose();
              }
            })();
          },
          undefined,
          (error) => {
            URL.revokeObjectURL(blobUrl);
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { loadCharacter };
};

export default setCharacter;

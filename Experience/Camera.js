import * as THREE from "three";
import Experience from "./Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;
    this.renderer = this.experience.renderer;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("camera");
    }

    // // Grid Helper
    // const size = 20;
    // const divisions = 20;

    // const gridHelper = new THREE.GridHelper( size, divisions );
    // this.scene.add(gridHelper)

    // // Axes Helper
    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);

    // Setup
    this.createOrthographicCamera();
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 2,
      (this.sizes.aspect * this.sizes.frustum) / 2,
      this.sizes.frustum / 2,
      -this.sizes.frustum / 2,
      -20,
      20,
    );
    // this.orthographicCamera = new THREE.PerspectiveCamera();
    // this.orthographicCamera = new THREE.CubeCamera(0, 20);

    this.orthographicCamera.position.set(0, 0, 0);
    this.scene.add(this.orthographicCamera);

    // // Orthographic Camera Helper
    // this.orthographicCameraHelper = new THREE.CameraHelper(this.orthographicCamera)
    // this.scene.add(this.orthographicCameraHelper)
  }

  resize() {
    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.top = this.sizes.frustum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {}

  set(left, right, top, bottom) {
    this.orthographicCamera.left = left;
    this.orthographicCamera.right = right;
    this.orthographicCamera.top = top;
    this.orthographicCamera.bottom = bottom;
    this.orthographicCamera.updateProjectionMatrix();
  }
  set_position(x, y, z, zoom) {
    this.orthographicCamera.position.set(x, y, z);
    this.orthographicCamera.zoom = zoom;
    this.orthographicCamera.updateProjectionMatrix();
  }
}

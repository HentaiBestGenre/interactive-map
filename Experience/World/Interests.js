import * as THREE from "three";
import Experience from "../Experience.js";
import { EventEmitter } from "events";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

export default class Interests {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;
    this.device = this.sizes.device;
    this.scrolling = this.experience.scrolling;
    this.renderer = this.experience.renderer;
    this.controls = this.experience.controls;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
      console.log(device);
    });

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("interest1");
    }

    this.obj = {
      x: 4,
      y: 1.2,
      z: 0.5,
    };

    // Setup
    this.points = [];
    this.raycaster = new THREE.Raycaster();
    this.setInterests();
    this.showInfos();
  }

  setInterests() {
    this.points_names = {
      mudac: 1,
    };
    this.points = [
      {
        position: new THREE.Vector3(0, 0.17, -1.2),
        element: document.querySelector(".window"),
      },
      {
        position: new THREE.Vector3(0.35, 0.17, 0.8),
        element: document.querySelector(".molbert"),
      },
      {
        position: new THREE.Vector3(-1, 0.17, 0.66),
        element: document.querySelector(".wall"),
      },
    ];
  }

  showInfos() {
    const window = document.querySelector(".window");
    const molbert = document.querySelector(".molbert");
    const wall = document.querySelector(".wall");

    const closeIcn = document.querySelector(".close");

    const infoPanel = document.querySelector(".info-panel");

    const infoPanelImage = document.querySelector(".info-panel-image");
    const infoPanelTitle = document.querySelector(".info-panel-title");
    const infoPanelLead = document.querySelector(".info-panel-lead");
    const infoPanelDescription = document.querySelector(
      ".info-panel-description",
    );
    let infoPanelRightStyle = "0";

    if (this.device === "desktop") {
      infoPanelRightStyle = "-33%";
    } else {
      infoPanelRightStyle = "-100%";
    }

    window.addEventListener("click", () => {
      var position = this.points[0].position.clone();
      this.controls.controls.target = position;
      this.camera.set_position(-0.59, 1.18, 1.94, 2.2);

      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      infoPanelImage.src = "public/images/Capture3.PNG";
      infoPanelTitle.innerHTML = "Window";
      infoPanelLead.innerHTML = "Sub title: test test";
      infoPanelDescription.innerHTML = "Description: test test";
    });

    molbert.addEventListener("click", () => {
      var position = this.points[1].position.clone();
      this.controls.controls.target = position;
      this.camera.set_position(2.57, 0.52, 0.28, 3);

      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      infoPanelImage.src = "public/images/Capture2.PNG";
      infoPanelTitle.innerHTML = "Molbert";
      infoPanelLead.innerHTML = "Sub title: test test";
      infoPanelDescription.innerHTML = "Description: test test";
    });

    wall.addEventListener("click", () => {
      var position = this.points[2].position.clone();
      console.log(position);
      this.controls.controls.target = position;
      this.camera.set_position(6.44, 0.95, 0.86, 3);

      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      infoPanelImage.src = "public/images/Capture.PNG";
      infoPanelTitle.innerHTML = "Wall";
      infoPanelLead.innerHTML = "Sub title: test test";
      infoPanelDescription.innerHTML = "Description: test test";
    });

    closeIcn.addEventListener("click", () => {
      infoPanel.style.right = infoPanelRightStyle;
      var position = new THREE.Vector3(0, 0, 0);
      this.controls.controls.target = position;
      // this.camera.set_position(0, 0, 0, 1);
    });
  }

  resize() {}

  update() {
    for (const point of this.points) {
      const screenPosition = point.position.clone();
      screenPosition.project(this.camera.orthographicCamera);

      point.element.classList.add("visible");

      const translateX = screenPosition.x * this.sizes.width * 0.5;
      const translateY = -screenPosition.y * this.sizes.height * 0.5;
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    }
  }
}

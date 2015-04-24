//定義ファイル
/// <reference path="DefinitelyTyped/threejs/three.d.ts" />

/// <reference path="game/MyCharacter.ts"/>
/// <reference path="game/GameManager.ts"/>

declare module THREE {
	export var OrbitControls;
	export var TrackballControls;
}

class App {
	private scene:THREE.Scene;
	private camera:THREE.PerspectiveCamera;
	private renderer;
	private controls;

	private stageWidth = 640;
	private stageHidth = 640;

	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.set(0, 0, 300);

		if (WebGLRenderingContext) {//window参照しなくていい
			this.renderer = new THREE.WebGLRenderer();
		} else {
			//this.renderer = new THREE.CanvasRenderer();
		}
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0xFFFFFF);
		this.renderer.shadowMapEnabled = true;

		var container = document.getElementById('container');
		container.appendChild(this.renderer.domElement);

		var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
		directionalLight.position.set(0, 0, 300);
		directionalLight.castShadow = true;
		this.scene.add(directionalLight);

		var geometry = new THREE.CubeGeometry(40, 40, 40);
		var material = new THREE.MeshPhongMaterial({color: 0xff0000});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(0, 60, 50);
		cube.castShadow = true;
		this.scene.add(cube);

		var geometry2 = new THREE.CubeGeometry(20, 20, 20);
		var material2 = new THREE.MeshPhongMaterial({color: 0x0000ff});
		var cube2 = new THREE.Mesh(geometry2, material2);
		cube2.position.set(50, 50, 50);
		cube2.castShadow = true;
		this.scene.add(cube2);

		var pGeometry = new THREE.PlaneGeometry(480, 640);
		var pMaterial = new THREE.MeshLambertMaterial({
			color: 0x999999,
			side: THREE.DoubleSide
		});
		var plane = new THREE.Mesh(pGeometry, pMaterial);
		plane.position.set(0, 0, 0);
		//plane.rotation.x = 90 * Math.PI / 180;
		plane.receiveShadow = true;
		this.scene.add(plane);

		this.camera.lookAt(plane.getWorldDirection());

		//座標軸()
		var axis = new THREE.AxisHelper(1000);
		axis.position.set(0, 0, 0);
		this.scene.add(axis);

		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		//this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);

		//container.addEventListener("mousemove", ((e) =>{
		//    var mouseX, mouseY;
		//    mouseX = e.clientX - 600 / 2;
		//    mouseY = e.clientY - 400 / 2;
		//    cube.rotation.x = mouseY * 0.005;
		//    cube.rotation.y = mouseX * 0.005;
		//    cube2.rotation.y = mouseY * 0.005;
		//    cube2.rotation.z = mouseX * 0.005;
		//}), false);

		window.addEventListener("resize", this.onWindowResize, false);

		//以下テスト実装
		var c = new MyCharacter();
		var manager = GameManager.getInstance()
		manager.initialize();

	}

	private onWindowResize = function () {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	};

	private render() {
		this.renderer.render(this.scene, this.camera);
	}

	private update() {
		this.controls.update();
	}

	public animate() {
		requestAnimationFrame((e)=>
				this.animate()
		);
		this.render();
		this.update();
	}
}

window.addEventListener("load", (e) => {
	console.log("loaded");
	var main:App = new App();
	main.animate()
});
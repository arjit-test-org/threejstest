class ControlManager extends events.EventDispatcher {
	private static _instance:ControlManager = null;

	constructor(){
		if(ControlManager._instance){
			throw new Error("must use the getInstance.");
		}
		super();
		ControlManager._instance = this;
		this.initialize();
	}

	public static getInstance():ControlManager {
		if(ControlManager._instance === null) {
			ControlManager._instance = new ControlManager();
		}
		return ControlManager._instance;
	}

	public initialize(){

		document.addEventListener("keydown" , (e)=>{
			var et = new events.Event("onKeyPress");
			et.data = e;
			this.dispatchEvent(et);
		});
		//todo 将来的にスマホとPCの判定処理を入れて出し分けたい
		document.addEventListener("mousedown" , (e)=>{
			var et = new events.Event("onMouseDown");
			et.data = e;
			this.dispatchEvent(et);
		});
		document.addEventListener("mousemove" , (e)=>{
			var et = new events.Event("onMouseMove");
			et.data = e;
			this.dispatchEvent(et);
		});
		document.addEventListener("mouseup" , (e)=>{
			var et = new events.Event("onMouseUp");
			et.data = e;
			this.dispatchEvent(et);
		});
	}
}
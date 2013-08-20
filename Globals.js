#pragma strict
static var doneWaiting : boolean = true;
static var initFogEndDist : float;
static var initFogColor : Color;
static var initAmbientLight : Color;
static var hitDistance : float = 12.0f;
static var myPlayerLayer : LayerMask = 11;

function Start () {
	initFogEndDist = RenderSettings.fogEndDistance;
	initFogColor = RenderSettings.fogColor;
	initAmbientLight = RenderSettings.ambientLight;
	myPlayerLayer = LayerMask.NameToLayer("MyPlayerLayer");
}

function Update () {

}
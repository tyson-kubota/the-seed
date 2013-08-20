#pragma strict
static var doneWaiting : boolean = true;
static var initFogEndDist : float;
static var initFogColor : Color;
static var initAmbientLight : Color;


function Start () {
	initFogEndDist = RenderSettings.fogEndDistance;
	initFogColor = RenderSettings.fogColor;
	initAmbientLight = RenderSettings.ambientLight;
}

function Update () {

}
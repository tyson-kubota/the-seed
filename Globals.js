#pragma strict
static var doneWaiting : boolean = true;
static var initFogEndDist : float;
static var initFogColor : Color;
static var initAmbientLight : Color;
static var hitDistance : float = 12.0f;
static var myPlayerLayer : LayerMask = 11;

var normalPlayerCamera : GameObject;
var riftPlayerCamera : GameObject;
var riftPlayer : GameObject;
var normalPlayer : GameObject;

function Start () {
	initFogEndDist = RenderSettings.fogEndDistance;
	initFogColor = RenderSettings.fogColor;
	initAmbientLight = RenderSettings.ambientLight;
	myPlayerLayer = LayerMask.NameToLayer("MyPlayerLayer");
	
	if (OVRDevice.SensorCount > 0) {
    	normalPlayer.SetActive(false);
    	normalPlayerCamera.SetActive(false);
    	riftPlayerCamera.SetActive(true); // OVRCameraController
    	riftPlayer.SetActive(true);
    }
//    else {
//    	normalPlayer.SetActive(true);
//    	normalPlayerCamera.SetActive(true);
//    }
}

function Update () {

}
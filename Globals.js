#pragma strict
static var doneWaiting : boolean = true;
static var isUnderwater : boolean = false;
static var initFogEndDist : float;
static var initFogColor : Color;
static var initAmbientLight : Color;
static var hitDistance : float = 20.0f;
static var myPlayerLayer : LayerMask = 11;
static var laserLayer : LayerMask = 13;
static var waterLayer : LayerMask;
static var introComplete : boolean = false;

var normalPlayerCamera : GameObject;
var riftPlayerCamera : GameObject;
var riftPlayer : GameObject;
var normalPlayer : GameObject;

var startingFogColor : Color;
var startingFogEndDist : float = 0;

function Start () {
	initFogEndDist = RenderSettings.fogEndDistance;
	initFogColor = RenderSettings.fogColor;
	initAmbientLight = RenderSettings.ambientLight;
	myPlayerLayer = LayerMask.NameToLayer("MyPlayerLayer");
	laserLayer = LayerMask.NameToLayer("LaserBlast");
	waterLayer = LayerMask.NameToLayer("Water");
	
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

	yield FadeFogIn(8);
	introComplete = true;
}

function Update () {

}

function FadeFogIn (timer : float) {
    var start = startingFogColor;
    var end = initFogColor;
    var startDist = startingFogEndDist;
    var endDist = initFogEndDist;
    var i = 0.0;
    var step = 1.0/timer;

    while (i <= 1.0) {
    	if (isUnderwater == true) {break;}
        i += step * Time.deltaTime;
        RenderSettings.fogColor = Color.Lerp(start, end, i);
        RenderSettings.fogEndDistance = Mathf.Lerp(startDist, endDist, i);
        yield;
    }
}

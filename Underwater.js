#pragma strict

var underWaterColor : Color;
var underWaterDistance : float;

function Start () {
}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.CompareTag ("Water")) {
		Globals.doneWaiting = true;
		Globals.isUnderwater = true;
		RenderSettings.fogColor = underWaterColor;
		RenderSettings.fogEndDistance = underWaterDistance;
	}
}

function OnTriggerExit (other : Collider) {
	if (other.gameObject.CompareTag ("Water")) {
		Globals.isUnderwater = false;
		RenderSettings.fogColor = Globals.initFogColor;
		RenderSettings.fogEndDistance = Globals.initFogEndDist;
	}
}
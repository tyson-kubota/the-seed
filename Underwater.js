#pragma strict

var underWaterColor : Color;
var underWaterDistance : float;
var underWaterAudioFilter : AudioLowPassFilter;
var finalCutOffFreq : float = 700;
var initCutOffFreq : float = 22000;

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
		underWaterAudioFilter.enabled = true;
		yield lerpAudioFilter(.25,FadeDir.In);
	}
}

function OnTriggerExit (other : Collider) {
	if (other.gameObject.CompareTag ("Water")) {
		Globals.isUnderwater = false;
		RenderSettings.fogColor = Globals.initFogColor;
		RenderSettings.fogEndDistance = Globals.initFogEndDist;
		yield lerpAudioFilter(1,FadeDir.Out);
		underWaterAudioFilter.enabled = false;
	}
}


function lerpAudioFilter (timer : float, fadeType : FadeDir) {

    var start = fadeType == FadeDir.In? underWaterAudioFilter.cutoffFrequency : underWaterAudioFilter.cutoffFrequency;
    var end = fadeType == FadeDir.In? finalCutOffFreq : initCutOffFreq;
    var i = 0.0;
    var step = 1.0/timer;

    while (i <= 1.0) {
    	//if (Globals.doneWaiting == true) {break;}
        i += step * Time.deltaTime;
        underWaterAudioFilter.cutoffFrequency = Mathf.Lerp(start, end, i);
        yield;
    }
}
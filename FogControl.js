#pragma strict

//var initFogEndDist : float;
var finalFogEndDist : float = 350;
//var initFogColor : Color;
var finalFogColor : Color;
//var initAmbientLight : Color;

var FogColorFadeTime : float = 8;
var FogDistFadeTime : float = 5;

var isKeySeed : boolean = false;
var resetInitFogDist : int = 900;
var resetInitFogColor : Color;

var useAudio : boolean = false;
var audioHit : AudioSource;
var audioDing : AudioSource;

//var doneWaiting : boolean = true;

enum FadeDir {In, Out}

function Start () {
}

function Update () {
	//Debug.Log("your values are: " + initFogEndDist + initFogColor.ToString + initAmbientLight.ToString);
}

function FadeFogDist (timer : float, fadeType : FadeDir) {
    var start = fadeType == FadeDir.In? RenderSettings.fogEndDistance : RenderSettings.fogEndDistance;
    var end = fadeType == FadeDir.In? finalFogEndDist : Globals.initFogEndDist;
    var i = 0.0;
    var step = 1.0/timer;

	if (isKeySeed) {
		Globals.initFogEndDist = resetInitFogDist;
		Globals.initFogColor = resetInitFogColor;
	}

    while (i <= 1.0) {
    	if (Globals.doneWaiting == true) {break;}
        i += step * Time.deltaTime;
        RenderSettings.fogEndDistance = Mathf.Lerp(start, end, i);
        yield;
    }
}

function FadeFogColor (timer : float, fadeType : FadeDir) {
    var start = fadeType == FadeDir.In? RenderSettings.fogColor : RenderSettings.fogColor;
    var end = fadeType == FadeDir.In? finalFogColor : Globals.initFogColor;
    var i = 0.0;
    var step = 1.0/timer;

    while (i <= 1.0) {
    	if (Globals.doneWaiting == true) {break;}
        i += step * Time.deltaTime;
        RenderSettings.fogColor = Color.Lerp(start, end, i);
        yield;
    }
}


function OnCollisionEnter (collision : Collision) {
	if (collision.gameObject && collision.gameObject.CompareTag ("Block") && Globals.doneWaiting == true) {
		Globals.doneWaiting = false;
		FadeFogColor(3, FadeDir.Out);
		yield FadeFogDist(3, FadeDir.Out);
		Globals.doneWaiting = true;
	}

	if (collision.gameObject && collision.gameObject.CompareTag ("Laser")) {
		if (Globals.doneWaiting == false) {
			Destroy(collision.gameObject);
			if (audioDing) {audioDing.Play();}
		}
		else {
			if (audioHit) {audioHit.Play();}
			Globals.doneWaiting = false;
			Destroy(collision.gameObject);
			FadeFogColor(FogColorFadeTime, FadeDir.In);
			yield FadeFogDist(FogDistFadeTime, FadeDir.In);
			FadeFogColor(FogColorFadeTime/2, FadeDir.Out);
			yield FadeFogDist(FogDistFadeTime/2, FadeDir.Out);
			Globals.doneWaiting = true;
		}
	}

//	if (collision.gameObject && collision.gameObject.CompareTag ("Freeze") && Globals.doneWaiting == true) {
//		Globals.doneWaiting = false;
//		Destroy(collision.gameObject);
//		FadeFogColor(FogColorFadeTime/2, FadeDir.Out);
//		yield FadeFogDist(FogDistFadeTime/2, FadeDir.Out);
//		Globals.doneWaiting = true;
//	}

	//else {Destroy(collision.gameObject);}	
}
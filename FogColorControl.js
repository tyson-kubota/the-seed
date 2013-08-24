#pragma strict

var finalFogColor : Color;
var FogColorFadeTime : float = 8;

var useAudio : boolean = false;
var audioHit : AudioSource;
var audioDing : AudioSource;

function Start () {
}

function FadeFogColor (timer : float, fadeType : FadeDir) {

	Globals.initFogColor = finalFogColor;

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
		yield FadeFogColor(3, FadeDir.Out);
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
			yield FadeFogColor(FogColorFadeTime, FadeDir.In);
			yield FadeFogColor(FogColorFadeTime/2, FadeDir.Out);
			Globals.doneWaiting = true;
		}
	}

}

function OnTriggerEnter (other : Collider) {

	if (other.gameObject && other.gameObject.CompareTag ("Player")) {
		if (Globals.doneWaiting == true) {
			if (audioHit) {audioHit.Play();}
			Globals.doneWaiting = false;
			yield FadeFogColor(FogColorFadeTime, FadeDir.In);
			yield FadeFogColor(FogColorFadeTime/2, FadeDir.Out);
			Globals.doneWaiting = true;
		}
	}
}
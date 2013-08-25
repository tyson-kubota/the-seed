#pragma strict

var myListener : AudioListener;
var songDuration : float = 120;
var finalSongPrefab : GameObject;
var isPlaying : boolean = false;

function Start () {
}

function Update () {

}

function FadeAudio (timer : float, fadeType : FadeDir) {

    var start = fadeType == FadeDir.In? 0.0 : 1.0;
    var end = fadeType == FadeDir.In? 1.0 : 0.0;
    var i = 0.0;
    var step = 1.0/timer;

    while (i <= 1.0) {
        i += step * Time.deltaTime;
        myListener.volume = Mathf.Lerp(start, end, i);
        yield;
    }
}

function PlayEndMusic () {
	Instantiate(finalSongPrefab, Vector3.zero, transform.rotation);
	isPlaying = true;
	yield WaitForSeconds(songDuration - 6);
	FadeAudio(5, FadeDir.Out);
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.CompareTag ("EndTrigger") && isPlaying == false) {
		PlayEndMusic();
	}
}
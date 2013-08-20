#pragma strict

var audioHit : AudioSource;
var audioDing : AudioSource;

function Start () {

}

function Update () {

}

function OnCollisionEnter (collision : Collision) {
	if (collision.gameObject && collision.gameObject.CompareTag ("Laser")) {
	if (Globals.doneWaiting == true) {audioHit.Play();}
	else {audioDing.Play();}
	}
}
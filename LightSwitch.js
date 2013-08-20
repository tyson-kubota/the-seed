#pragma strict

var myLightObject : GameObject;

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.CompareTag ("Laser")) {
		myLightObject.light.enabled = true;
	}
}
#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {
  if (other.gameObject.CompareTag ("Player")) {
  	Destroy(gameObject, 0);
  }
}	
#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {
  if (other.gameObject.CompareTag ("Player")) {
  	gameObject.light.renderMode = LightRenderMode.ForcePixel;
  }
}	

function OnTriggerExit (other : Collider) {
  if (other.gameObject.CompareTag ("Player")) {
  	gameObject.light.renderMode = LightRenderMode.Auto;
  }
}
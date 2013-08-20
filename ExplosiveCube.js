#pragma strict

var explosionPrefab : GameObject;
var originTransform : Transform; 

function Start () {
	originTransform = transform;
}

function OnCollisionEnter (collision : Collision) {
	if (collision.gameObject.CompareTag ("Laser")) {
	Debug.Log("Hit explosive cube!");
		Instantiate(explosionPrefab, originTransform.position, originTransform.rotation);
	}	
}
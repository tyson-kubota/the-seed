#pragma strict

var prefabToSpawn : GameObject;
var originTransform : Transform; 
var destroyOnSpawn : boolean = false;
var doneWaiting : boolean = true;
var permitMultipleSpawns : boolean = false;
var myLight : Light;

var audioHit : AudioSource;

function Start () {
	originTransform = transform;
}

function OnTriggerEnter (other : Collider) {

	if (other.gameObject.CompareTag ("Player") && doneWaiting == true) {
		SpawnPrefab();
		if (myLight) {myLight.range = (myLight.range * 2); myLight.intensity = (myLight.intensity * 2);}
	}

}

function SpawnPrefab () {

	Instantiate(prefabToSpawn, originTransform.position, originTransform.rotation);
	if (destroyOnSpawn) {Destroy(gameObject,0);}
	
	doneWaiting = false;
	if (permitMultipleSpawns) {yield WaitForSeconds(.75); doneWaiting = true;}
}
#pragma strict

var prefabToSpawn : GameObject;
var originTransform : Transform; 
var destroyOnSpawn : boolean = false;
var randomizePrefab : boolean = false;
var doneWaiting : boolean = true;

var prefabToSpawnAlt : GameObject;
var prefabToSpawnAlt2 : GameObject;
var prefabToSpawnGrass : GameObject;
var prefabToSpawnGrass2 : GameObject;

var SpawnFromLaserCollisions : boolean = false;

var audioHit : AudioSource;

function Start () {
	originTransform = transform;
}

function OnCollisionEnter (collision : Collision) {
	if (collision.gameObject.CompareTag ("Block") && doneWaiting == true) {
		SpawnPrefab(collision);
	}

	if (collision.gameObject.CompareTag ("Laser") && doneWaiting == true) {
		Destroy(collision.gameObject);
		SpawnPrefabGrass(collision);
	}

	if (collision.gameObject.CompareTag ("Seed") && doneWaiting == true) {
		//SpawnPrefab(collision);
		SpawnPrefabGrass(collision);
	}
}

function SpawnPrefab(collision : Collision) {
	var prefabToUse : GameObject;
	var prefabID : int = Random.Range(1,4); 
	
	if (randomizePrefab) {
		if (prefabID == 1) {prefabToUse = prefabToSpawnAlt;}
		else if (prefabID == 2) {prefabToUse = prefabToSpawnAlt2;}
		else {prefabToUse = prefabToSpawn;}
	}
	else {
		prefabToUse = prefabToSpawn;
	}
	
	var contact : ContactPoint = collision.contacts[0];
	var rot : Quaternion = Quaternion.FromToRotation(Vector3.down, contact.normal);
	var pos : Vector3 = contact.point;

	//Instantiate(prefabToSpawn, originTransform.position, originTransform.rotation);
	Instantiate(prefabToUse, pos, rot);
	if (destroyOnSpawn) {Destroy(gameObject,0);}
	
	doneWaiting = false;
	yield WaitForSeconds(.75);
	doneWaiting = true;
}

function SpawnPrefabGrass(collision : Collision) {
	var prefabToUse : GameObject;
	var prefabGrassID : int = Random.Range(1,4); 
	
	if (prefabGrassID == 1) {prefabToUse = prefabToSpawnGrass2;}
	else {prefabToUse = prefabToSpawnGrass;}

	var randomRotY : int = Random.Range(0, 160);
    var randomPosition = Vector3(Random.Range(0.0f, 1.0f), Random.Range(3.0f, 5.0f), Random.Range(0, 1));
    var randomRotation = Quaternion.Euler( Random.Range(-20, 20), Random.Range(-randomRotY, randomRotY), Random.Range(-30, 30));

	var contact : ContactPoint = collision.contacts[0];
	var rot : Quaternion = Quaternion.FromToRotation(Vector3.down, contact.normal);
	var pos : Vector3 = contact.point;

	Instantiate(prefabToUse, pos, randomRotation);
	if (audioHit) {audioHit.Play();}
				
	doneWaiting = false;
	yield WaitForSeconds(.75);
	doneWaiting = true;
}
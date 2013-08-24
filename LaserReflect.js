#pragma strict

var gunObj: Transform;
var RaySourceObj : GameObject;
var rayTargetObj : GameObject;
var rayTargetLight : Light;
var prefabToSpawnGrass1 : GameObject;
var prefabToSpawnGrass2 : GameObject;
var prefabToSpawnGrass3 : GameObject;

var prefabToSpawnCrystal1 : GameObject;
var prefabToSpawnCrystal2 : GameObject;
var prefabToSpawnCrystal3 : GameObject;

var prefabToSpawnCave1 : GameObject;
var prefabToSpawnCave2 : GameObject;
var prefabToSpawnCave3 : GameObject;

var readyToSpawn : boolean = true;
var spawnTimeout : float = .25f;
var layerMask1 : int;
var layerMask2 : int;
var finalMask : int;

var rot : Quaternion;
var pos : Vector3;

function Start () {
	rayTargetLight = rayTargetObj.transform.FindChild("Mesh").light;
	layerMask1 = Globals.myPlayerLayer.value;
	layerMask2 = Globals.laserLayer.value;
	finalMask = ~((1 << Globals.myPlayerLayer.value) | (1 << Globals.laserLayer.value) | (1 << Globals.vineRootLayer.value) | (1 << Globals.triggerLayer.value));
}

function Update () {
	//if (Input.GetButton("Fire1")) {
	if (Globals.introComplete) {
		//Debug.Log("Pressed left click.");
		
		var hit: RaycastHit;
		
		var rayStartTrn : Transform = RaySourceObj.transform;
		var rayStartPos : Vector3 = rayStartTrn.position;
		var fwd : Vector3 = rayStartTrn.TransformDirection (Vector3.forward);
		
		
		pos = Vector3.zero;
		
		if (Physics.Raycast(rayStartPos, fwd, hit, Globals.hitDistance, finalMask)) {			
			// Find the line from the gun to the point that was clicked.
			var incomingVec = hit.point - gunObj.position;
			
			// Use the point's normal to calculate the reflection vector.
			var reflectVec = Vector3.Reflect(incomingVec, hit.normal);
			
			// Draw lines to show the incoming "beam" and the reflection.
			Debug.DrawLine(gunObj.position, hit.point, Color.red);
			Debug.DrawRay(hit.point, reflectVec, Color.green, 1.0f);

			rot = Quaternion.FromToRotation(Vector3.down, hit.normal);
			pos = hit.point;
			
			if (pos != Vector3.zero) {
				rayTargetObj.SetActive(true);
				rayTargetObj.transform.position = pos;
			}
						
			if (readyToSpawn) {
			if (hit.collider.gameObject.CompareTag ("Crystal") || hit.collider.gameObject.CompareTag ("Vine") || hit.collider.gameObject.CompareTag ("Seed") || hit.collider.gameObject.CompareTag ("Player")) {
				return;
			}
			if (hit.collider.gameObject.CompareTag ("Water")) {
				readyToSpawn = false;
				InstantiateHitCrystal(prefabToSpawnCrystal1, pos, rot);
				}
			else if (hit.collider.gameObject.CompareTag ("Cave")) {
				readyToSpawn = false;
				InstantiateHitCave(prefabToSpawnCave1, pos, rot);
				}				
			else if (hit.collider.gameObject.CompareTag ("VineRoot")) {
				//readyToSpawn = false;
				//SpawnPrefabOnHit(hit);
				}					
			//else if (hit.collider.gameObject.CompareTag ("Stalact")) {
				// retract stalactites or stalagmites... or only when shot?
				//}				
			else if (hit.collider.gameObject.CompareTag ("Terrain")) {
				readyToSpawn = false;
				InstantiateHitObject(prefabToSpawnGrass1, pos, rot);
				}
//			else {
//				readyToSpawn = true;	
//				}	
			}
		}
		
		if (pos == Vector3.zero) {rayTargetObj.SetActive(false);rayTargetLight.range = .5;}	
	}
}

function SpawnPrefabOnHit (hit: RaycastHit) {
	if (!readyToSpawn) {
		hit.transform.gameObject.GetComponent(SpawnPrefabSimple).SpawnPrefab();
		yield WaitForSeconds(.75f);
		readyToSpawn = true;
	}
	else {return;}
}

function InstantiateHitObject(prefabToSpawnGrass1 : GameObject, pos: Vector3, rot : Quaternion) {

	var prefabToUse : GameObject;
	var prefabSpawnID : int = Random.Range(0,6); 
	
	if (prefabSpawnID <= 2) {prefabToUse = prefabToSpawnGrass1;}
	else if (prefabSpawnID <= 4) {prefabToUse = prefabToSpawnGrass2;}
	else {prefabToUse = prefabToSpawnGrass3;}

	var randomRotY : int = Random.Range(0, 160);
    var randomRotation = Quaternion.Euler( Random.Range(-20, 20), Random.Range(-randomRotY, randomRotY), Random.Range(-30, 30));

	Instantiate(prefabToUse, pos, randomRotation);
	//rayTargetLight.color = Color.white;
	rayTargetLight.range = .5;
	yield WaitForSeconds(spawnTimeout);
	//rayTargetLight.color = Color.magenta;
	rayTargetLight.range = 2;
	readyToSpawn = true;
}

function InstantiateHitCrystal(prefabToSpawn : GameObject, pos: Vector3, rot : Quaternion) {

	var prefabToUse : GameObject;
	var prefabSpawnID : int = Random.Range(0,7); 
	
	if (prefabSpawnID <= 2) {prefabToUse = prefabToSpawnCrystal1;}
	else if (prefabSpawnID <= 4) {prefabToUse = prefabToSpawnCrystal2;}
	else {prefabToUse = prefabToSpawnCrystal3;}

	var randomRotY : int = Random.Range(0, 160);
    var randomRotation = Quaternion.Euler( Random.Range(-20, 20), Random.Range(-randomRotY, randomRotY), Random.Range(-30, 30));

	Instantiate(prefabToUse, pos, randomRotation);
	//rayTargetLight.color = Color.white;
	rayTargetLight.range = .5;
	yield WaitForSeconds(spawnTimeout/2);
	//rayTargetLight.color = Color.magenta;
	rayTargetLight.range = 2;
	readyToSpawn = true;
}

function InstantiateHitCave(prefabToSpawn : GameObject, pos: Vector3, rot : Quaternion) {

	var prefabToUse : GameObject;
	var prefabSpawnID : int = Random.Range(0,7); 
	
	if (prefabSpawnID <= 2) {prefabToUse = prefabToSpawnCave1;}
	else if (prefabSpawnID <= 4) {prefabToUse = prefabToSpawnCave2;}
	else {prefabToUse = prefabToSpawnCave3;}

	var randomRotY : int = Random.Range(0, 160);
    var randomRotation = Quaternion.Euler( Random.Range(-20, 20), Random.Range(-randomRotY, randomRotY), Random.Range(-30, 30));

	Instantiate(prefabToUse, pos, randomRotation);
	rayTargetLight.range = .5;
	yield WaitForSeconds(spawnTimeout/4);
	rayTargetLight.range = 2;
	readyToSpawn = true;
}
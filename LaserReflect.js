#pragma strict

var gunObj: Transform;
var RaySourceObj : GameObject;
var rayTargetObj : GameObject;
var rayTargetLight : Light;
var prefabToSpawn : GameObject;
var prefabToSpawn2 : GameObject;
var prefabToSpawn3 : GameObject;
var readyToSpawn : boolean = true;
var spawnTimeout : float = .25f;

var rot : Quaternion;
var pos : Vector3;

function Start () {
	rayTargetLight = rayTargetObj.transform.FindChild("Mesh").light;
}

function Update () {
	//if (Input.GetButton("Fire1")) {
		//Debug.Log("Pressed left click.");
		
		var hit: RaycastHit;
		
		var rayStartTrn : Transform = RaySourceObj.transform;
		var rayStartPos : Vector3 = rayStartTrn.position;
		var fwd : Vector3 = rayStartTrn.TransformDirection (Vector3.forward);
		
		var layerMask = ~(1 << Globals.myPlayerLayer.value);
		
		pos = Vector3.zero;
		
		if (Physics.Raycast(rayStartPos, fwd, hit, Globals.hitDistance, layerMask)) {			
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
				readyToSpawn = false;
				InstantiateHitObject(prefabToSpawn, pos, rot);
			}
		}
		
		if (pos == Vector3.zero) {rayTargetObj.SetActive(false);rayTargetLight.range = .5;}	
	//}
}

function InstantiateHitObject(prefabToSpawn : GameObject, pos: Vector3, rot : Quaternion) {

	var prefabToUse : GameObject;
	var prefabSpawnID : int = Random.Range(0,6); 
	
	if (prefabSpawnID <= 2) {prefabToUse = prefabToSpawn;}
	else if (prefabSpawnID <= 4) {prefabToUse = prefabToSpawn2;}
	else {prefabToUse = prefabToSpawn3;}

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
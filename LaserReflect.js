#pragma strict

var gunObj: Transform;
var RiftMenuCam2 : GameObject;
var RiftSourceObj : GameObject;
var prefabToSpawn : GameObject;

function Start () {

}

function Update () {
	if (Input.GetMouseButton(0)) {
	//if (Input.GetButton("Fire1")) {
		//Debug.Log("Pressed left click.");
		
		var hit: RaycastHit;
		
		var rayStartTrn : Transform = RiftSourceObj.transform;
		var rayStartPos : Vector3 = rayStartTrn.position;
		var fwd : Vector3 = rayStartTrn.TransformDirection (Vector3.forward);

		if (Physics.Raycast(rayStartPos, fwd, hit)) {			
			// Find the line from the gun to the point that was clicked.
			var incomingVec = hit.point - gunObj.position;
			
			// Use the point's normal to calculate the reflection vector.
			var reflectVec = Vector3.Reflect(incomingVec, hit.normal);
			
			// Draw lines to show the incoming "beam" and the reflection.
			Debug.DrawLine(gunObj.position, hit.point, Color.red);
			Debug.DrawRay(hit.point, reflectVec, Color.green, 1.0f);

			var rot : Quaternion = Quaternion.FromToRotation(Vector3.down, hit.normal);
			var pos : Vector3 = hit.point;

			Instantiate(prefabToSpawn, pos, rot);
		}
	}
}
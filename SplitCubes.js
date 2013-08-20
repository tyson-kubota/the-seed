#pragma strict

var childCubesPrefab : GameObject;
var originTransform : Transform; 

var childCubesPrefab1 : GameObject;
var childCubesPrefab2 : GameObject;
var childCubesPrefab3 : GameObject;

function Start () {
	originTransform = transform;
}

function OnCollisionEnter (collision : Collision) {
	if (collision.gameObject.CompareTag ("Laser")) {

		//Debug.Log("Split parent cube!");
		var prefabToUse : GameObject;
		var prefabID : int = Random.Range(1,4); 
		
		if (prefabID == 1) {prefabToUse = childCubesPrefab1;}
		else if (prefabID == 2) {prefabToUse = childCubesPrefab2;}
		else {prefabToUse = childCubesPrefab3;}

		Instantiate(prefabToUse, originTransform.position, originTransform.rotation);
		Destroy(gameObject,0);
	}
}
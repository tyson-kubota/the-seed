#pragma strict

var prefabToSpawn : GameObject;
var prefabToSpawnAlt : GameObject;
var prefabPod : GameObject;
var prefabToEnd : GameObject;

var originTransform : Transform; 
var randomizePrefab : boolean = false;
var spawnPods : boolean = false;

var growAtLaunch : boolean = true;
var growTime : float = 1.0;

function Start () {
	originTransform = transform;
	
    if (randomizePrefab) {
        var randomSegment : int = Random.Range(0,2);
        if (randomSegment == 1) {prefabToSpawn = prefabToSpawnAlt;}
    }

	if (growAtLaunch == true) {yield growMe (growTime);}
	
	var randomRotX : int = Random.Range(0, 80);
    var randomPosition = Vector3(Random.Range(0.0f, 1.0f), Random.Range(3.0f, 5.0f), Random.Range(0, 1));
    var randomRotation = Quaternion.Euler( Random.Range(-randomRotX, randomRotX), Random.Range(-30, 40), Random.Range(-30, 30));

    //use totalLength to keep vines from growing indefinitely
    var totalLength : int = Random.Range(0,10);
    if (totalLength > 0) { 
        var spawnedPrefabT : GameObject = Instantiate(prefabToSpawn, randomPosition, randomRotation);
     	spawnedPrefabT.transform.parent = originTransform;
     	spawnedPrefabT.transform.localPosition = randomPosition;
    }
	else {
		var spawnedPrefabEndT : GameObject = Instantiate(prefabToEnd, randomPosition, randomRotation);
     	spawnedPrefabEndT.transform.parent = originTransform;
     	spawnedPrefabEndT.transform.localPosition = randomPosition;	
	}
	    
    if (spawnPods) {
//        var shouldSpawnPod : int = Random.Range(0,5);
//        if (shouldSpawnPod == 1) {
	    var randomPositionPod = Vector3(Random.Range(0.1f, 0.2f), Random.Range(-1.5f, -1.2f), Random.Range(-3.4f, -3.1f));    
        var spawnedPrefabPodT : GameObject = Instantiate(prefabPod, randomPositionPod, randomRotation);
     	spawnedPrefabPodT.transform.parent = originTransform;
     	spawnedPrefabPodT.transform.localPosition = randomPositionPod;
     	
//        Instantiate(prefabPod, transform.position, transform.rotation);
//        }
    }    
 
}


function growMe (timer : float) {

    var start = Vector3(0,0,0);
    var end = transform.localScale;
    var endPos = transform.localPosition;
    var i = 0.0;
    var step = 1.0/timer;

    while (i <= 1.0) {
        i += step * Time.deltaTime;
        transform.localScale = Vector3.Lerp(start, end, i);
        if (i > 0.1) {
//        	transform.localPosition = Vector3.Lerp (start, endPos, i);
        }
        yield;
    }
}
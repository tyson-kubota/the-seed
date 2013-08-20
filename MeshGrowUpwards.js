#pragma strict
var originObject : GameObject; 
var originTransform : Transform; 
var waitTime : int = 1;
var shouldIMove : boolean = false;
var speed : int = 1;
var randomizeWaitTime : boolean = false;

function Start () {
	originObject = gameObject;
	originTransform = transform;
	shouldIMove = true;
	if (randomizeWaitTime) {
		waitTime = Random.Range(waitTime/2, 1.5 * waitTime);
	}
	yield WaitForSeconds(waitTime);
	shouldIMove = false;
}

function Update () {
	if (shouldIMove) {
		originTransform.Translate(Vector3.up * Time.deltaTime * speed, Space.World);
	}
}
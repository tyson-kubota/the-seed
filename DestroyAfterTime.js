#pragma strict

var removeTime : float = 10.0;
var myObject : GameObject;

function Start () {
	myObject = gameObject;
	Destroy(gameObject, removeTime);
}

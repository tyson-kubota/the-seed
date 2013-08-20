#pragma strict

var removeTime : float = 10.0;
var myObject : GameObject;

function Start () {
  //myObjectHolder = transform.parent.gameObject;
	myObject = gameObject;
	Destroy(gameObject, Random.Range((.7f * removeTime), (removeTime * 2.0f)));
}

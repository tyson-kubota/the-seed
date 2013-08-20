#pragma strict

var player : Transform = null;
var maxDistance : float = 0f;
var myTr : Transform = null;
var shouldScale : boolean = false;
private var distance : Vector3;
private var sqrDist : float;
private var sqrRtDist : float;

function Start() {
	myTr = transform;
	shouldScale = true;
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.CompareTag ("Player")) {
		shouldScale = true;
	}
}

//transform.localScale += Vector3(0.1,0,0);

function Update () {
	if (shouldScale == true) {

		//distance = Vector3.Distance(myTr.position, player.position);
		distance = myTr.position - player.position;
		sqrDist = distance.sqrMagnitude;
		sqrRtDist = Mathf.Sqrt(sqrDist);
		if (sqrDist <= maxDistance*maxDistance) {
			//myTr.localScale = (1f - (sqrRtDist / maxDistance));
			myTr.localScale = Vector3(1,1,1) - distance.normalized;
		}
	}
}

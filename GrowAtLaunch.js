#pragma strict
var timer : float = 2;
var addColliderAfter : boolean = false;

function Start () {
	if (addColliderAfter) {yield growMe(timer); collider.enabled = true;};
	else {growMe(timer);}
}

function Update () {

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
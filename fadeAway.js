#pragma strict

var destroyTimer : float = 0.5f;
var useTintColor : boolean = false;

function Start () {

}

function Update () {

}

function OnCollisionEnter (collision : Collision) {
	if (collision.gameObject && collision.gameObject.CompareTag ("Laser")) {
		if (useTintColor) {yield lerpMyTintColor(destroyTimer, Color.black);}
		else {yield lerpMyAlpha(destroyTimer, 0);}
		Destroy(gameObject, 0);
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject && other.gameObject.CompareTag ("Laser")) {
		if (useTintColor) {yield lerpMyTintColor(destroyTimer, Color.black);}
		else {yield lerpMyAlpha(destroyTimer, 0);}
		Destroy(gameObject, 0);
	}
}

function lerpMyTintColor (timer : float, finalColor : Color) {
    var start : Color = renderer.material.GetColor("_TintColor");
    var end : Color = finalColor;
    var i = 0.0;
    var step = 1.0/timer;
    while (i <= 1.0) {
        i += step * Time.deltaTime;
		//Debug.Log("my tint color is " + renderer.material.GetColor("_TintColor"));        
        renderer.material.SetColor ("_TintColor", Color.Lerp(start, end, i));
        yield;
    }
}

function lerpMyAlpha (timer : float, finalColor : float) {
    var start : float = renderer.material.color.a;
    var end : float = finalColor;
    var i = 0.0;
    var step = 1.0/timer;
    while (i <= 1.0) {
        i += step * Time.deltaTime;
        renderer.material.color.a = Mathf.Lerp(start, end, i);
        yield;
    }
}
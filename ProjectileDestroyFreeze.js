#pragma strict

var removeTime : float = 10.0;
var growAtLaunch : boolean = false;
var growTime : float = 7.0;
var scaleFactor : float = 3.0;
var ProjectileName : String = "Generic";
var myHitPrefab : GameObject;
var myObject : GameObject;

function Start () {
	myObject = gameObject;
	Destroy(gameObject, removeTime);
	if (growAtLaunch == true) {growProjectile (growTime);}
}

function OnCollisionEnter (collision : Collision) {
  if (collision.gameObject.CompareTag ("Block")) {
// throw an analytics event!
  	//GA.API.Design.NewEvent("Projectile:Collision:" + ProjectileName, FallingLaunch.secondsAlive, transform.position);
	rigidbody.isKinematic = true;
	Destroy(myObject, 0);
  collision.gameObject.rigidbody.isKinematic = true;
  collision.gameObject.rigidbody.useGravity = false;
  //Destroy(collision.gameObject, 3);
  //Instantiate(myHitPrefab, collision.transform.position, transform.rotation);
  var contact : ContactPoint = collision.contacts[0];
  var rot : Quaternion = Quaternion.FromToRotation(Vector3.forward, contact.normal);
  var pos : Vector3 = contact.point;
  Instantiate(myHitPrefab, pos, rot);
  }
}

function growProjectile (timer : float) {

//	transform.localScale += Vector3(0,0,0);

    var start = transform.localScale;
    var end = transform.localScale * scaleFactor;
    var i = 0.0;
    var step = 1.0/timer;

    while (i <= 1.0) {
        i += step * Time.deltaTime;
        transform.localScale = Vector3.Lerp(start, end, i);
        yield;
    }
}

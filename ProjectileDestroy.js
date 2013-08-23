#pragma strict

var removeTime : float = 10.0;
var growAtLaunch : boolean = false;
var growTime : float = 7.0;
var ProjectileName : String = "Generic";
var myObjectHolder : GameObject;
var myObject : GameObject;

var shotRenderer : MeshRenderer;
var audioDing : AudioSource;

function Start () {
  //myObjectHolder = transform.parent.gameObject;
	myObject = gameObject;
	Destroy(gameObject, removeTime);
	if (growAtLaunch == true) {growProjectile (growTime);}
}

function OnCollisionEnter (collision : Collision) {
  
  if (collision.gameObject.rigidbody) {
  	collision.gameObject.rigidbody.useGravity = true;
  	collision.gameObject.rigidbody.isKinematic = false;
  }
  
  if (collision.gameObject.CompareTag ("Terrain")) {
	if (audioDing) {audioDing.Play();}
	if (shotRenderer) {shotRenderer.enabled = false;}
	Destroy(myObject, 1);
  }
  
  if (collision.gameObject.CompareTag ("Block")) {
// throw an analytics event!
  	//GA.API.Design.NewEvent("Projectile:Collision:" + ProjectileName, FallingLaunch.secondsAlive, transform.position);
	rigidbody.isKinematic = true;
	//Destroy(myObjectHolder, 0);
	Destroy(myObject, 0);
  collision.gameObject.rigidbody.isKinematic = false;
  collision.gameObject.rigidbody.useGravity = true;
  //Destroy(collision.gameObject, 3);
  }
  
  if (collision.gameObject.CompareTag ("Mirror")) {
  var hitObject : GameObject = collision.gameObject;
  var contact : ContactPoint = collision.contacts[0];
  var rot : Quaternion = Quaternion.FromToRotation(Vector3.forward, contact.normal);
  var pos : Vector3 = contact.point;
  //Instantiate(myHitPrefab, pos, rot);
  	
  	myObject.transform.position = Vector3.Reflect (hitObject.transform.position, Vector3.right);
	//myObject.transform.position = Vector3.Reflect (myObject.transform.position, Vector3.right);
	//myObject = Vector3.Reflect(incomingVec, hit.normal);
	
  }
  
  if (collision.gameObject.CompareTag ("Crystal")) {
  	Destroy(collision.gameObject, 0);
  }
// but if one fireball hits another, destroy immediately.
  if (this.gameObject.layer == 17 && collision.gameObject.CompareTag ("Death")) {
	Destroy(gameObject, 0);
  }
}

function OnTriggerEnter (other : Collider) {
  if (other.gameObject.CompareTag ("Block")) {
// throw an analytics event!
    //GA.API.Design.NewEvent("Projectile:Collision:" + ProjectileName, FallingLaunch.secondsAlive, transform.position);
  rigidbody.isKinematic = true;
  Destroy(myObjectHolder, 2);
  other.gameObject.rigidbody.useGravity = true;
  Destroy(other.gameObject, 3);
  }
  
// but if one fireball hits another, destroy immediately.
  if (this.gameObject.layer == 17 && other.gameObject.CompareTag ("Death")) {
  Destroy(gameObject, 0);
  }
}

function growProjectile (timer : float) {

//	transform.localScale += Vector3(0,0,0);

    var start = Vector3(0,0,0);
    var end = transform.localScale;
    var i = 0.0;
    var step = 1.0/timer;

    while (i <= 1.0) {
        i += step * Time.deltaTime;
        transform.localScale = Vector3.Lerp(start, end, i);
        yield;
    }
}

private var motor : CharacterMotor;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
}
var projectilePrefab : GameObject;
var projectilePrefab2 : GameObject;
var fp1 : GameObject; 
var fireRate : float = 1;
var nextFire : float = 1;
 
function Update ()
 {
 
       if( Input.GetButton("Fire1") && Time.time > nextFire)
       {
         nextFire = Time.time + fireRate;
         Instantiate(projectilePrefab, fp1.transform.position, fp1.transform.rotation);
 
       }

       else if ( Input.GetButton("Fire2") && Time.time > nextFire)
       {
         nextFire = Time.time + fireRate;
         Instantiate(projectilePrefab2, fp1.transform.position, fp1.transform.rotation);
 
       }

}
// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")

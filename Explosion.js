#pragma strict

var radius = 5.0;
var power = 10.0;

function Start () {
    // Applies an explosion force to all nearby rigidbodies
    var explosionPos : Vector3 = transform.position;
    // get all colliders touching or inside the imaginary sphere:
    var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius, 1 << 8);
    for (var hit : Collider in colliders) {
        if (!hit) continue; // avoid null references (should not occur, but...)
        if (hit.rigidbody){
        	hit.rigidbody.isKinematic = false;
  			hit.rigidbody.useGravity = true;
            hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
        }
    }
}
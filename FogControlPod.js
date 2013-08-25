#pragma strict

var addFogEndDist : float = 350;
var addFogColor : Color;

var FogColorFadeTime : float = 8;
var FogDistFadeTime : float = 5;

var originTransform : Transform; 
var explosionPrefab : GameObject;

var useAudio : boolean = false;
var audioHit : AudioSource;
var audioDing : AudioSource;

//var doneWaiting : boolean = true;

//enum FadeDir {In, Out}

function Start () {
	originTransform = transform;
}

function Update () {
	//Debug.Log("your values are: " + initFogEndDist + initFogColor.ToString + initAmbientLight.ToString);
}

function FadeFogDist (timer : float, fadeType : FadeDir) {
	Globals.initFogEndDist = Globals.initFogEndDist + addFogEndDist;
	Globals.initFogColor = Globals.initFogColor + addFogColor;
		    
    var start = fadeType == FadeDir.In? RenderSettings.fogEndDistance : RenderSettings.fogEndDistance;
    var end = fadeType == FadeDir.In? Globals.initFogEndDist : Globals.initFogEndDist;
    var i = 0.0;
    var step = 1.0/timer;

    while (i <= 1.0) {
    	if (Globals.doneWaiting == true) {break;}
        i += step * Time.deltaTime;
        RenderSettings.fogEndDistance = Mathf.Lerp(start, end, i);
        yield;
    }
}

function FadeFogColor (timer : float, fadeType : FadeDir) {
    var start = fadeType == FadeDir.In? RenderSettings.fogColor : RenderSettings.fogColor;
    var end = fadeType == FadeDir.In? Globals.initFogColor : Globals.initFogColor;
    var i = 0.0;
    var step = 1.0/timer;

    while (i <= 1.0) {
    	if (Globals.doneWaiting == true) {break;}
        i += step * Time.deltaTime;
        RenderSettings.fogColor = Color.Lerp(start, end, i);
        yield;
    }
}


function OnCollisionEnter (collision : Collision) {

	if (collision.gameObject && collision.gameObject.CompareTag ("Laser")) {
		if (Globals.doneWaiting == false) {
			Destroy(collision.gameObject);
			if (audioDing) {audioDing.Play();}
		}
		else {
			if (audioHit) {audioHit.Play();}
			Globals.doneWaiting = false;
			Destroy(collision.gameObject);
			yield FadeFogDist(FogDistFadeTime, FadeDir.In);
			Globals.doneWaiting = true;
		}
	}
	
	else if (collision.gameObject && collision.gameObject.CompareTag ("Terrain")) {
		//Debug.Log("time to explode");
		var pos : Vector3 = originTransform.position;
		var randomRotY : int = Random.Range(0, 160);
    	var randomRotation = Quaternion.Euler( Random.Range(-20, 20), Random.Range(-randomRotY, randomRotY), Random.Range(-30, 30));
		Instantiate(explosionPrefab, pos, randomRotation);
		yield FadeFogDist(FogDistFadeTime, FadeDir.In);
		Globals.doneWaiting = true;		
		Destroy(originTransform.gameObject,0);
	}
}
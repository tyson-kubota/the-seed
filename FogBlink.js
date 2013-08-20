#pragma strict

var blinkTimer : float = 5;
var blinkOffset : float = 1;
var startRange : float = 1;
var maxRange : float = 100;
var myLightLerpDown : boolean = false;
var myLightLerpUp : boolean = false;
private var shouldLerp : boolean = false;

function Start () {
	InvokeRepeating("enableLight", blinkTimer - 1 , blinkTimer);
	InvokeRepeating("disableLight", blinkTimer + 1, blinkTimer);
}

function Update () {
	 if (shouldLerp == true && myLightLerpUp == true) {
	 	LerpLightUp(1);
	 }
	 
	 else if (shouldLerp == true && myLightLerpDown == true) {
	 	LerpLightDown(1);
	 }
}

function enableLight () {
    myLightLerpUp = true;
    myLightLerpDown = false;
    shouldLerp = true;
}

function disableLight () {
    myLightLerpDown = true;
    myLightLerpUp = false;
    shouldLerp = true;
}


function LerpLightUp (timer : float) {
	Debug.Log("started lerp light up");    
	var start = startRange;
    var end = maxRange;
    var i = 0.0;
    var step = 1.0/timer;
	
	shouldLerp = false;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        RenderSettings.fogDensity = Mathf.Lerp(start, end, i);}
    yield WaitForSeconds (timer); 
}

function LerpLightDown (timer : float) {
	Debug.Log("started lerp light down");    
	var start = maxRange;
    var end = startRange;
    var i = 0.0;
    var step = 1.0/timer;
	
	shouldLerp = false;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        RenderSettings.fogDensity = Mathf.Lerp(start, end, i);}
    yield WaitForSeconds (timer);
}
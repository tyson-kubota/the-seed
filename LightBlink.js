#pragma strict

var myLight : Light;
var blinkTimer : float = 5;
var blinkOffset : float = 1;
var startRange : float = 20;
var maxRange : float = 300;
var myLightLerpDown : boolean = false;
var myLightLerpUp : boolean = false;
private var shouldLerp : boolean = false;
var controlsRange : boolean = true;
var controlsIntensity : boolean = false;

function Start () {
	InvokeRepeating("enableLight", blinkTimer, blinkTimer);
	InvokeRepeating("disableLight", blinkTimer + blinkOffset, blinkTimer);
}

function Update () {
	 if (shouldLerp == true && myLightLerpUp == true) {
	 	LerpLightUp(.5);
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
        if (controlsRange) {
        myLight.range = Mathf.Lerp(start, end, i);}
        else if (controlsIntensity) {
        myLight.intensity = Mathf.Lerp(start, end, i);}
		yield;
    	}
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
        if (controlsRange) {
        myLight.range = Mathf.Lerp(start, end, i);}
        else if (controlsIntensity) {
        myLight.intensity = Mathf.Lerp(start, end, i);}
		yield;
    	}
    yield WaitForSeconds (timer);
}
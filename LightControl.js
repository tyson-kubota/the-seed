#pragma strict

var myLight : Light;
var blinkTimer : float = 5;
var blinkOffset : float = 1;
var startRange : float = 20;
var maxRange : float = 300;

var minIntensity : float = 2;
var maxIntensity : float = 8;

var myLightLerpDown : boolean = false;
var myLightLerpUp : boolean = false;
private var shouldLerp : boolean = false;
var controlsRange : boolean = true;
var controlsIntensity : boolean = false;
var lightLerpTime : float = 1;

function Start () {
	InvokeRepeating("enableLight", blinkTimer, blinkTimer);
	InvokeRepeating("disableLight", blinkTimer + blinkOffset, blinkTimer);
}

function Update () {
	 if (shouldLerp == true && myLightLerpUp == true) {
	 	LerpLightUp(lightLerpTime);
	 }
	 
	 else if (shouldLerp == true && myLightLerpDown == true) {
	 	LerpLightDown(lightLerpTime);
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
    var startIntensity = minIntensity;
    var endIntensity = maxIntensity;
    var i = 0.0;
    var step = 1.0/timer;
	
	shouldLerp = false;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        if (controlsRange) {
        myLight.range = Mathf.Lerp(start, end, i);}
        if (controlsIntensity) {
        myLight.intensity = Mathf.Lerp(startIntensity, endIntensity, i);}
		yield;
    	}
    yield WaitForSeconds (timer); 
}

function LerpLightDown (timer : float) {
	Debug.Log("started lerp light down");    
	var start = maxRange;
    var end = startRange;
    var startIntensity = maxIntensity;
    var endIntensity = minIntensity;
    var i = 0.0;
    var step = 1.0/timer;
	
	shouldLerp = false;
    
    while (i <= 1.0) { 
        i += step * Time.deltaTime;
        if (controlsRange) {
        myLight.range = Mathf.Lerp(start, end, i);}
        if (controlsIntensity) {
        myLight.intensity = Mathf.Lerp(startIntensity, endIntensity, i);}
		yield;
    	}
    yield WaitForSeconds (timer);
}
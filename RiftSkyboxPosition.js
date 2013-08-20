#pragma strict

public var ParentPosition : Transform;

function MatchPosition () {   
   if(ParentPosition !=null)
         this.transform.position = ParentPosition.position;
}

function Update () { 
	MatchPosition();
}
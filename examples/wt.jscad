function getParameterDefinitions() { 
  return [ 
    { name: 'num', 
      type: 'int',
      caption: 'Number of branches',
      initial: 1,
      min: 1,
      max: 10, 
      step: 1}, 
    { name: 'angles',
      type: 'choice',
      values: ["XZ"],
      captions: ["XZ"],
      initial: 'XZ', 
      caption: 'Angles of' }, 
    { name: 'x', 
      array_size_name:'num',
      type: 'number', 
      initial: 90,
      initial2:90, 
      caption: 'Around X'},
    { name: 'z', 
      array_size_name:'num',
      type: 'number', 
      initial: 0, 
      initial2:90, 
      caption: 'Around Z'}
    ]; 
} 

function processParameters(p){
	switch (p.angles){
		case 'XZ':
			var angles=[];
			try{
				angles=JSON.parse("["+p.values+"]");
			}catch(e){
				throw new Error("Wrong format of angles:"+e);
			}
			if (angles.length<1 || (p.num-1)*2!=angles.length)
				throw new Error("Wrong number of angles:"+angles);
			p.x=[];p.z=[];
			for (var i=0;i<angles.length;i+=2){
				p.x.push(angles[i]);
				p.z.push(angles[i+1]);
			}	
			break;
		default:
			throw new Error("Unknown type of angles");
	}
	return p;
}

function text(m,h,w) {
// render the text
    var o = [];  // list of 3D objects
    var l = vector_text(0,0,m);  // line segments for each character
    l.forEach(function(s) {                // process the line segments
            o.push(rectangular_extrude(s,{w: w,h: h}));
        }
    );
// center the message
    m = union(o);
    var b = m.getBounds();
    var x = 0 - b[0].x - ((b[1].x - b[0].x)/2);
    var y = 0 - b[0].y - ((b[1].y - b[0].y)/2);
    var z = 0 - b[0].z - ((b[1].z - b[0].z)/2);
    return m.translate([x,y,z]);
}

function main(p) {
	//p=processParameters(p);
	console.log(JSON.stringify(p));
	var r=CSG.roundedCylinder(
       {start:[0,0,0],end:[0,0,10]}
       );
    
    for (var i=0;i<p.num;i++){
	    var t = text(i+1+"",0.1,1).rotateX(90);
    	r=r.union(
    		CSG.roundedCylinder(
	            {start:[0,0,0],end:[0,0,10]}
            ).subtract(t).rotateEulerAngles(p.z[i],p.x[i],0)
    	);
    }
    return r;
    
	return CSG.roundedCylinder(
       {start:[0,0,0],end:[0,0,10]}
       ).union(
           CSG.roundedCylinder(
            {start:[0,0,0],end:[0,0,10]}
            ).rotateEulerAngles(60,45,0)//0 around z,45 around x,60 around z
            .setColor(1,0,0)
        ).union(
            CSG.roundedCylinder(
                {start:[0,0,0],end:[15,0,0],radius:0.1}
            ).setColor(1,0,0)//x
        ).union(
            CSG.roundedCylinder(
                {start:[0,0,0],end:[0,15,0],radius:0.1}
            ).setColor(0,1,0)//y
        ).union(
            CSG.roundedCylinder(
                {start:[0,0,0],end:[0,0,15],radius:0.1}
            ).setColor(0,0,1)//z
        )
    ;
}

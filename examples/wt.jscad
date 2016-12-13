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

function main(p) {
	//p=processParameters(p);
	console.log(JSON.stringify(p));
	var r=CSG.roundedCylinder(
       {start:[0,0,0],end:[0,0,10]}
       );
    
    for (var i=0;i<p.num;i++){
    	r=r.union(
    		CSG.roundedCylinder(
	            {start:[0,0,0],end:[0,0,10]}
            ).rotateEulerAngles(p.z[i],p.x[i],0)
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

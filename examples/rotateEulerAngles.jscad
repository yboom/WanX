function main() {
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

import prisma from "../../database/db.config.js"

export const creatematerial =async(req,res)=>{
    const {materialName 
    }=req.body

    try {
        const existingmaterial = await prisma.master_material.findFirst({
            where: { materialName: materialName },
          });
      
          if (existingmaterial) {
            return res.status(400).json({ error: "This materialName is  already exists" });
          }

   await prisma.master_material.create ({
      data:{ materialName }    
    }) 
  return  res.json ({status:200,message:" new material "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add material' }); 
}
  }

export const allmaterial =async(req,res)=>{
    try {
  const allmaterials= await prisma.master_material.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  material ",data:allmaterials})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all material' }); 
}
  }

export const updatematerial =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {materialName }=req.body


    try {
      const existingmaterial = await prisma.master_material.findUnique({
        where: { materialId: id },
      });
    
      if (!existingmaterial) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}


   await prisma.master_material.update ({
    where :{materialId:id},
    
      data:{ materialName ,update_at :new Date() }    
    }) 

  return  res.json ({status:200,message:" update material "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update material' }); 
}
  }


export const deletematerial =async(req,res)=>{
  const id = parseInt( req.params.id)

    try {
      const existingmaterial = await prisma.master_material.findUnique({
        where: { materialId: id },
      });
    
      if (!existingmaterial) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}


   await prisma.master_material.update ({
    where :{materialId:id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  material "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted material' }); 
}
  }
import prisma from "../../database/db.config.js";

export const createColor =async(req,res)=>{
    const {colorcategory }=req.body

    try {
      const existingColor = await prisma.master_color_category.findFirst({
        where: { colorcategory: colorcategory },
      });
  
      if (existingColor) {
        return res.status(400).json({ error: "This Color is  already exists" });
      }
   await prisma.master_color_category.create ({ data:{ colorcategory } }) 
  return  res.json ({status:200,message:" new events "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add color' }); 
} }



export const allColor =async(req,res)=>{
    try {
  const allColors= await prisma.master_color_category.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  colors ",data:allColors})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all events' }); 
}}


export const updateColor =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {colorcategory }=req.body
    try {
      const existingEvent = await prisma.master_color_category.findUnique({
        where: { colorcategoryId: id }, });
    
      if (!existingEvent) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}

   await prisma.master_color_category.update ({
    where :{colorcategoryId:id},
    
      data:{         
            colorcategory ,  
             update_at :new Date()
          
      }    
    }) 
  return  res.json ({status:200,message:" update events "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update events' }); 
}
  }




export const deleteColor =async(req,res)=>{
  const id = parseInt( req.params.id)
    try {
      const existingColor = await prisma.master_color_category.findUnique({
        where: { colorcategoryId: id },
      });
    
      if (!existingColor) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}

   await prisma.master_color_category.update ({
    where :{ colorcategoryId  :id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  color "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted color' }); 
}
  }
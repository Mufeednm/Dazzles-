import prisma from "../../database/db.config.js";

export const createSource =async(req,res)=>{
    const {source }=req.body

    try {
      const existingSource = await prisma.master_lead_source.findFirst({
        where: { source: source },
      });
  
      if (existingSource) {
        return res.status(400).json({ error: "This Source is  already exists" });
      }
   await prisma.master_lead_source.create ({ data:{ source } }) 
  return  res.json ({status:200,message:" new source "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add Source' }); 
} }



export const allSource =async(req,res)=>{
    try {
  const allSources= await prisma.master_lead_source.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  Sources ",data:allSources})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all source' }); 
}}


export const updateSource =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {source }=req.body
    try {
      const existingEvent = await prisma.master_lead_source.findUnique({
        where: { sourceId: id }, });
    
      if (!existingEvent) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}

   await prisma.master_lead_source.update ({
    where :{sourceId:id},
    
      data:{         
        source ,  
             update_at :new Date()
          
      }    
    }) 
  return  res.json ({status:200,message:" update source "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update source' }); 
}
  }




export const deleteSource =async(req,res)=>{
  const id = parseInt( req.params.id)
    try {
      const existingSource = await prisma.master_lead_source.findUnique({
        where: { sourceId: id },
      });
    
      if (!existingSource) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}

   await prisma.master_lead_source.update ({
    where :{ sourceId  :id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  Source "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted Source' }); 
}
  }
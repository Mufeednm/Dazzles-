import prisma from "../../database/db.config.js";

export const createhsn =async(req,res)=>{
    const {hsn,taxPercent }=req.body

    try {
      const existinghsn = await prisma.hsn.findFirst({
        where: { hsn },
      });
  
      if (existinghsn) {
        return res.status(400).json({ error: "This hsn is  already exists" });
      }
   await prisma.hsn.create ({ data:{ hsn,taxPercent } }) 
  return  res.json ({status:200,message:" new hsn "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add hsn' }); 
} }



export const allhsn =async(req,res)=>{
    try {
  const allhsns= await prisma.hsn.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  hsns ",data:allhsns})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all events' }); 
}}


export const updatehsn =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {hsn,taxPercent }=req.body
    try {
      const existinghsn = await prisma.hsn.findUnique({
        where: { hsnId: id }, });
    
      if (!existinghsn) {
        return res.status(400).json({ error: ' hsn is  not found  ' });}

   await prisma.hsn.update ({
    where :{hsnId:id},
    
      data:{         
            hsn , taxPercent, 
             update_at :new Date()
          
      }    
    }) 
  return  res.json ({status:200,message:" update events "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update events' }); 
}
  }




export const deletehsn =async(req,res)=>{
  const id = parseInt( req.params.id)
    try {
      const existinghsn = await prisma.hsn.findUnique({
        where: { hsnId: id },
      });
    
      if (!existinghsn) {
        return res.status(400).json({ error: 'hsn is  not found  ' });}

   await prisma.hsn.update ({
    where :{ hsnId  :id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  hsn "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted hsn' }); 
}
  }
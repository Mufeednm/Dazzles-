import prisma from "../../database/db.config.js"

export const createPricernage =async(req,res)=>{
    const {range }=req.body

    try {
        const existingPrice = await prisma.master_price_range.findFirst({
            where: { range: range },
          });
      
          if (existingPrice) {
            return res.status(400).json({ error: "This range is  already exists" });
          }

   await prisma.master_price_range.create ({
      data:{ range }    
    }) 
  return  res.json ({status:200,message:" new pricerange "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add pricerange' }); 
}
  }

export const allpricerange =async(req,res)=>{
    try {
  const allpriceranges= await prisma.master_price_range.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  pricerange ",data:allpriceranges})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all pricerange' }); 
}
  }

export const updatepricerange =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {range }=req.body


    try {
      const existingPrice = await prisma.master_price_range.findUnique({
        where: { rangeId: id },
      });
    
      if (!existingPrice) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}


   await prisma.master_price_range.update ({
    where :{rangeId:id},
    
      data:{ range ,update_at :new Date() }    
    }) 

  return  res.json ({status:200,message:" update pricerange "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update pricerange' }); 
}
  }


export const deletepricerange =async(req,res)=>{
  const id = parseInt( req.params.id)

    try {
      const existingPrice = await prisma.master_price_range.findUnique({
        where: { rangeId: id },
      });
    
      if (!existingPrice) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}


   await prisma.master_price_range.update ({
    where :{rangeId:id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  pricerange "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted pricerange' }); 
}
  }
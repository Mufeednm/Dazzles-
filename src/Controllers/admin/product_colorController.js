import prisma from "../../database/db.config.js";

export const productsColor =async(req,res)=>{
    const {productsColor }=req.body

    try {
      const products_color = await prisma.products_color.findFirst({
        where: { productsColor},
      });
  
      if (products_color) {
        return res.status(400).json({ error: "This products_color is  already exists" });
      }

   await prisma.products_color.create ({ data:{ productsColor } }) 
  return  res.json ({status:200,message:" new products_color "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add products_color' }); 
} }



export const allproductscolor =async(req,res)=>{
    try {
  const allproducts_colors= await prisma.products_color.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  products_colors ",data:allproducts_colors})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all events' }); 
}}


export const updateproductscolor =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {productsColor}=req.body
    try {
      const products_color = await prisma.products_color.findUnique({
        where: { productsColorId : id }, });
    
      if (!products_color) {
        return res.status(400).json({ error: ' products_color is  not found  ' });}

   await prisma.products_color.update ({
    where :{productsColorId :id},
    
      data:{         
        productsColor,
             update_at :new Date()
          
      }    
    }) 
  return  res.json ({status:200,message:" update terms "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update terms' }); 
}
  }




export const deleteproductscolor =async(req,res)=>{
  const id = parseInt( req.params.id)
    try {
      const products_color = await prisma.products_color.findUnique({
        where: { productsColorId : id },
      });
    
      if (!products_color) {
        return res.status(400).json({ error: 'products_color is  not found  ' });}

   await prisma.products_color.update ({
    where :{ productsColorId   :id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  products_color "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted products_color' }); 
}
  }
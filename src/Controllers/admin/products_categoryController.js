import prisma from "../../database/db.config.js";

export const productscategory =async(req,res)=>{
    const {productsCategory }=req.body

    try {
      const products_category = await prisma.products_category.findFirst({
        where: { productsCategory},
      });
  
      if (products_category) {
        return res.status(400).json({ error: "This products_category is  already exists" });
      }

   await prisma.products_category.create ({ data:{ productsCategory } }) 
  return  res.json ({status:200,message:" new products_category "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add products_category' }); 
} }



export const allproductscategory =async(req,res)=>{
    try {
  const allproducts_categorys= await prisma.products_category.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  products_categorys ",data:allproducts_categorys})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all events' }); 
}}


export const updateproductscategory =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {productsCategory}=req.body
    try {
      const products_category = await prisma.products_category.findUnique({
        where: { productsCategoryId: id }, });
    
      if (!products_category) {
        return res.status(400).json({ error: ' products_category is  not found  ' });}

   await prisma.products_category.update ({
    where :{productsCategoryId:id},
    
      data:{         
        productsCategory,
             update_at :new Date()
          
      }    
    }) 
  return  res.json ({status:200,message:" update terms "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update terms' }); 
}
  }




export const deleteproductscategory =async(req,res)=>{
  const id = parseInt( req.params.id)
    try {
      const products_category = await prisma.products_category.findUnique({
        where: { productsCategoryId: id },
      });
    
      if (!products_category) {
        return res.status(400).json({ error: 'products_category is  not found  ' });}

   await prisma.products_category.update ({
    where :{ productsCategoryId  :id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  products_category "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted products_category' }); 
}
  }
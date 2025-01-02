import prisma from "../../database/db.config.js"

export const Create_Supplier_category =async(req,res)=>{
    const {categoryName }=req.body

    try {
        const existing_Supplier_category = await prisma.master_supplier_categories.findFirst({
            where: { categoryName: categoryName },
          });
      
          if (existing_Supplier_category) {
            return res.status(400).json({ error: "This range is  already exists" });
          }

   await prisma.master_supplier_categories.create ({
      data:{ categoryName }    
    }) 
  return  res.json ({status:200,message:" new supplier category "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add supplier category' }); 
}
  }
  

export const allSupplier_category=async(req,res)=>{
    try {
  const allSupplier_category= await prisma.master_supplier_categories.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  supplier category ",data:allSupplier_category})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all supplier category' }); 
}
  }

export const update_Supplier_category =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {categoryName }=req.body

    try {     
      const existing_Supplier_category = await prisma.master_supplier_categories.findUnique({
        where: { categoryId: id },
      });
    
      if (!existing_Supplier_category) {
        return res.status(400).json({ error: 'categoryId is  not found  ' });}

   await prisma.master_supplier_categories.update ({
    where :{categoryId:id},
    
      data:{ categoryName ,update_at :new Date() }    
    }) 

  return  res.json ({status:200,message:" update supplier category "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error,errors: 'Failed to update supplier category' }); 
} }



export const delete_Supplier_category =async(req,res)=>{
  const id = parseInt( req.params.id)

    try {
      const existing_Supplier_category = await prisma.master_supplier_categories.findUnique({
        where: { categoryId: id },
      });
    
      if (!existing_Supplier_category) {
        return res.status(400).json({ error: 'categoryId is  not found  ' });}


   await prisma.master_supplier_categories.update ({
    where :{categoryId:id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  supplier category "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error,errors: 'Failed to soft deleted supplier category' }); 
}
  }
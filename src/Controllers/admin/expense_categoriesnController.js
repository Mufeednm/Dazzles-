import prisma from "../../database/db.config.js";

export const createexpenseCategory =async(req,res)=>{
    const {	expenseCategory }=req.body

    try {
      const existingexpenseCategory = await prisma.expense_categoriesn.findFirst({
        where: { expenseCategory },
      });
  
      if (existingexpenseCategory) {
        return res.status(400).json({ error: "This 	expenseCategory is  already exists" });
      }
   await prisma.expense_categoriesn.create ({ data:{ expenseCategory } }) 
  return  res.json ({status:200,message:" new expenseCategory "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add expenseCategory' }); 
} }



export const allexpenseCategory =async(req,res)=>{
    try {
  const allexpenseCategorys= await prisma.expense_categoriesn.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  	expenseCategorys ",data:allexpenseCategorys})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all events' }); 
}}


export const updateexpenseCategory =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {expenseCategory }=req.body
    try {
      const existingexpenseCategory = await prisma.expense_categoriesn.findUnique({
        where: { 	expenseCategoryId: id }, });
    
      if (!existingexpenseCategory) {
        return res.status(400).json({ error: ' 	expenseCategory is  not found  ' });}

   await prisma.expense_categoriesn.update ({
    where :{	expenseCategoryId:id},
    
      data:{         
            	expenseCategory ,  
             update_at :new Date()
          
      }    
    }) 
  return  res.json ({status:200,message:" update events "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update events' }); 
}
  }




export const deleteexpenseCategory =async(req,res)=>{
  const id = parseInt( req.params.id)
    try {
      const existingexpenseCategory = await prisma.expense_categoriesn.findUnique({
        where: { 	expenseCategoryId: id },
      });
    
      if (!existingexpenseCategory) {
        return res.status(400).json({ error: '	expenseCategory is  not found  ' });}

   await prisma.expense_categoriesn.update ({
    where :{ 	expenseCategoryId  :id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  	expenseCategory "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted 	expenseCategory' }); 
}
  }
import prisma from "../../database/db.config.js";

export const createterms =async(req,res)=>{
    const {terms ,terms_type }=req.body

    try {
      const existingterms = await prisma.terms_and_conditions.findFirst({
        where: { terms},
      });
  
      if (existingterms) {
        return res.status(400).json({ error: "This terms_and_conditions is  already exists" });
      }
   await prisma.terms_and_conditions.create ({ data:{ terms,terms_type } }) 
  return  res.json ({status:200,message:" new terms_and_conditions "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add terms_and_conditions' }); 
} }



export const allterms =async(req,res)=>{
    try {
  const allterms_and_conditionss= await prisma.terms_and_conditions.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  terms_and_conditionss ",data:allterms_and_conditionss})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all events' }); 
}}


export const updateterms =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {terms,terms_type}=req.body
    try {
      const existingterms = await prisma.terms_and_conditions.findUnique({
        where: { termsID: id }, });
    
      if (!existingterms) {
        return res.status(400).json({ error: ' terms_and_conditions is  not found  ' });}

   await prisma.terms_and_conditions.update ({
    where :{termsID:id},
    
      data:{         
        terms:terms ,
        terms_type:terms_type  ,
             update_at :new Date()
          
      }    
    }) 
  return  res.json ({status:200,message:" update terms "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update terms' }); 
}
  }




export const deleteterm =async(req,res)=>{
  const id = parseInt( req.params.id)
    try {
      const existingterms = await prisma.terms_and_conditions.findUnique({
        where: { termsID: id },
      });
    
      if (!existingterms) {
        return res.status(400).json({ error: 'terms_and_conditions is  not found  ' });}

   await prisma.terms_and_conditions.update ({
    where :{ termsID  :id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  terms_and_conditions "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted terms_and_conditions' }); 
}
  }
import prisma from "../../database/db.config.js"
import { customerjoi } from "../../database/model_validation/customer_Validate.js";

export const createCustomer =async(req,res)=>{
    const {customerName ,customerEmail,customerMobile ,customerAddress,customerMembership}=req.body
  try {

    const { error } = customerjoi.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingCustomer = await prisma.customer.findFirst({
      where: {
          OR: [
              { customerName: customerName },
              { customerMobile: customerMobile },
          ],
      },
  });

  if (existingCustomer) {
      const duplicateField = existingCustomer.customerName === customerName 
          ? "name" 
          : "mobile number";
      return res.status(400).json({ error: `This ${duplicateField} is already registered.` });
  }

    await prisma.customer.create ({
      data:{         
        customerName :  customerName ,
        customerEmail :   customerEmail  ,
        customerMobile: customerMobile  ,
        customerAddress:	 customerAddress,   
        customerMembership:	  customerMembership  
      }    
    }) 
    return  res.json ({status:200,message:" new Customers "})
  } catch (error) {
    console.error(error);
    return res.status(500).json({error, errormessage: 'Failed to create customer' });
  }
  }


  
  export const updateCustomer =async(req,res)=>{

    const id = parseInt(req.params.id);
    const {customerName ,customerEmail,customerMobile ,customerAddress,customerMembership}=req.body
  try {
        const { error } = customerjoi.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    

 await prisma.customer.updateMany ({
    where:{customerId:id},
      data:{         
          customerName :  customerName ,
          customerEmail :   customerEmail  ,
            customerMobile: customerMobile  ,
            customerAddress:	 customerAddress,   
            customerMembership:	  customerMembership  
      }    
    }) 
  return  res.json ({status:200,message:" new Customers "})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update customer' });
    
  }}

  export const viewCustomer =async(req,res)=>{

    const id = parseInt(req.params.id);
  try {
    

 const customer =await prisma.customer.findUnique ({
    where:{customerId:id}}) 
  return  res.json ({status:200,message:" new Customers ",data:customer})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update customer' });
    
    }
  
  }





  export const  allCustomer =async (req,res)=>{
    try {
     const allcustomers=   await prisma.customer.findMany({
      where:{isDeleted:false},
      select: {
        customerId: true,
        customerName: true,
        customerEmail: true,
        customerMobile: true,
        customerAddress: true,
        baseStore: true,
        customerMembership: true,}
     })
        return res.status(200).json({message:"all staff ",data:allcustomers })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete customer' });  
    }
}



  export const deleteCustomer =async(req,res)=>{

    const id = parseInt(req.params.id);
    console.log(id);
  try {
    

 await prisma.customer.update ({
  where: {customerId: id},
  data: {
    isDeleted: true,
  },
}); 
  return  res.json ({status:200,message:" deleted Customers "})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete customer' });
  }}
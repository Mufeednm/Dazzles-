import prisma from "../../database/db.config.js"

export const createCustomer =async(req,res)=>{
    const {customerName ,customerEmail,customerMobile ,customerAddress,baseStore,customerMembership}=req.body
  try {
    
    await prisma.customer.create ({
      data:{         
        customerName :  customerName ,
        customerEmail :   customerEmail  ,
        customerMobile: customerMobile  ,
        customerAddress:	 customerAddress,   
        baseStore	 :baseStore,
        customerMembership:	  customerMembership  
      }    
    }) 
    return  res.json ({status:200,message:" new Customers "})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create customer' });
  }
  }

  export const updateCustomer =async(req,res)=>{

    const id = parseInt(req.params.id);
    const {customerName ,customerEmail,customerMobile ,customerAddress,customerMembership}=req.body
  try {
    

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


  export const  allCustomer =async (req,res)=>{
    try {
     const allcustomers=   await prisma.customer.findMany({
      select: {
        customerId: true,
        customerName: true,
        customerEmail: true,
        customerMobile: true,
        customerAddress: true,
        baseStore: true,
        customerMembership: true,}
     })
     console.log(allcustomers);
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
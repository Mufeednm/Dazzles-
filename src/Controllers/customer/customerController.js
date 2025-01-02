import prisma from "../../database/db.config.js"
import { customerjoi } from "../../database/model_validation/customer_Validate.js";

export const createCustomer =async(req,res)=>{
    const {customerName ,customerMobile ,customerAddress,customerMembership}=req.body
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
  
  export const allCustomer = async (req, res) => {
    try {
        let { page = '1', limit = '10', search = '' } = req.query;

        // Validate and parse page and limit
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || page <= 0) page = 1; // Default to 1 if invalid
        if (isNaN(limit) || limit <= 0) limit = 10; // Default to 10 if invalid

        console.log(req.query, "Validated page and limit values");

        const skip = (page - 1) * limit;
        const take = limit;

        const where = {
            isDeleted: false,
            OR: search
                ? [
                      { customerName: { contains: search, mode: 'insensitive' } },
                      { customerMobile: { contains: search, mode: 'insensitive' } },
                  ]
                : undefined,
        };

        const allcustomers = await prisma.customer.findMany({
            where,
            select: {
                customerId: true,
                customerName: true,
                customerMobile: true,
                customerAddress: true,
                baseStore: true,
                customerMembership: true,
            },
            skip,
            take,
        });

        const totalCustomers = await prisma.customer.count({ where });

        if (totalCustomers === 0) {
            return res.status(404).json({ message: 'No customers found matching the search criteria.' });
        }

        return res.status(200).json({
            message: 'All customers fetched successfully',
            data: allcustomers,
            total: totalCustomers,
            page: page,
            pages: Math.ceil(totalCustomers / take),
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return res.status(500).json({ error: 'Failed to fetch customers' });
    }
};

//   export const allCustomer = async (req, res) => {
//     try {
//         // Destructure query parameters and set default values
//         let { page = '1', limit = '10', search = '' } = req.query;

//         // Validate and parse page and limit to integers
//         page = parseInt(page);
//         limit = parseInt(limit);

//         // Check for NaN and set default values if necessary
//         if (isNaN(page) || page <= 0) page = 1; // Default to 1 if page is invalid
//         if (isNaN(limit) || limit <= 0) limit = 10; // Default to 10 if limit is invalid

//         console.log(req.query, "Validated page and limit values");

//         // Calculate pagination values
//         const take = limit;
//         const skip = (page - 1) * limit;

//         const where = {
//             isDeleted: false,
//             OR: search
//                 ? [
//                       { customerName: { contains: search, mode: 'insensitive' } },
//                       { customerMobile: { contains: search, mode: 'insensitive' } },
//                   ]
//                 : undefined,
//         };

//         const allcustomers = await prisma.customer.findMany({
//             where,
//             select: {
//                 customerId: true,
//                 customerName: true,
//                 customerMobile: true,
//                 customerAddress: true,
//                 baseStore: true,
//                 customerMembership: true,
//             },
//             skip,
//             take,
//         });

//         const totalCustomers = await prisma.customer.count({ where });

//         // Handle no results
//         if (totalCustomers === 0) {
//             return res.status(404).json({ message: 'No customers found matching the search criteria.' });
//         }

//         return res.status(200).json({
//             message: 'All customers fetched successfully',
//             data: allcustomers,
//             total: totalCustomers,
//             page: page,
//             pages: Math.ceil(totalCustomers / take),
//         });
//     } catch (error) {
//         console.error('Error fetching customers:', error);
//         return res.status(500).json({ error: 'Failed to fetch customers' });
//     }
// };


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
      console.error(error<"errooor");
      return res.status(500).json({ errorss: 'Failed to delete customer' });
  }}
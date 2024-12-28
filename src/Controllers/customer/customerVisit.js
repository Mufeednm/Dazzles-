import prisma from "../../database/db.config.js"

export const allvisists = async (req, res) => {
    try {
        const visiters = await prisma.customer_visit.findMany({
            include: {
              // Include the relation field for the user who created the visit
                visitedStore: {    // Assuming this is a relation field for the store
                    select: {
                        storeName: true, // Select only the store name from the related store
                    },
                },
                userCreateds:{
                    select:{
                        userName:true
                    }
                }
            },
        });
        return res.status(200).json({ message: "All visitors", data: visiters });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to show all visitors" });
    }
};


export const  allCustomer =async (req,res)=>{
    try {
     const allcustomers=   await prisma.customer.findMany()
        return res.status(200).json({message:"all staff ",data:allcustomers })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete customer' });  
    }
}

export const createVisit = async (req, res) => {
    const { storeId,customerId,eventDate,sampleDate,boomerangDate,purchaseDate,cityId,bridalEvents,generalOcassions,salesPersonId,supportExecutiveId, supervisorId, catalystId,consultantId,
      serviceType,notes,status,remarks, createdBy,
    } = req.body;
  
    // Validate all fields are provided
    if ( !storeId ||!customerId ||!eventDate || !sampleDate ||!boomerangDate ||!purchaseDate ||!cityId ||!bridalEvents ||!generalOcassions ||!salesPersonId ||!supportExecutiveId ||!supervisorId ||!catalystId ||!consultantId ||!serviceType ||!notes ||!status ||!remarks ||
      !createdBy
    ) {
      return res.status(400).json({
        status: 400,
        message: "All fields are mandatory. Please provide all required fields.",
      });
    }
  
    try {
      // Validate `createdBy` user exists
      const userExists = await prisma.users.findUnique({
        where: { userId: createdBy },
      });
  
      if (!userExists) {
        return res.status(400).json({
          status: 400,
          message: "Invalid createdBy user ID",
        });
      }
  
      // Create the customer visit
      const newVisit = await prisma.customer_visit.create({
        data: {storeId,customerId,  eventDate, sampleDate, boomerangDate, purchaseDate, cityId, bridalEvents, generalOcassions, salesPersonId, supportExecutiveId, supervisorId, catalystId, consultantId, serviceType, notes, status, remarks, createdBy,
        },
      });
  
      return res.status(200).json({
        status: 200,
        message: "New customer visit created successfully",
        data: newVisit,
      });
    } catch (error) {
      console.error("Error creating customer visit:", error);
  
      return res.status(500).json({
        status: 500,
        message: "An error occurred while creating the customer visit",
        error: error.message,
      });
    }
  };
  


  const  updateVisit =async (req,res)=>{
    const id = parseInt( req.params.id)


    try {
      const existingVisit = await prisma.customer_visit.findUnique({
        where: { visitId: id },
      });
    
      if (!existingVisit) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}


const updateVisiter=  await prisma.customer_visit.updateMany({
  data:{
    
  }
})

    } catch (error) {
      
    }

  }
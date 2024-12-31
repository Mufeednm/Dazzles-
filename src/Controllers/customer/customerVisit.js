import prisma from "../../database/db.config.js"

export const allvisists = async (req, res) => {
    try {
        const visiters = await prisma.customer_visit.findMany({
            include: {
          customerVisited:true
            },
        });
        return res.status(200).json({ message: "All visitors", data: visiters });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to show all visitors" });
    }
};

export const searchCustomerByNumber = async (req, res) => {
  const { number } = req.query; // Retrieve the query parameter from the request
  console.log(number);
  if (!number) {
      return res.status(400).json({ error: "Number query parameter is required" });
  }

  try {
      const customers = await prisma.customer.findMany({
          where: {
            customerMobile: {
                  contains: number, // Perform a partial match (use Prisma's 'contains' for LIKE behavior)
              },
          },
          include: {
            customerVisits: true, // Include related data as needed
          },
      });

      if (customers.length === 0) {
          return res.status(404).json({ message: "No customers found matching the number" });
      }

      return res.status(200).json({ message: "Customers found", data: customers });
  } catch (error) {
      console.error("Error searching for customers:", error);
      return res.status(500).json({ error: "Failed to search for customers" });
  }
};





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
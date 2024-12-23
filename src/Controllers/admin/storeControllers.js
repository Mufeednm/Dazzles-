
import prisma from "../../database/db.config.js";
import bcrypt from "bcrypt";


export const createStore = async (req, res) => {
  const { storeName, storeShortName, storeAddress, storeLattitude, storeLongitude,storePhone,storeGST ,storeAPIKey,alternateStoreName,alternateStoreAddress,alternateStoreGST,invoicePrefix,invoiceNumber,whatsappNumber} = req.body;

  if ( !storeName || !storeShortName || !storeAddress || !storeLattitude || !storeLongitude || !storePhone || !storeGST || !storeAPIKey || !alternateStoreName ||  !alternateStoreAddress || !alternateStoreGST || !invoicePrefix || !invoiceNumber || !whatsappNumber
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }



  try {
    // Check if the user already exists
    const existingUser = await prisma.store.findFirst({
      where: { storeName: storeName },
    });

    if (existingUser) {
      return res.status(400).json({ error: "This Store is already exists" });
    }
    // Create the Store
 await prisma.store.create({
        data: {
          storeName: storeName, 
          storeShortName: storeShortName,
          storeAddress: storeAddress,
          storeLattitude: storeLattitude,
          storeLongitude: storeLongitude,
          storePhone: storePhone,
          storeGST: storeGST,
          storeAPIKey: storeAPIKey,
          alternateStoreName: alternateStoreName,
          alternateStoreAddress: alternateStoreAddress,
          alternateStoreGST: alternateStoreGST,
          invoicePrefix: invoicePrefix,
          invoiceNumber: invoiceNumber,
          whatsappNumber: whatsappNumber,
       
        },
      });
      
    return res.status(201).json({ message: "New Store created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};



  // update the user role and other details
export const storeUpdate=async (req,res)=>{
const id = parseInt( req.params.id)
const { storeName, storeShortName, storeAddress, storeLattitude, storeLongitude,storePhone,storeGST ,storeAPIKey,alternateStoreName,alternateStoreAddress,alternateStoreGST,invoicePrefix,invoiceNumber,whatsappNumber} = req.body;

try {
  const existingStore = await prisma.store.findUnique({
    where: { storeId: id },
  });

  if (!existingStore) {
    return res.status(400).json({ error: "user not found" });
  }
  // const hashedPassword = await bcrypt.hash(password, 15); 
 await prisma.users.updateMany({
    where: { userId: id,},
    data: {
        storeName: storeName, 
        storeShortName: storeShortName,
        storeAddress: storeAddress,
        storeLattitude: storeLattitude,
        storeLongitude: storeLongitude,
        storePhone: storePhone,
        storeGST: storeGST,
        storeAPIKey: storeAPIKey,
        alternateStoreName: alternateStoreName,
        alternateStoreAddress: alternateStoreAddress,
        alternateStoreGST: alternateStoreGST,
        invoicePrefix: invoicePrefix,
        invoiceNumber: invoiceNumber,
        whatsappNumber: whatsappNumber,
     
      update_at: new Date ()
    },
  });
 
 
 
  

  return res .status(201).json({ message: "Store updated successfully",});

} catch (error) {
  console.error("Error updating Store:", error);
  return res.status(500).json({ error: "Failed to update Store" });
}
}



//  showw all users
export const showStores = async (req, res) => {
  try {
   const stores=  await prisma.store.findMany();
    return res.status(200).json({ message: "Store retrieved successfully",data:stores});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve stores" });
  }
};

//  delete user
export const deletestore = async (req, res) => {
  const id = parseInt(req.params.id,); // Convert to integer

  try {
    // Check if the user exists
    const store = await prisma.store.findUnique({
      where: {
        storeId: id,
      },
    });

    if (!store) {
      return res.status(404).json({ message: "store not found" });
    }

    // Update the user's isDeleted field to true
    const updatedUser = await prisma.store.update({
      where: {
        storeId: id,
      },
      data: {
        isDeleted: true,
      },
    });

    return res.status(200).json({
      message: "store marked as deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};


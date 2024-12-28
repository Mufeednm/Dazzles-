import prisma from "../../database/db.config.js"

export const createEvents =async(req,res)=>{
    const {eventName ,eventType
      // categoryId 
    }=req.body

    try {
   await prisma.master_events.create ({
      data:{         
            eventName ,
             eventType  ,
            //  categoryId  ,
      }    
    }) 
  return  res.json ({status:200,message:" new events "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add events' }); 
}
  }

export const allEvents =async(req,res)=>{


    try {
  const allEventss= await prisma.master_events.findMany (
    {where:{isDeleted:false} }
    ) 
  return  res.json ({status:200,message:" all  events ",data:allEventss})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to Show all events' }); 
}
  }

export const updateEvent =async(req,res)=>{
  const id = parseInt( req.params.id)
  const {eventName ,eventType
    // categoryId 
  }=req.body


    try {
      const existingEvent = await prisma.master_events.findUnique({
        where: { eventId: id },
      });
    
      if (!existingEvent) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}


   await prisma.master_events.update ({
    where :{eventId:id},
    
      data:{         
            eventName ,
             eventType  ,
             update_at :new Date()
            //  categoryId  ,
      }    
    }) 
  return  res.json ({status:200,message:" update events "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update events' }); 
}
  }
export const deleteEvent =async(req,res)=>{
  const id = parseInt( req.params.id)



    try {
      const existingEvent = await prisma.master_events.findUnique({
        where: { eventId: id },
      });
    
      if (!existingEvent) {
        return res.status(400).json({ error: 'Visiter is  not found  ' });}


   await prisma.master_events.update ({
    where :{eventId:id},
    
      data:{         
        isDeleted:true
      }    
    }) 
  return  res.json ({status:200,message:" soft deleted  events "})
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to soft deleted events' }); 
}
  }
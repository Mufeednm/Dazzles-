import prisma from "../database/db.config.js";

export const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      // Assuming req.user contains the user's ID or permissions array from the JWT
      const userId = req.user.userId;

      // Retrieve the user's permissions from the database
      const userPermissions = await prisma.user_roles.findMany({
        where: { userId },
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true, // Fetch the global permission details
                },
              },
            },
          },
        },
      });

      // Flatten the permission IDs from roles into a single array
      const permission = userPermissions
        .flatMap((role) => role.role.permissions)
        .map((perm) => perm.permission.permission);

      console.log("User Permissions:", permission);

      // Check if the required permission exists in the user's permissions
      if (!permission.includes(requiredPermission)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Proceed if the user has the required permission
      next();
    } catch (error) {
      console.error("Error in permission check:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

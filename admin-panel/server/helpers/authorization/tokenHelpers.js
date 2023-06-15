const sendJwtToClient = (user, res, admin) => {
   const token = user.generateJwtFromUser();
   return res
      .status(200)
      .json({
         admin,
         access_token: token
      });
};
const isTokenIncluded = (req) => {
   return (
      req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
   );
};

const getAccessTokenFromHeader = (req) => {
   const authorization = req.headers.authorization;
   return authorization.split(" ")[1];
};
module.exports = {sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader};
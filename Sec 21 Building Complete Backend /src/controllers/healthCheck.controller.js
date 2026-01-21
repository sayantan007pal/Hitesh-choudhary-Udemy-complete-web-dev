import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// const healthCheck = (req, res)=>{
//     try {
//         res.status(200).json(new ApiResponse(200,{message: "Server is running"}))
//     } catch (err) {
//         console.error(err)
//     }
// }
// export default healthCheck;


///using asyncHandler without try catch

const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, {message: "Server is running"}));
})

export {healthCheck}
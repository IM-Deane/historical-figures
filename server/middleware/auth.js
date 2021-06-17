import jwt from "jsonwebtoken";

// If a user wants to like a post, we check to see if they're authorized
// Once they're verified, the auth middleware (ie. NEXT() ) will call the desired
// controller (ie. like button)

// Next: perform action and then move to next
const auth = async (req, res, next) => {
	// Verify user
	try {
		// token is in the first position of header array
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			// Get username and id
			// test = secret
			decodedData = jwt.verify(token, "test");

			req.userId = decodedData?.id;
		} else {
			// Google Auth
			decodedData = jwt.decode(token);
			// Google unique id
			req.userId = decodedData?.sub;
		}

		// User valid, call the specified controller
		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;

// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { path } = req.query;

//   const apiUrl = `https://api.platonicwash.com/api/${path}`;
//   const response = await fetch(apiUrl, {
//     method: req.method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(req.headers as Record<string, string>), // Forward headers
//     },
//     body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
//   });

//   const data = await response.json();
//   res.status(response.status).json(data);
// }

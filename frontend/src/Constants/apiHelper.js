// import axios from "axios";

// const API_URL = "http://locallearn.in";

// export async function apiHelper({ url, method, data }) {
//   try {
//     const res = await axios({
//       url: url,
//       method: method,
//       data: data,
//       headers: {
//         authorization: getAccessToken(),
//       },
//       // withCredentials: true,
//     });
// ​
//     return res.data.data;
//   } catch (error) {
//     console.log(error);
//     if (error.response.status === 403) {
//       localStorage.removeItem("token");
//       sessionStorage.removeItem("token");
//       errorToast("Unauthorized");
//     }
//   }
// }
// ​
// function getAccessToken() {
//   const token =
//     sessionStorage.getItem("token") || localStorage.getItem("token");
// ​
//   return "Bearer " + token;
// }

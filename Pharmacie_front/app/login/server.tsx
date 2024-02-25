// server.ts
import axios from "axios";

// Define the server-side login function
export const handleServerLogin = async ({ username, password }: { username: string; password: string }) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/pharmacie/login", {
      username,
      password,
    });
    console.log(response)
    const token = response.data.token;
    localStorage.setItem('token', token);

    const userResponse = await axios.get("http://127.0.0.1:5000/pharmacie/user", {
      headers: {
        authorization: ` ${token}`,
      },
    });
    //   Authorization: `Bearer ${token}`,
    let user = userResponse.data;
    console.log(user);

    // Store user data in localStorage
    // localStorage.setItem('user', JSON.stringify(user));

    // console.log(localStorage.getItem('token'));
    // console.log(localStorage.getItem('user'));
   
    // Redirect or navigate to another page after successful login
    return {
      success: true,
      token,
      user,
    };
  } catch (error) {
    console.error("Login failed", error);
    return {
      success: false,
      error: error,
    };
  }
};

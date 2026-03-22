import API from "../utils/api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// 🔥 Register
export const registerUser = async (data: RegisterData) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// 🔥 Login
export const loginUser = async (data: LoginData) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// 🔥 Logout
export const logoutUser = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

// 🔥 Get current user (auto login check)
export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

// 🔥 Get My Portfolio (logged-in user)
export const getMyPortfolio = async () => {
  const res = await API.get("/portfolio/me");
  return res.data;
};

// 🆕 🔥 Get Portfolio by Username (public view)
export const getPortfolioByUsername = async (username: string) => {
  const res = await API.get(`/portfolio/${username}`);
  return res.data;
};
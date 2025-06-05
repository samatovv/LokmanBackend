class TokenService {
    static setToken(token: string) {
      localStorage.setItem("pharm_token", token)
    }
  
    static getToken() {
      return localStorage.getItem("pharm_token")
    }
  
    static removeToken() {
      localStorage.removeItem("pharm_token")
    }
  
    static hasToken(): boolean {
      return !!this.getToken()
    }
  
    static setUser(token: string, id: number) {
      const user = JSON.stringify({ token, id })
      localStorage.setItem("pharm_user", user)
    }
  
    static getUser() {
      const user = localStorage.getItem("pharm_user")
      if (!user) return null
      return JSON.parse(user)
    }
  
    static removeUser() {
      localStorage.removeItem("pharm_user")
    }
  
    static hasUser(): boolean {
      return !!this.getUser()
    }
  
    static clearLS() {
      localStorage.clear()
    }
  }

export default TokenService


export const banners = [
  {
    id: 1,
    category: "For all family members",
    title: "Cold & Flu Protection",
    image: "/images/product4.jpg",
    bgColor: "#EDDFF1"
  },
  {
    id: 2,
    category: "Wellness",
    title: "Vitamins & Supplements",
    image: "/images/product8.jpg",
    bgColor: "#B6E3F6"
  },
  {
    id: 3,
    category: "Vanilla & Cinnamon",
    title: "Amazonia Raw Protein Slim",
    image: "/images/product42.jpg",
    bgColor: "#f7ede2"
  }
];  

export const GridProducts = [
  {
    id: 1,
    description: "Get it now 45% OFF",
    title: "Pyridoxine Vitamin B6",
    image: "/images/product42.jpg",
    width: "550px",
    height: "260px",
  },
  {
    id: 2,
    description: "Pyridoxine Vitamin B6",
    title: "Pyridoxine Vitamin B6",
    image: "/images/product42.jpg",
    width: "269px",
    height: "260px",
  },
  {
    id: 3,
    description: "Pyridoxine Vitamin B6",
    title: "Pyridoxine Vitamin B6",
    image: "/images/product42.jpg",
    width: "350px",
    height: "560px",
  },
  {
    id: 4,
    description: "Get it now 45% OFF",
    title: "Pyridoxine Vitamin B6",
    image: "/images/product42.jpg",
    width: "350px",
    height: "260px",
  },
  {
    id: 5,
    description: "Get it now 45% OFF",
    title: "Pyridoxine Vitamin B6",
    image: "/images/product42.jpg",
    width: "550px",
    height: "260px",
  }
]
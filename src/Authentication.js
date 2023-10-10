import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVwc2t5YTYyNDQwODJAaXNjdGUtaXVsLnB0IiwiaWF0IjoxNjk2MDI4MjM2LCJleHAiOjE3Mjc1NjQyMzZ9.RQvFYje8R0zk6Z5QJEFUfiLU9frWNmy8TyQb7iL6Ihk';

const axiosFest = axios.create({
    baseURL: "https://upfest.site",
    headers: {
        'Authorization': `Bearer ${token}`,
    },
});
export default axiosFest;

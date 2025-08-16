import ApiClient from "./ApiClient";

export const fetchClients = async () => {
    try {
        const response = await ApiClient.get('/clients');
        return response.data;
    } catch (error) {
        
        console.error("Error fetching clients:", error);
    }
}
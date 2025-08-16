import ApiClient from "./ApiClient";

export const fetchClients = async () => {
    try {
        const response = await ApiClient.get('/clients');
        return response.data;
    } catch (error) {
        
        console.error("Error fetching clients:", error);
    }
}

export const fetchClientById = async (clientId) => {
    try {
        const response = await ApiClient.get(`/clients/${clientId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching client by ID:", error);
    }
}
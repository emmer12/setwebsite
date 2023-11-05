import axios from "axios";
import api from ".";
import { getFileExtension } from "../utils";

const endpoint = '/api/ai'

export const generateImage = (data: any) => api.post(`${endpoint}/generate`, data);
export const getImage = (id: string) => axios.post(`${process.env.NEXT_PUBLIC_AI_BASE_URL}/image/get`,
    { id: id },
    {
        headers: {
            "authorization": process.env.NEXT_PUBLIC_KEY as string
        }
    }
);

export const saveImage = (data: any) => api.post(`${endpoint}/save`,
    data);

export const savedImages = () => api.get(`${endpoint}`).then((res) => res.data);
export const removeImage = (id: string) => api.delete(`${endpoint}/${id}`);

export const downloadImage = async (url: string) => {
    try {
        const response = await axios.get(url, { responseType: 'blob' });
        // Create a Blob from the image data
        const blob = new Blob([response.data], { type: response.data.type });

        // Create a link element to download the Blob
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `image.${getFileExtension(url)}`;
        link.click();
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}

export const downloadPdf = async (url: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_AI_BASE_URL}/image/pdf?url=${url}`, {
            responseType: 'blob', headers: {
                "authorization": process.env.NEXT_PUBLIC_KEY as string
            }
        });
        // Create a Blob from the image data
        const blob = new Blob([response.data], { type: response.data.type });

        // Create a link element to download the Blob
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `file.pdf`;
        link.click();
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}


import {changePasswordRequest, loginUserRequest, signUpUserRequest } from "@/utils/types";
import axios from "axios";

const api = axios.create({
    baseURL: "https://srv940199.hstgr.cloud/api/users/",
//   baseURL: "http://127.0.0.1:8000/api/users/",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
    },
});


export const loginUser = async (payload: loginUserRequest) => {

    const response = await api.post(
        "auth/login",
        payload,
        {
        headers: {
            Accept: 'application/json',
            'Content-Type' :  'application/json'
        },
        }
    );


    if (response.data.success) {
        localStorage.setItem("authToken", response.data.data.token)
    }

    return response.data;
}

export const changePassword = async (payload: changePasswordRequest) => {
    
    const token = localStorage.getItem("authToken");
    
    const response = await api.patch(
        "security/change-password",
        payload,
        {
        headers: {
            Accept: 'application/json',
            'Content-Type' :  'application/json',
            Authorization: `Bearer ${token}`,
        },
        }
    );


    if (response.data.success) {
        localStorage.setItem("authToken", response.data.data.token)
    }

    return response.data;
}

export const getUserBrand = async () => {
    const token = localStorage.getItem("authToken");

    const response = await api.get(
        "get-user-brands",
        {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type' :  'application/json'
        },
        }
    );

    return response.data;
}

export const signUpUser = async (payload: signUpUserRequest) => {
    try {
         const response = await api.post(
        "auth/register",
        payload,
        {
        headers: {
            Accept: 'application/json',
            'Content-Type' :  'application/json'
        },
        }
    );

        console.log(response.data);

        if (response.data.success) {
            localStorage.setItem("authToken", response.data.data.token)
        }
        return response.data;
    } catch (e) {
        throw e;
    }
   

}

export const getCardData = async () => {
    const token = localStorage.getItem("authToken");
    console.log(`token is ${token}`);

    const response = await api.get(
        "odditor-card-info",
        {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type' :  'application/json'
        },
        }
    );

    console.log(response.data);
     if (response.data.data.success) {
        // localStorage.setItem("authToken", response.data.data.token)
    }

    return response.data;
}

export const getCampaignCardData = async (id: string) => {
    const token = localStorage.getItem("authToken");
    console.log(`token is ${token}`);

    const response = await api.get(
        `brand-campaign/${id}/card-info`,
        {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type' :  'application/json'
        },
        }
    );

    console.log(response.data);
     if (response.data.data.success) {
        // localStorage.setItem("authToken", response.data.data.token)
    }

    return response.data;
}

export const getBrandCampaigns = async (brand_id: string) => {
    const token = localStorage.getItem("authToken");
    console.log(`token is ${token}`);

    const response = await api.get(
        `get-brand/${brand_id}/campaigns`,
        {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type' :  'application/json'
        },
        }
    );

    console.log(response.data);
     if (response.data.data.success) {
        // localStorage.setItem("authToken", response.data.data.token)
    }

    return response.data;
}

export const getParticipantsData = async (filter?: string) => {
    const token = localStorage.getItem("authToken");

    const response = await api.get(
        "odditor-participants",
        
        {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type' :  'application/json'
        },

        params: {
            filter: filter, 
        },
        }
    );

     if (response.data.data.success) {
        // localStorage.setItem("authToken", response.data.data.token)
    }

    return response.data;
}

export const getCampaignParticipantsData = async (id: string, filter?: string) => {
    const token = localStorage.getItem("authToken");

    const response = await api.get(
        `brand-campaign/${id}/participants`,
        
        {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type' :  'application/json'
        },

        params: {
            filter: filter, 
        },
        }
    );

     if (response.data.data.success) {
        // localStorage.setItem("authToken", response.data.data.token)
    }

    return response.data;
}
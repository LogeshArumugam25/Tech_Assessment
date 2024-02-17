export const BaseURL = `https://api.github.com`;

export const getUsersData = async () => {
    try {
        let response = await fetch(`${BaseURL}/users`, 
        {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json"
            },
        });
        if(response.status === 200 || response.status === 201){
            return await response.json();
        }
        else if(response.status === 400 || response.status === 401 || response.status === 404){
            return await response.json();
        }
        else {
            var errorResponse = await response.json();
            throw new Error(errorResponse.error)
        }
    }
    catch(e) {
        console.log(e)
    }
};

export const getUserDetail = async (userName) => {
    try {
        let response = await fetch(`${BaseURL}/users/${userName}`, 
        {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json"
            },
        });
        if(response.status === 200 || response.status === 201){
            return await response.json();
        }
        else if(response.status === 400 || response.status === 401 || response.status === 404){
            return await response.json();
        }
        else {
            var errorResponse = await response.json();
            throw new Error(errorResponse.error)
        }
    }
    catch(e) {
        console.log(e)
    }
}
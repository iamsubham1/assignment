const baseUrl = "https://portfolio-backend-30mp.onrender.com"
const userId = "65b3a22c01d900e96c4219ae"

export const getUserInfoById = async () => {

    try {
        const response = await fetch(`${baseUrl}/api/v1/get/user/${userId}`, {

        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching search results:', error.message);
        throw error;
    }
};  
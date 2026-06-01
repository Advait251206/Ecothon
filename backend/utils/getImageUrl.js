const axios = require('axios'); // Using axios for easier file upload in CommonJS if needed, or fetch

async function getImageUrl(file) {
    const apiKey = process.env.IMAGE_BB_API_KEY;
    if (!apiKey) throw new Error("ImageBB API Key missing");

    const formData = new FormData();
    formData.append("image", file.buffer.toString("base64"));

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        if(result.status === 200) {
            return result.data.url;
        }
        else {
            throw new Error('Image upload failed: ' + (result.error ? result.error.message : 'Unknown error'));
        }
    } catch (err) {
        console.error("ImgBB Upload Error:", err);
        throw err;
    }
}

module.exports = getImageUrl;

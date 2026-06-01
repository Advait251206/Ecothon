export default async function getImageUrl(file) {
    const apiKey = process.env.IMAGE_BB_API_KEY;
    const form = new FormData();
    form.append("image", file.buffer.toString("base64"));

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: form,
    });

    const result = await response.json();
    if(result.status === 200) {
        return result.data.url;
    }
    else {
        throw new Error('Image upload failed');
    }
}
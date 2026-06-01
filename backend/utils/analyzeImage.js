const axios = require('axios');
const FormData = require('form-data');

async function analyzeImage(imageBuffer, filename = 'image.jpg') {
    try {
        const form = new FormData();
        form.append('file', imageBuffer, { filename });

        // Python service running at http://127.0.0.1:8000
        const response = await axios.post('http://127.0.0.1:8000/detect', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        // Response format from Python API:
        // {
        //   "coverage_percent": 12.5,
        //   "mask_base64": "hex_string",
        //   "overlay_base64": "hex_string"
        // }
        const data = response.data;
        
        // Convert hex strings to base64 for frontend display
        if (data.mask_base64) {
            data.mask_base64 = Buffer.from(data.mask_base64, 'hex').toString('base64');
        }
        if (data.overlay_base64) {
            data.overlay_base64 = Buffer.from(data.overlay_base64, 'hex').toString('base64');
        }

        return {
            success: true,
            data: data
        };
    } catch (error) {
        // Log but don't crash - AI service might be down
        console.warn('Python AI Service Error:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = analyzeImage;

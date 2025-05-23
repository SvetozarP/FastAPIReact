import {useState} from 'react';

function FileForm() {
    const [files, setFiles] = useState([])

    const handleFileInputChange = (event) => {
        setFiles(Array.from(event.target.files))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        files.forEach( file => {
            formData.append('file_uploads', file);
        })

        try {
            const endpoint = "http://localhost:8000/uploadfile/";
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                console.log("File uploaded successfully!")
            } else {
                console.error("Failed to upload file")
            }
        } catch(error) {
            console.error(error)
        }

    }

    return (
        <div>
            <h1>Upload file</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px"}}>
                    <input type="file" onChange={handleFileInputChange} multiple />
                </div>
                <button type="submit">Upload</button>

            </form>

        </div>
    )
}

export default FileForm
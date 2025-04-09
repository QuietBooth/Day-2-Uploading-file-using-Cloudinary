import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setError(""); 
    setIsLoading(true); 

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/files/upload", formData);
      setImageUrl(res.data.url);
      setError(""); 
      console.log("File uploaded successfully:", res.data.url);
    } catch (error) {
      setError("Upload failed. Try again.");
      console.error("Upload error:", error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={isLoading}>Upload</button>
      {isLoading && <p>Loading...</p>} 
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded file" />}
    </div>
  );
};

export default FileUpload;

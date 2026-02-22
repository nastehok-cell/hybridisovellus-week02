import { useState } from 'react';
import useForm from '../hooks/formHooks';
import { useFile, useMedia } from '../hooks/apiHooks';
import { useNavigate } from 'react-router';

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { postFile } = useFile();
  const { postMedia } = useMedia();

  const initValues = { title: '', description: '' };

  const doUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const uploadedFile = await postFile(file, token);
      await postMedia(uploadedFile, inputs, token);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doUpload, initValues);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  return (
    <>
      <h1>Upload</h1>
      {uploading && <p>Uploading...</p>}
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-4/5">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            className="my-[10px] p-[10px] border border-[#ccc] rounded-[5px]"
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            className="my-[10px] p-[10px] border border-[#ccc] rounded-[5px]"
          ></textarea>
        </div>
        <div className="flex flex-col w-4/5">
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="my-[10px]"
          />
        </div>
        <img
          src={file ? URL.createObjectURL(file) : 'https://placehold.co/320x240?text=Choose+image'}
          alt="preview"
          className="w-[200px] h-[200px] object-cover rounded-[5px] my-[10px]"
        />
        <button
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
          className="my-[10px] p-[10px] rounded-[5px] bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
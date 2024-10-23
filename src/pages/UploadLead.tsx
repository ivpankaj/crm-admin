

// // src/components/FileUpload.tsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload: React.FC = () => {
//     const api_url = import.meta.env.VITE_API_URL;

//     const [file, setFile] = useState<File | null>(null);
//     const [errorMessages, setErrorMessages] = useState<string[]>([]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setFile(event.target.files[0]);
//             setErrorMessages([]); // Clear previous errors
//         }
//     };

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (!file) {
//             alert('Please select a file to upload.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post(`${api_url}/upload`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert(response.data.message);
//             setErrorMessages([]); // Clear errors on successful upload
//         } catch (error) {
//             console.error(error);
//             if (axios.isAxiosError(error) && error.response) {
//                 const validationErrors = error.response.data.errors || [];
//                 const messages = validationErrors.map((err: any) => {
//                     return `Line ${err.line}: ${err.missing}`;
//                 });
//                 setErrorMessages(messages);
//             } else {
//                 alert('Error uploading file.');
//             }
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input type="file" onChange={handleFileChange} accept=".xlsx,.xls,.csv" />
//                 <button type="submit">Upload</button>
//             </form>
//             {errorMessages.length > 0 && (
//                 <div>
//                     <h3>Validation Errors:</h3>
//                     <ul>
//                         {errorMessages.map((message, index) => (
//                             <li key={index}>{message}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FileUpload;






// src/components/FileUpload.tsx
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
    const api_url = import.meta.env.VITE_API_URL;

    const [file, setFile] = useState<File | null>(null);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [duplicateEntries, setDuplicateEntries] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            setErrorMessages([]);
            setDuplicateEntries([]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${api_url}/upload/lead`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            setErrorMessages([]);
            setDuplicateEntries([]);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error) && error.response) {
                const validationErrors = error.response.data.errors || [];
                const messages = validationErrors.map((err: any) => {
                    return `Line ${err.line}: ${err.missing}`;
                });
                setErrorMessages(messages);

                const duplicates = error.response.data.duplicates || [];
                const duplicateMessages = duplicates.map((dup: any) => {
                    return `Line ${dup.line}: Duplicate entry with Email ${dup.email} and Contact Number ${dup.contactNumber}`;
                });
                setDuplicateEntries(duplicateMessages);
            } else {
                alert('Error uploading file.');
            }
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4">File Upload</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                        Upload your file (CSV, XLSX, XLS)
                    </label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".xlsx,.xls,.csv"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Upload
                    </button>
                </div>
            </form>
            {errorMessages.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Validation Errors:</strong>
                    <ul className="list-disc pl-5">
                        {errorMessages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}
            {duplicateEntries.length > 0 && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Duplicate Entries:</strong>
                    <ul className="list-disc pl-5">
                        {duplicateEntries.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUpload;

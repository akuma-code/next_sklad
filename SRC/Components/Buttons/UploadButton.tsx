'use client'

import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface UploadButtonProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    title?: string
}

const UploadButton = ({ onChange, title }: UploadButtonProps) => {

    // const [file, setFile] = useState<File | null>(null);


    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         console.log(e.target.files)
    //         setFile(e.target.files[0]);
    //     }
    // }

    return (
        <Button
            component="label"
            role={ undefined }
            variant="contained"
            tabIndex={ -1 }
            startIcon={ <CloudUploadIcon /> }
        >
            { title ? title : "Upload files" }
            <VisuallyHiddenInput
                type="file"
                onChange={ onChange }

                multiple
            />
        </Button>
    );
}

export default UploadButton

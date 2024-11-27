import React from 'react';
import { useSlider } from '@mui/base';

const CustomSlider = () => {
    const { getRootProps, getThumbProps, active, value } = useSlider({
        min: 0,
        max: 100,
        defaultValue: 50,
        step: 1,
    });

    // Style objects
    const rootStyle = {
        position: 'relative',
        width: '100%',
        height: '8px',
        backgroundColor: active ? '#3f51b5' : '#ddd',
        borderRadius: '4px',
    };

    const thumbStyle = {
        position: 'absolute',
        top: '-6px',
        width: '20px',
        height: '20px',
        backgroundColor: '#3f51b5',
        borderRadius: '50%',
        cursor: 'pointer',
        transform: `translateX(${value}%)`,
    };

    return (
        <div {...getRootProps()} style={rootStyle}>
            <div {...getThumbProps()} style={thumbStyle} />
            <p>Value: {value}</p>
        </div>
    );
};

export default CustomSlider;

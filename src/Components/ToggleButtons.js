import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons() {
    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            style={{ "backgroundColor": "white", "borderRadius": "13px", "z-index": "1231331231", "left": "13px", "top": "10px", "position": "fixed" }}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"

        >
            <ToggleButton value="left" aria-label="left aligned"  >
                <FormatAlignLeftIcon />
            </ToggleButton>

        </ToggleButtonGroup>
    );
}
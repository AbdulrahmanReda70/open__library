import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useEffect, useState } from 'react';
import { useEditReviewMutation, useGetReviewQuery } from '../api/authApiSlice';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
    '& .MuiSvgIcon-root': {
        fontSize: '3rem',
        // Adjust icon size here
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function RadioGroupRating({ book, userId }) {
    const { data: revValue, refetch, isLoading } = useGetReviewQuery({ userId, book });
    const [reviewValue, setReviewValue] = useState(2);

    const [editReview] = useEditReviewMutation();

    useEffect(() => {
        setReviewValue(revValue);
    }, [revValue, isLoading]);
    function editRev(event, newValue) {
        setReviewValue(newValue);
        editReview({ book, userId, newValue });
        refetch();
    }

    return (
        <StyledRating
            name="highlight-selected-only"
            value={reviewValue} // Controlled value
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            highlightSelectedOnly
            onChange={editRev}
        />
    );
}

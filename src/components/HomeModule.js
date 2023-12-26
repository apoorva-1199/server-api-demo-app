import React from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TitleSubtitleComponent from "./TitleSubtitleComponent";

const HomeModule = () => {
    const theme = useTheme();

    const titleSubtitleComponentProps = () => {
        return {
            title: {
                text: "Gradebook",
            },
            subTitle: {
                variant: 'subtitle2',
                text: 'Class Dates: Apr 27, 2023 - Apr 25, 2024'
            },
        };
    }
    console.log(theme.palette.primary.main);

    return (
        <Box sx={{ backgroundColor: theme.palette.primary.main }}>
            <Box mx={4} px={2}>
                <Box pb={2}>
                    <Box pb={3} pt={3} display="flex" alignItems="center" justifyContent="space-between">
                        <TitleSubtitleComponent {...titleSubtitleComponentProps()} />
                    </Box>
                </Box>
            </Box>
        </Box>)
};

export default HomeModule;
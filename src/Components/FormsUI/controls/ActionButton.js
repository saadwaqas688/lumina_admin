import React from 'react'
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5),
        '&:hover': {
            backgroundColor: '#ffb3b3',
            color: 'white',
        }
    },
    secondary: {
        backgroundColor:'#ff6699',//hot pink
        '& .MuiButton-label': {
            color: '#ffe6e6',//light pink
        }
    },
    primary: {
        backgroundColor: '#ff6699',
        '& .MuiButton-label': {
            color: 'white',
        }
    },
}))

 const ActionButton=({variant, ...props })=> {

    const { color, children, onClick, } = props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}
            variant = {variant}
            {...props}
            >
            {children}
        </Button>
    )
}


export default ActionButton

ActionButton.defaultProps={
    variant:"outlined"
}
'use client'

import React from 'react'

import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import classes from './sendbutton.module.css'
import CustomTheme from './customtheme'

export default function SendButton({ 
    disabled = false,
    onClick = undefined,
    children = undefined,
    color = '#00bd7e',
}) {
    const classContainer = disabled ? classes.disabled : classes.container
    /*
    <ShoppingCartIcon 
                        fontSize="large" 
                        sx={{
                            color: '#fff',
                            m: 2,
                        }}
                        />*/
    return (
        <div className={classContainer} style={{
            backgroundColor: disabled ? '#555' : color,
        }}>
            <div className={classes.button} style={{
                borderColor: disabled ? '#555' : color,
            }}>
                <CustomTheme>
                    <IconButton disabled={disabled} onClick={onClick}>
                        {
                            children
                        }
                    </IconButton>
                </CustomTheme>
            </div>
        </div>
    )
}

SendButton.propTypes = {
    /**
     * Disabled property
     */
    disabled: PropTypes.bool,
    /**
     * Color property
     */
    color: PropTypes.string,
    /**
     * children
     */
    children: PropTypes.object,
    /**
     * onClick event
     */
    onClick: PropTypes.func,
}
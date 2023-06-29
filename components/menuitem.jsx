'use client'

import React from 'react'

import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/DeleteForever'

import CustomTheme from './customtheme'

import classes from './menuitem.module.css'

export default function MenuItem({ 
    id = '', 
    name = '', 
    disabled = false,
    onClick = undefined,
}) {
    return (
        <div className={classes.item}>
            <div className={classes.text}>
                <span>{ name }</span>
            </div>
            <CustomTheme>
                <IconButton disabled={disabled} onClick={() => onClick(id)}>
                    <DeleteIcon />
                </IconButton>
            </CustomTheme>
        </div>
    )
}

MenuItem.propTypes = {
    /**
     * Id string
     */
    id: PropTypes.string,
    /**
     * Name string
     */
    name: PropTypes.string,
    /**
     * Disabled property
     */
    disabled: PropTypes.bool,
    /**
     * onClick event
     */
    onClick: PropTypes.func,
}
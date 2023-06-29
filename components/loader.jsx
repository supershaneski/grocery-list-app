'use client'

import React from 'react'

import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

import classes from './loader.module.css'

export default function Loader() {
    return (
        <div className={classes.container}>
            <Stack sx={{ color: '#e6e6e699' }}>
                <CircularProgress color='inherit' />
            </Stack>
        </div>
    )
}
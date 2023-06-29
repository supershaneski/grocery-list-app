'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

import { createPortal } from 'react-dom'

import Button from '@mui/material/Button'
//import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

//import { DataGrid } from '@mui/x-data-grid'
//import GridRowsProp from '@mui/x-data-grid/GridRowsProp'
//import GridColDef from '@mui/x-data-grid/GridColDef'

//import Fab from '@mui/material/Fab'

import ListIcon from '@mui/icons-material/List'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
//import RemoveIcon from '@mui/icons-material/HighlightOff'

//import DeleteIcon from '@mui/icons-material/Delete'
import RiceBowlIcon from '@mui/icons-material/RiceBowl'
import ClearIcon from '@mui/icons-material/Clear'
//import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/Add'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'

//import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import CustomTheme from '../components/customtheme'

import MenuItem from '../components/menuitem'
import SendButton from '../components/sendbutton'
import Dialog from '../components/dialog'
import Loader from '../components/loader'

import useCaption from '../lib/usecaption'
import useDarkMode from '../lib/usedarkmode'
import useMenuStore from '../stores/menustore'
import useGroceryStore from '../stores/grocerystore'
import useResultStore from '../stores/resultstore'

import { getSimpleId } from '../lib/utils'

import captions from '../assets/captions.json'

import classes from './sandbox.module.css'

export default function Sandbox() {
    
    useDarkMode()

    const setCaption = useCaption(captions)

    const savedMenus = useMenuStore((state) => state.items)
    const addMenu = useMenuStore((state) => state.add)
    const deleteMenu = useMenuStore((state) => state.delete)
    const clearMenu = useMenuStore((state) => state.clear)

    const savedItems = useResultStore((state) => state.items)
    const setSavedItems = useResultStore((state) => state.set)

    const inputRef = useRef()

    const [isLoading, setLoading] = useState(false)
    const [startTimer, setStartTimer] = useState(false)
    const [inputText, setInputText] = useState('')
    const [menuItems, setMenuItems] = useState([])
    const [foodItems, setFoodItems] = useState([])

    const [openDialog, setDialog] = useState(false)
    
    useEffect(() => {

       setMenuItems(savedMenus)
       setFoodItems(savedItems)
       console.log(savedItems)

    }, [])

    useEffect(() => {

        let timer = null

        if(startTimer) {

            timer = setTimeout(() => {

                setLoading(false)

                setStartTimer(false)

                setDialog(true)

            }, 3000)

        }

        return () => {

            clearTimeout(timer)

        }

    }, [startTimer])

    const handleSubmit = (e) => {

        e.preventDefault()

        if(inputText.trim().length === 0) {
            return
        }

        const newMenu = {
            id: getSimpleId(),
            name: inputText.trim(),
        }

        addMenu(newMenu)

        setMenuItems((prevItems) => [...prevItems, ...[newMenu]])

        setInputText('')

    }

    const handleDelete = (id) => {

        deleteMenu(id)

        setMenuItems((prevItems) => {
            return prevItems.filter((item) => item.id !== id)
        })

    }

    const handleDeleteAll = () => {

        clearMenu()

        setMenuItems([])

    }

    const handleIngredients = async () => {
        
        console.log('handle ingredient...')

        setLoading(true)

        try {

            const items = menuItems.map((item) => item.name)

            const response = await fetch('/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: items,
                })
            })

            if(!response.ok) {
                console.log('Oops, error has occurred', response.status)
            }

            const result = await response.json()

            console.log('result', (new Date()).toLocaleTimeString(), result.text)

            /*
            if(result.text) {

                const uniqueItem = (value, index, array) => array.indexOf(value) === index
                
                let food_items = result.text.split('\n').filter((item) => item.length > 0 && item.indexOf('Note:') < 0 && item.indexOf('Grocery List:') < 0 && item.indexOf('Ingredients:') < 0)
                    .map((item) => item.indexOf('- ') === 0 ? item.slice(2) : item)

                food_items = food_items.filter(uniqueItem)

                setFoodItems(food_items)

                setStartTimer(true)

            } else {

                setLoading(false)

            }
            */

            if(result.ingredients.length > 0) {

                //const uniqueItem = (item, index, array) => array.indexOf(item.name) === index

                let extra_items = []
                let tmp_name = ''

                let ingredients = result.ingredients.filter((item) => {
                    if(tmp_name.length > 0) {

                        if(tmp_name.indexOf(item.name) >= 0) {

                            console.log(item)
                            extra_items.push(item)

                            return false
                        } else {
                            tmp_name += ',' + item.name
                            return true
                        }

                    } else {
                        tmp_name = item.name
                        return true
                    }
                })
                //ingredients = ingredients.filter(uniqueItem)

                ingredients = ingredients.map((item) => {
                    
                    //let dish = [item.dish]
                    let dish = item.dish

                    for(let i = 0; i < extra_items.length; i++) {
                        if(extra_items[i].name === item.name) {
                            dish += ',' + extra_items[i].dish
                            //dish.push(extra_items[i].dish)
                        }
                    }

                    console.log(item.name, item.quantity, dish)

                    return {
                        name: item.name,
                        quantity: item.quantity,
                        dish: dish
                    }
                })

                setFoodItems(ingredients)
                setSavedItems(ingredients)

                setStartTimer(true)

            } else {

                setLoading(false)

            }

        } catch(error) {

            console.log(error)

            setLoading(false)

        }

    }

    const handleClose = () => {

        setDialog(false)

    }

    const handleShowList = () => {

        setDialog(true)

    }

    return (
        <div className={classes.container}>
            <div className={classes.main}>
                <div className={classes.header}>
                    <div className={classes.banner}>
                        <CustomTheme>
                            <ShoppingBagIcon fontSize="large" />
                        </CustomTheme>
                    </div>
                    <h4 className={classes.title}>{setCaption('title')}</h4>
                </div>
                <div className={classes.input}>
                    <CustomTheme>
                        <Box 
                        component="form" 
                        onSubmit={handleSubmit}
                        noValidate>
                            <TextField 
                            disabled={menuItems.length > 7 || isLoading}
                            fullWidth
                            inputRef={inputRef}
                            value={inputText}
                            placeholder={setCaption('placeholder-input')}
                            onChange={(e) => setInputText(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <RiceBowlIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <>
                                        <IconButton
                                        disabled={inputText.length === 0 || isLoading}
                                        onClick={() => setInputText('')}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                        <IconButton
                                        disabled={inputText.length === 0 || isLoading}
                                        onClick={handleSubmit}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        </>
                                    </InputAdornment>
                                ),
                            }}
                            />
                        </Box>
                    </CustomTheme>
                </div>
                <div className={classes.menu}>
                    <h4 className={classes.subtitle}>{setCaption('menu')}</h4>
                    <div className={classes.list}>
                        {
                            menuItems.sort((a, b) => {
                                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                                return 0
                            }).map((menu) => {
                                return (
                                    <MenuItem key={menu.id} id={menu.id} name={menu.name} disabled={isLoading} onClick={handleDelete} />
                                )
                            })
                        }
                        {
                            menuItems.length > 1 &&
                            <div className={classes.clearItem}>
                                <CustomTheme>
                                    <Button color="inherit" onClick={handleDeleteAll}>{setCaption('delete-all')}</Button>
                                </CustomTheme>
                            </div>
                        }
                    </div>
                </div>
                <div className={classes.action}>
                    <div className={classes.actionButton}>
                        <SendButton disabled={menuItems.length === 0 || isLoading} onClick={handleIngredients}>
                            <ShoppingCartIcon 
                            fontSize="large" 
                            sx={{
                                color: '#fff',
                                m: 2,
                            }}
                            />
                        </SendButton>
                    </div>
                    {
                        foodItems.length > 0 &&
                        <div className={classes.actionButton}>
                            <SendButton 
                             disabled={foodItems.length === 0 || isLoading}
                            color="#F2A900"
                            onClick={handleShowList}
                            >
                                <ListIcon
                                fontSize="large" 
                                sx={{
                                    color: '#fff',
                                    m: 2,
                                }}
                                />
                            </SendButton>
                        </div>
                    }
                </div>
            </div>
            {
                isLoading && createPortal(
                    <Loader />,
                    document.body,
                )
            }
            {
                openDialog && createPortal(
                    <Dialog items={foodItems} onClose={handleClose} />,
                    document.body,
                )
            }
        </div>
    )
}
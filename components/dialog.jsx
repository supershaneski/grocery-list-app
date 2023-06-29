'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'

import KitchenIcon from '@mui/icons-material/Kitchen'
import ShoppingIcon from '@mui/icons-material/ShoppingCart'
import AddCartIcon from '@mui/icons-material/AddShoppingCart'
import ClearIcon from '@mui/icons-material/Clear'

import CustomTheme from './customtheme'
import SendButton from './sendbutton'

import useGroceryStore from '../stores/grocerystore'

import captions from '../assets/captions.json'
import useCaption from '../lib/usecaption'

import { capitalizeFirstLetter } from '../lib/utils'

import classes from './dialog.module.css'

export default function Dialog({
    items = [],
    onClose = undefined,
}) {

    const setCaption = useCaption(captions)

    const ingredients = useGroceryStore((state) => state.items)
    const addIngredient = useGroceryStore((state) => state.add)
    const deleteIngredient = useGroceryStore((state) => state.delete)

    const [groceryItems, setGroceryItems] = useState([])

    useEffect(() => {
        
        let menus = items.map((item, index) => {

            /*
            const token = item.split(',')

            let name = token[0].trim()
            let amount = token.length > 1 ? token[1].trim() : ''
            
            let dish = ''
            if(token.length > 2) {
                for (let k = 2; k < token.length; k++) {
                    if(k === 2) {
                        dish = token[k]
                    } else {
                        dish += ',' + token[k]
                    }
                }
            }
            */

            let name = item.name
            let amount = item.quantity
            let dish = item.dish
            
            let status = 'Buy'

            const _item = ingredients.find((_) => _.name === name)
            if(_item) {
                status = 'In Stock'
            }

            return {
                id: `${index}-${name}-${amount}`,
                name: name,
                amount: amount,
                dish: dish,
                status: status,
            }

        }).filter((item) => item.name.toLowerCase() !== 'water')

        /*
        let skeys = ''
        menus = menus.filter((item) => item.amount.length > 0).filter((item) => {
            if(skeys.length === 0) {
                skeys = item.name
                return true
            } else {
                if(skeys.indexOf(item.name) >= 0) {
                    return false
                } else {
                    skeys+=','+item.name
                    return true
                }
            }
        })
        */

        setGroceryItems(menus)

    }, [])

    const handleStatus = (name, amount, _status) => {

        let items = groceryItems.map((_) => {
            let status = _.name === name ? _.status === 'Buy' ? 'In Stock' : 'Buy' : _.status
            return {
                ..._,
                status,
            }
        })

        setGroceryItems(items)

        if(_status === 'Buy') {

            addIngredient({ name, amount })

        } else {

            deleteIngredient(name)

        }

    }

    /*
    <CustomTheme>
        <Button 
        onClick={() => handleStatus(item.name, item.amount, item.status)}
        color={item.status === 'Buy' ? "primary" : "success"}
        startIcon={item.status === 'Buy' ? <AddCartIcon /> : <KitchenIcon />} 
        variant="outlined" 
        sx={{ width: '130px' }}>{ item.status }</Button>
    </CustomTheme>
    */

    return (
        <div className={classes.container}>
            <div className={classes.main}>
                <div className={classes.header}>
                    <h4 className={classes.title}>{setCaption('grocery-list')}</h4>
                </div>
                <div className={classes.list}>
                    {
                        groceryItems.sort((a, b) => {
                            if(a.name > b.name) return 1
                            if(a.name < b.name) return -1
                            return 0
                        }).map((item) => {
                            const noStatus = item.name.toLowerCase() === 'water' ? true : false

                            //const dish = item.dish.split(';').map((m) => capitalizeFirstLetter(m)).join(', ')
                            //const dish = item.dish.length === 0 ? [] : item.dish.split(', ')
                            const dish = item.dish.length === 0 ? [] : item.dish.split(',')
                            
                            //<div className={classes.listDish}><span>{ dish }</span></div>

                            return (
                                <div key={item.id} className={classes.listItem}>
                                    <div className={classes.listAmount}><span>{ item.amount }</span></div>
                                    <div className={classes.listName}><span>{ item.name }</span></div>
                                    <div className={classes.listDish}>
                                    {
                                        dish.length > 0 &&
                                        dish.map((_item, _index) => {
                                            return (
                                                <CustomTheme key={_index}>
                                                    <Chip variant="outlined" label={capitalizeFirstLetter(_item.trim())} sx={{mr: .5, mb: .5}} />
                                                </CustomTheme>
                                            )
                                        })
                                    }
                                    </div>
                                    <div className={classes.listStatus}>
                                        {
                                            !noStatus &&
                                            <CustomTheme>
                                                <IconButton
                                                onClick={() => handleStatus(item.name, item.amount, item.status)}
                                                >
                                                { item.status === 'Buy' ? <AddCartIcon sx={{color: '#00bd7e'}} /> : <KitchenIcon sx={{color: '#999'}} /> }
                                                </IconButton>
                                            </CustomTheme>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={classes.action}>
                    <SendButton color="#E74C3C" onClick={onClose}>
                        <ClearIcon
                        fontSize="large" 
                        sx={{
                            color: '#fff',
                            m: 2,
                        }}
                        />
                    </SendButton>
                </div>
            </div>
        </div>
    )
}

Dialog.propTypes = {
    /**
     * Items property
     */
    items: PropTypes.array,
    /**
     * onClose event
     */
    onClose: PropTypes.func,
}
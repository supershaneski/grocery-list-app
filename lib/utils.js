/**
 * Generates a simple string id.
 * 
 * @returns string id
 */
export const getSimpleId = () => Math.random().toString(26).slice(2);

/**
 * Adds delay in execution of code.
 * 
 * @param delay - milliseconds 
 * @returns Promise
 */
export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

/**
 * Capitalize first letter
 * 
 * @param string 
 * @returns updated string
 */
export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)
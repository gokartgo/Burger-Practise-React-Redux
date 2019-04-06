import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log('Burger', props);
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => { // Array(5) == new Array(5) => Array.length 5 ... ให้ array ออกมาเป็น empty 5 อันเพื่อ map ตามจำนวนส่วนผสม return [{},{}]
                return <BurgerIngredient key={igKey + i} type={igKey} /> // ส่งก้อน object ออกไปตามสจำนวนส่วนผสม { }
            }) // example [[{}],[{}{}]]
        }).reduce((arr, el) => {
            console.log('arr', arr)
            console.log(el)
            return arr.concat(el) // concat => a=[1,2] b=[3,4] a.concat(b) => a=[1,2,3,4]
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
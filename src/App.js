import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

import pokeball from './icons/pokeball.svg';
// in a real environment I'd make an asset loader and import that instead
import bulbasaur from './assets/bulbasaur.bmp'
import charmander from './assets/charmander.bmp'
import chikorita from './assets/chikorita.bmp'
import cyndaquil from './assets/cyndaquil.bmp'
import mudkip from './assets/mudkip.bmp'
import squirtle from './assets/squirtle.bmp'
import torchic from './assets/torchic.bmp'
import totodile from './assets/totodile.bmp'
import treecko from './assets/treecko.bmp'

import './demoStyle.scss'
import './App.css'

import longList from './longList.json'

function MultiDemo() {
    const [selectedImages, setSelectedImages] = useState([pokeball]);
    const [displayedImages, setDisplayedImages] = useState([]);
    const [useMultiselect, setUseMultiselect] = useState(false);

    const availablePhotos = {
        bulbasaur,
        charmander,
        chikorita,
        cyndaquil,
        mudkip,
        squirtle,
        torchic,
        totodile,
        treecko
    }

    const defaultLabel = 'Select your favorite Pokemon!'
    
    const useMassiveList = false; // set to true to test with a 10k long list (is a little slow admittedly)
    const dropdownElements = [
        {
            id: '0001',
            value: 'bulbasaur',
        },
        {
            id: '0004',
            value: 'charmander',
        },
        {
            id: '0007',
            value: 'squirtle',
        },
        {
            id: '0152',
            value: 'chikorita',
        },
        {
            id: '0155',
            value: 'cyndaquil',
        },
        {
            id: '0158',
            value: 'totodile',
        },
        {
            id: '0252',
            value: 'treecko',
        },
        {
            id: '0255',
            value: 'torchic',
        },
        {
            id: '0258',
            value: 'mudkip',
        },
    ]
    const handleDropdownChange = (elements) => {
        setSelectedImages(Object.values(elements).map(e => e.value));
    }

    const toggleMultiSelect = () => {
        setUseMultiselect(!useMultiselect);
    }

    useEffect(() => {
        const newImages = selectedImages.map(imgName => {
            return <img className="pokemon" src={availablePhotos[imgName]} width="30%"/>
        })
        setDisplayedImages(newImages)
    }, [selectedImages])

    return (
        <div className="App">
          <div className="App-header">
            <div className="pokemonBox">
                {displayedImages}
            </div>
            <div className="multiselect-row">
              <Dropdown 
                  options={useMassiveList ? longList : dropdownElements}
                  defaultLabel={defaultLabel}
                  onChange={handleDropdownChange}
                  multiselect={useMultiselect}
                  allowSelectAll={!useMassiveList}
              />
              <div className="checkbox-unit">
                <input id="mul-chx" type="checkbox" onChange={toggleMultiSelect}/>
                <label htmlFor="mul-chx">Multiselect?</label>
              </div>
            </div>
          </div>
        </div>
    )
}

export default MultiDemo

import { useState } from 'react';

import { BunchOfStuff, OtherStuffAlsoComplicated } from './components/mocks';
import { VerySlowComponent } from './components/very-slow-component';
import './App.css';
import MovingSection from './components/Layout/movingSection';


export default function App() {

    const heavyComponent = <>
            <VerySlowComponent />
            <BunchOfStuff />
            <OtherStuffAlsoComplicated />
        </>

    return (    
        <MovingSection>
            {heavyComponent}
        </MovingSection>
    );
}

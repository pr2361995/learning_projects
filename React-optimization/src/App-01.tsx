import React,{useState} from 'react';
import './App.css';
import { ModalDialog } from './components/basic-modal-dialog';
import { Button } from './components/button';
import { VerySlowComponent } from './components/very-slow-component';
import { BunchOfStuff,OtherStuffAlsoComplicated } from './components/mocks';

const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
        {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
        <VerySlowComponent />
        <BunchOfStuff />
        <OtherStuffAlsoComplicated />
      </>
    );
};

export default App; 
import React, { useState } from 'react'

const MovingBlock = ({ position }: { position: number }) => (
    <div className="movable-block" style={{ top: position }}>
      {position.toFixed(0)}
    </div>
);

const getPosition = (val: number) => window.innerHeight - val / 2;

function MovingSection({children}:{children:React.ReactNode}) {
    const [position, setPosition] = useState<number>(window.innerHeight / 2);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const calculated = getPosition(e.currentTarget.scrollTop);
      setPosition(calculated);
    };
  
    return (
        <div className="scrollable-block" onScroll={onScroll}>
            <MovingBlock position={position} />
            <div className="content-wrapper">
                {children}
            </div>
        </div>
    );
}

export default MovingSection

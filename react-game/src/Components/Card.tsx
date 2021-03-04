import React from 'react';

export default function Card({ id, img, back, isFlipped, isVisible, onClick, onTransitionEnd }: {
    id: string, img: string, back: string, isFlipped: boolean, isVisible: boolean,
    onClick: () => void, onTransitionEnd: (event: React.TransitionEvent) => void
}) {
    return (
        <div className={'card' + (isVisible ? "" : " card-invis")} onClick={onClick}>
            <div className={'card-inner' + (isFlipped ? " card-flip" : "")} onTransitionEnd={onTransitionEnd}>
                <img className={'card-front'} src={`static/back/${back}`} alt="Shirt" />
                <img className={'card-back card-flip'} src={img} alt="Shirt" />
            </div>
        </div>
    )
}
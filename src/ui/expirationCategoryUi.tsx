import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ItemUi from './itemUi';
import ExpirationCategoryHeaderUi from './expirationCategoryHeaderUi';
import { ItemDTO } from 'src/item';

interface IExpirationCategoryUi {
    name: string;
    items: ItemDTO[];
}

export default function ExpirationCategoryUi({ name, items }: IExpirationCategoryUi) {
    const [contentDisplay, setContentDisplay] = useState(false);

    const changeDisplay = () => {
        setContentDisplay(prevDisplay => !prevDisplay);
    };
    
    return (
        <div className='expirationCategoryContainer'>
            <ExpirationCategoryHeaderUi name={name} itemCounter={items.length} changeDisplay={changeDisplay} />
            {contentDisplay && (
                <div className='expirationItemsFlexboxContainer'>
                    {items.map(item => {
                        const { name, expirationDate, numberOfElements, expirationCategory } = item;
                        return (
                            <ItemUi
                                key={uuidv4()}
                                name={name}
                                expirationDate={expirationDate}
                                numberOfElements={numberOfElements}
                                expirationCategory={expirationCategory}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ItemUi from './itemUi';
import CategoryHeaderUi from './categoryHeaderUi';
import Item from 'src/item';

export interface ICategoryUi {
    name: string;
    items: Item[];
}

export default function CategoryUi({ name, items }: ICategoryUi) {
    const [contentDisplay, setContentDisplay] = useState(false);

    const changeDisplay = () => {
        setContentDisplay(prevDisplay => !prevDisplay);
    };
    
    return (
        <div className='categoryContainer'>
            <CategoryHeaderUi name={name} itemCounter={items.length} changeDisplay={changeDisplay} />
            {contentDisplay && (
                <div className='itemsFlexboxContainer'>
                    {items.map(item => {
                        const { name, expirationDate, numberOfElements, expirationCategory } = item.toDTO();
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
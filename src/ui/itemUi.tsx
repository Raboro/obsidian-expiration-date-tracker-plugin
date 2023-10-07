import { ItemDTO } from 'src/item';

export default function ItemUi({ name, expirationDate, numberOfElements, expirationCategory }: ItemDTO) {
    return <>
            <div className='expirationItemContainer'>
                <p>{name}</p>
                <p>{numberOfElements}</p>
                <p>{expirationDate.getDaysTillExpired()}</p>
            </div>        
        </>;
}
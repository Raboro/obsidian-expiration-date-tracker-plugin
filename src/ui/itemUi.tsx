import { ItemDTO } from "src/item";

export default function ItemUi({ name, expirationDate, numberOfElements, expirationCategory }: ItemDTO) {
    return <>
            <div style={{border: "1px solid black", display: "flex", flexDirection: "column"}}>
                <h2>{name}</h2>
                <h2>{expirationDate.getDaysTillExpired()}</h2>
                <h2>{numberOfElements}</h2>
            </div>        
        </>;
}
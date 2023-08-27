export interface ExpirationCategoryHeader {
    name: string;
    itemCounter: number;
    changeDisplay: () => void;
}

export default function ExpirationCategoryHeaderUi({ name, itemCounter, changeDisplay }: ExpirationCategoryHeader) {
    return <>
            <div className="expirationCategoryHeaderContainer">
                <h4>{name}</h4>
                <h4>{itemCounter}</h4>
                <button onClick={changeDisplay}>Expand</button>
            </div>
        </>;
}
export interface CategoryHeader {
    name: string;
    itemCounter: number;
    changeDisplay: () => void;
}

export default function CategoryHeaderUi({ name, itemCounter, changeDisplay }: CategoryHeader) {
    return <>
            <div className="categoryHeaderContainer">
                <h4>{name}</h4>
                <h4>{itemCounter}</h4>
                <a onClick={changeDisplay} className="expandIcon">Click</a>
            </div>
        </>;
}
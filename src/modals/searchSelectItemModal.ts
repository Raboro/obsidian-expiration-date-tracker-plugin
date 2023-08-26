import { App, FuzzySuggestModal, Notice } from 'obsidian';
import { ItemDTO } from 'src/item';
import { ItemModal } from './itemModal';

export default class SearchSelectItemModal extends FuzzySuggestModal<ItemDTO> {
    private items: ItemDTO[];

    constructor(app: App, items: ItemDTO[]) {
        super(app);
        this.items = items;
    }

    getItems(): ItemDTO[] {
        return this.items;
    }

    getItemText(item: ItemDTO): string {
        return item.name;
    }
    
    onChooseItem(item: ItemDTO, evt: MouseEvent | KeyboardEvent): void {
        new ItemModal(this.app, item).open();
    }
    
}
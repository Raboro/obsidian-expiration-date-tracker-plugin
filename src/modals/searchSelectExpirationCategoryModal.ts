import { App, FuzzySuggestModal } from 'obsidian';
import ExpirationCategory from 'src/expirationCategory';
import { ItemDTO } from 'src/item';
import ExpirationCategoryModal from './expirationCategoryModal';

export default class SearchSelectExpirationCategoryModal extends FuzzySuggestModal<ExpirationCategory> {
    private expirationCategories: ExpirationCategory[];
    private items: ItemDTO[];

    constructor(app: App, expirationCategories: ExpirationCategory[], items: ItemDTO[]) {
        super(app);
        this.expirationCategories = expirationCategories;
        this.items = items;
    }

    getItems(): ExpirationCategory[] {
        return this.expirationCategories;
    }

    getItemText(item: ExpirationCategory): string {
        return item.getName();
    }

    onChooseItem(item: ExpirationCategory, evt: MouseEvent | KeyboardEvent): void {
        new ExpirationCategoryModal(this.app, item, this.items).open();
    }

}
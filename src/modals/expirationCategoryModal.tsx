import { App, Modal } from 'obsidian';
import * as React from 'react';
import { Root, createRoot } from 'react-dom/client';
import ExpirationCategory from 'src/expirationCategory';
import { ItemDTO } from 'src/item';
import ExpirationCategoryUi from 'src/ui/expirationCategoryUi';

export default class ExpirationCategoryModal extends Modal {
    private root: Root;
    private expirationCategory: ExpirationCategory;
    private items: ItemDTO[];

    constructor(app: App, expirationCategory: ExpirationCategory, items: ItemDTO[]) {
        super(app);
        this.expirationCategory = expirationCategory;
        this.items = items;
    }

    onOpen(): void {
        const { contentEl } = this;
        this.root = createRoot(contentEl);
        this.root.render(
            <React.StrictMode>
                <ExpirationCategoryUi 
                    name={this.expirationCategory.getName()}
                    items={this.items.filter(item => item.expirationCategory === this.expirationCategory)}       
                />
            </React.StrictMode>
        );
    }

    onClose(): void {
        this.root.unmount();
        const { contentEl } = this;
        contentEl.empty();
    }

}
import { App, Modal } from "obsidian";
import * as React from "react";
import { Root, createRoot } from "react-dom/client";
import ExpirationCategory from "src/expirationCategory";
import { ItemDTO } from "src/item";
import CategoryUi from "src/ui/categoryUi";

export default class CategoryModal extends Modal {
    private root: Root;
    private category: ExpirationCategory;
    private items: ItemDTO[];

    constructor(app: App, category: ExpirationCategory, items: ItemDTO[]) {
        super(app)
        this.category = category;
        this.items = items;
    }

    onOpen(): void {
        const { contentEl } = this;
        this.root = createRoot(contentEl);
        this.root.render(
            <React.StrictMode>
                <CategoryUi 
                    name={this.category.getName()}
                    items={this.items.filter(item => item.expirationCategory === this.category)}       
                />
            </React.StrictMode>
        )
    }

    onClose(): void {
        this.root.unmount();
        const { contentEl } = this;
        contentEl.empty();
    }

}
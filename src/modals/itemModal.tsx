import { App, Modal } from "obsidian";
import * as React from "react";
import { Root, createRoot } from "react-dom/client";
import { ItemDTO } from "src/item";
import ItemUi from "src/ui/itemUi";

export class ItemModal extends Modal {
    private root: Root;
    private item: ItemDTO;

    constructor(app: App, item: ItemDTO) {
        super(app)
        this.item = item;
    }    

    onOpen(): void {
        let { contentEl } = this;
        this.root = createRoot(contentEl);
        this.root.render(
            <React.StrictMode>
                <ItemUi 
                    name={this.item.name} 
                    expirationDate={this.item.expirationDate} 
                    numberOfElements={this.item.numberOfElements} 
                    expirationCategory={this.item.expirationCategory} 
                />
            </React.StrictMode>
        ); 
    }

    onClose(): void {
        this.root.unmount();
        let { contentEl } = this;
        contentEl.empty();
    }
}
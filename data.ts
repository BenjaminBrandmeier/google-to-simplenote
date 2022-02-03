export interface GoogleNotesFormat {
    textContent?: string;
    listContent?: ListItem[];
    title: string;
}

export interface ListItem {
    text: string,
    isChecked: boolean
}
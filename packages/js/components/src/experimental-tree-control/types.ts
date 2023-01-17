export interface Item {
	parent?: string;
	value: string;
	label: string;
}

export interface LinkedTree {
	parent?: LinkedTree;
	data: Item;
	children: LinkedTree[];
}

export type CheckedStatus = 'checked' | 'unchecked' | 'indeterminate';

type BaseTreeProps = {
	/**
	 * It contians one item if `multiple` value is false or
	 * a list of items if it is true.
	 */
	selected?: Item | Item[];
	/**
	 * Whether the tree items are single or multiple selected.
	 */
	multiple?: boolean;
	/**
	 * When `multipe` is true and a child item is selected, all its
	 * ancestors and its descendants are also selected. If it's false
	 * only the clicked item is selected.
	 *
	 * @param value The selection
	 */
	onSelect?( value: Item | Item[] ): void;
	/**
	 * When `multipe` is true and a child item is unselected, all its
	 * ancestors (if no sibblings are selected) and its descendants
	 * are also unselected. If it's false only the clicked item is
	 * unselected.
	 *
	 * @param value The unselection
	 */
	onRemove?( value: Item | Item[] ): void;
};

export type TreeProps = BaseTreeProps &
	Omit<
		React.DetailedHTMLProps<
			React.OlHTMLAttributes< HTMLOListElement >,
			HTMLOListElement
		>,
		'onSelect'
	> & {
		level?: number;
		items: LinkedTree[];
		/** It gives a way to render a different Element as the
		 * tree item label.
		 *
		 * @example
		 * <Tree
		 * 	getItemLabel={ ( item ) => <span>${ item.data.label }</span> }
		 * />
		 *
		 * @param item The current rendering tree item
		 *
		 * @see {@link LinkedTree}
		 */
		getItemLabel?( item: LinkedTree ): JSX.Element;
		/**
		 * It gives the possibility to control the tree item
		 * expand/collapse on render from outside the tree.
		 * Make sure to cache the function to improve performance.
		 *
		 * @example
		 * <Tree
		 * 	isItemExpanded={ useCallback(
		 * 		( item ) => checkExpanded( item, text ),
		 * 		[ text ]
		 * 	) }
		 * />
		 *
		 * @param item The current linked tree item, useful to
		 * traverse the entire linked tree from this item.
		 *
		 * @see {@link LinkedTree}
		 */
		isItemExpanded?( item: LinkedTree ): boolean;
		/**
		 * It gives a way to determine whether the current rendering
		 * item is highlighted or not from outside the tree.
		 *
		 * @example
		 * <Tree
		 * 	isItemHighlighted={ isFirstChild }
		 * />
		 *
		 * @param item The current linked tree item, useful to
		 * traverse the entire linked tree from this item.
		 *
		 * @see {@link LinkedTree}
		 */
		isItemHighlighted?( item: LinkedTree ): boolean;
	};

export type TreeItemProps = BaseTreeProps &
	Omit<
		React.DetailedHTMLProps<
			React.LiHTMLAttributes< HTMLLIElement >,
			HTMLLIElement
		>,
		'onSelect'
	> & {
		level: number;
		item: LinkedTree;
		index: number;
		getLabel?( item: LinkedTree ): JSX.Element;
		isExpanded?( item: LinkedTree ): boolean;
		isHighlighted?( item: LinkedTree ): boolean;
	};

export type TreeControlProps = Omit< TreeProps, 'items' | 'level' > & {
	items: Item[];
};

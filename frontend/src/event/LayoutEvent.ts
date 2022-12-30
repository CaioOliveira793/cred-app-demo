export type ChangeClientRectRequestEventName = 'changeClientRectRequest';

export class ChangeClientRectRequestEvent {
	public static readonly EVENT_NAME: ChangeClientRectRequestEventName = 'changeClientRectRequest';

	/** Native event */
	public readonly nativeEvent: Event | null;

	/** Element changing content Rect */
	public readonly element: Element;

	/** Current `DOMRect` */
	public readonly current: DOMRect;

	/** Expected new `DOMRect` */
	public readonly expected: DOMRect;

	public constructor(
		current: DOMRect,
		expected: DOMRect,
		element: Element,
		nativeEvent?: Event | null
	) {
		this.nativeEvent = nativeEvent ?? null;
		this.element = element;
		this.current = current;
		this.expected = expected;
	}
}

export type ChangeClientRectRequestEventEmitter = (
	name: ChangeClientRectRequestEventName,
	event: ChangeClientRectRequestEvent
) => void;

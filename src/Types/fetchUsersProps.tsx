export interface fetchUsersProps{

	limitIsReached: boolean;

	inputValue: string;

	pageNumber: number | undefined;

	fetchUsersCallBack: ( responseHeaders, resultItems ) => void;

}
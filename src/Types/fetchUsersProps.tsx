import type { UserDataType } from "./userDataType";

export interface fetchUsersProps{

	limitIsReached: boolean;

	inputValue: string;

	pageNumber: number | undefined;

	fetchUsersCallBack: ( responseHeaders: Headers, resultItems: UserDataType[] ) => void;

}
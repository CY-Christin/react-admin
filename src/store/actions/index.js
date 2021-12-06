import {getUserInfo, setUserInfo, setUserToken} from "./user";
import {login} from "./auth";
import {changeSetting} from './settings'
import {toggleSettingPanel, toggleSiderBar} from "./app";
import { addTag, emptyTaglist, deleteTag, closeOtherTags } from "./tagsView";

export {
	getUserInfo,
	setUserInfo,
	setUserToken,
	login,
	changeSetting,
	toggleSiderBar,
	toggleSettingPanel,
	addTag,
	emptyTaglist,
	deleteTag,
	closeOtherTags
}

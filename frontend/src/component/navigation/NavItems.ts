import type { Component } from 'vue';
import HouseIcon from '~icons/fa6-solid/house';
import UserTagIcon from '~icons/fa6-solid/user-tag';
import ClipboardListIcon from '~icons/fa6-solid/clipboard-list';
import CommentsIcon from '~icons/fa6-solid/comments';
import GearIcon from '~icons/fa6-solid/gear';

export interface NavItem {
	path: string;
	name: string;
	icon: Component;
}

export const UpNavigationItems: readonly NavItem[] = [
	{
		name: 'Home',
		path: '/home',
		icon: HouseIcon,
	},
	{
		name: 'Clientes',
		path: '/customer',
		icon: UserTagIcon,
	},
	{
		name: 'Campanhas',
		path: '/campaign',
		icon: ClipboardListIcon,
	},
	{
		name: 'Atendimentos',
		path: '/customer_service',
		icon: CommentsIcon,
	},
];

export const DownNavigationItems: readonly NavItem[] = [
	{
		name: 'Configurações',
		path: '/config',
		icon: GearIcon,
	},
];

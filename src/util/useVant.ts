import { App } from 'vue'
import { 
	Icon, 
	Swipe, 
	SwipeItem, 
	Grid, 
	GridItem, 
	Image as VanImage,
	Tabbar, 
	TabbarItem,
	NavBar,
	Tag,
	Tabs,
	Tab,
	ActionBar,
	ActionBarIcon,
	ActionBarButton,
	ShareSheet,
	Button,
	Popup,
	Row,
	Col,
	Stepper,
	Search,
	Sidebar,
	SidebarItem,
	Card,
	SubmitBar,
	PullRefresh,
	Checkbox, 
	CheckboxGroup,
	SwipeCell,
	AddressList,
	Skeleton,
	AddressEdit,
	Area,
	NoticeBar,
	List,
	Cell,
	CellGroup,
	DropdownMenu,
	DropdownItem
	// Toast
} from 'vant'

export function useVant(app: App<Element>) {
	app.use(Icon)
	app.use(Swipe)
	app.use(SwipeItem)
	app.use(Grid)
	app.use(GridItem)
	app.use(VanImage)
	app.use(Tabbar)
	app.use(TabbarItem)
	app.use(NavBar)
	app.use(Tag)
	app.use(Tabs)
	app.use(Tab)
	app.use(ActionBar)
	app.use(ActionBarIcon)
	app.use(ActionBarButton)
	app.use(ShareSheet)
	app.use(Button)
	app.use(Popup)
	app.use(Row)
	app.use(Col),
	app.use(Stepper)
	app.use(Search)
	app.use(Sidebar)
	app.use(SidebarItem)
	app.use(Card)
	app.use(SubmitBar)
	app.use(PullRefresh)
	app.use(Checkbox)
	app.use(CheckboxGroup)
	app.use(SwipeCell)
	app.use(AddressList)
	app.use(Skeleton)
	app.use(AddressEdit)
	app.use(Area)
	app.use(NoticeBar)
	app.use(List)
	app.use(Cell)
	app.use(CellGroup)
	app.use(DropdownMenu)
	app.use(DropdownItem)
	return app
}

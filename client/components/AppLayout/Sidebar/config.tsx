import { Routes } from '../routes'
import type { MenuItem } from '../../../types/menu'
import { 
    PlayCircleOutlined,
    PlusCircleOutlined,
    LikeOutlined,
    FieldTimeOutlined
} from '@ant-design/icons'

export const menuData: MenuItem[] = [
    {
        label: 'Library',
        key: Routes.index,
        icon: <PlayCircleOutlined />,
    },
    {
        label: 'Add Track',
        key: Routes.addTrack,
        icon: <PlusCircleOutlined />
    },
    {
        label: 'Liked',
        key: Routes.liked,
        icon: <LikeOutlined />,
        disabled: true
    },
    {
        label: 'Recent',
        key: Routes.recent,
        icon: <FieldTimeOutlined />,
        disabled: true
    },
]
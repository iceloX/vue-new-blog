export const navbarConfig = [
  {text: '首页',icon:'Home',link: '/'},
  {text: '时间线', link: '/timeline/', icon: 'Time' },
  {text: '博客', link: '/posts/', icon: 'Document' },
  {text: '友情链接', link: '/friendship-link/', icon: 'Friendship' },
  {
    text: '工具网站',
    icon: 'Tools',
    children: [{
            text: '系统镜像',
            children: [{
                    text: 'Windows',
                    link: 'https://msdn.itellyou.cn/'
                },
                {
                    text: 'Centos',
                    link: 'https://www.centos.org/'
                },
                {
                    text: 'Ubuntu',
                    link: 'https://ubuntu.com/download'
                },
            ]
        },
        {
            text: '云服务',
            children: [{
                    text: '阿里云',
                    link: 'https://www.aliyun.com//'
                },
                {
                    text: '腾讯云',
                    link: 'https://cloud.tencent.com/'
                },
                {
                    text: '华为云',
                    link: 'https://www.huaweicloud.com/'
                },
                {
                    text: '七牛云',
                    link: 'https://www.qiniu.com/'
                },
            ]
        },
        {
            text: '在线工具',
            children: [{
                    text: '在线抠图',
                    link: 'https://www.gaoding.com/koutu/'
                },
                {
                    text: 'GIF制作',
                    link: 'https://www.screentogif.com/'
                },
                {
                    text: '图片放大',
                    link: 'http://bigjpg.com/'
                },
                {
                    text: '图片压缩',
                    link: 'https://tinypng.com/'
                },
                {
                    text: '修改图片',
                    link: 'https://www.canva.cn/'
                },

            ]
        },
    ]
},
    { text: '留言板', link: '/docs/message-board', icon: 'Chat' },
  ]
  
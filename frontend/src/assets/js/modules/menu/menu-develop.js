const isLocal = location.href.indexOf('localhost') > -1 || location.href.indexOf('127.0.0.1') > -1;

export const setDeveloperMenus = (items) => {
    if(isLocal){
        for(let i = 0; i < items.length; i++){
            if(items[i].menuNm === 'CMS'){
                for(let j = 0; j < items[i].children.length; j++){
                    if(items[i].children[j].menuNm === '콘텐츠 관리'){
                        items[i].children[j].children.push(
                            {
                                label: "콘텐츠 그룹 관리",
                                menuLvl: 3,
                                menuNm: "콘텐츠 그룹 관리",
                                menuSn: 0,
                                menuUrl: '/cms-grp/asset/0',
                            }
                        )
                        break;
                    }
                }
                break;
            }
        }


        items.push({
            label: "Demo",
            menuLvl: 1,
            menuNm: "Demo",
            menuSn: 0,
            menuUrl: null,
            children: [
                {
                    label: "Demo",
                    menuLvl: 2,
                    menuNm: "Demo",
                    menuSn: 0,
                    menuUrl: '/demo',
                    children: [
                        {
                            label: "Video",
                            menuLvl: 3,
                            menuNm: "Video",
                            menuSn: 0,
                            menuUrl: '/demo/video',
                        },
                        {
                            label: "PDF",
                            menuLvl: 3,
                            menuNm: "PDF",
                            menuSn: 0,
                            menuUrl: '/demo/pdf',
                        },
                        {
                            label: "HTMLViewer",
                            menuLvl: 3,
                            menuNm: "HTMLViewer",
                            menuSn: 0,
                            menuUrl: '/demo/html',
                        },
                        {
                            label: "Notis",
                            menuLvl: 3,
                            menuNm: "Notis",
                            menuSn: 0,
                            menuUrl: '/demo/notis',
                        },
                        {
                            label: "ApiDemo",
                            menuLvl: 3,
                            menuNm: "ApiDemo",
                            menuSn: 0,
                            menuUrl: '/demo/api',
                        }
                    ],
                }
            ]
        });
    }
}
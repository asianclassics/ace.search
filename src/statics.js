export const statics = {
    menuItems: ['catalogs', 'texts'],
    fullTextItem: 'FullText',
    collections: {
        texts: [
            { key: 'SB', name: 'Sungbum', color: 'col-gold' },
            { key: 'KG', name: 'Kangyur', color: 'col-blue' },
            { key: 'TG', name: 'Tengyur', color: 'col-red' },
        ],
        catalogs: [
            { key: 'mongolia', name: 'Mongolia', color: 'col-gold' },
            { key: 'ladakh', name: 'Ladakh', color: 'col-blue' },
            { key: 'stpetersburg', name: 'St. Petersburg', color: 'col-red' },
        ],
    },
    limiters: {
        texts: {
            author: {
                key: 'texts_author',
                type: 'author',
                on: false,
            },
            title: {
                key: 'texts_title',
                type: 'title',
                on: false,
            },
        },
        catalogs: {
            author: {
                name: 'Author',
                key: 'catalogs_author',
                type: 'author',
                on: false,
            },
            title: {
                name: 'Title',
                key: 'catalogs_title',
                type: 'title',
                on: false,
            },
        },
    },
    hlt_catalogs_keys: ['primary-author-tibetan', 'title-tibetan'],
    hlt_texts_keys: ['authortib', 'titletib'],
    meta_keys: [
        'pagenumbers',
        'sizepages',
        'pagesize',
        'pageprintedareasize',
        'folios',
        'foliosno',
        'sizeprtarea',
        'volume',
        'volumendx',
        'catalognumber',
        'newcatno',
        'collection',
    ],
    author_keys: [
        'authoreng',
        'authorskt',
        'priautheng',
        'priauthtib',
        'authortibprimary',
        'authorengprimary',
        'authortib',
        'authordates',
    ],
    title_keys: [
        'title-tibetan',
        'title-english',
        'title-sanskrit',
        'titletib',
        'titleskt',
        'titletibbrf',
        'titleeng',
    ],
    searchOptions: {
        searchOffset: 0,
        resultSetSize: 10,
    },
    searchTerms: [
        `STONG TSUL THA`,
        `MDZES PA DBYIG GNYEN`,
        `GUHYASAMAJA`,
        `DPAL 'KHOR LO BDE MCHOG`,
        `RGYAS PAR MDZAD PA`,
        `SHIS MKHAS GRUB KYIS BSKUL BA LTAR`,
        `MI JOGS`,
        `NOTES ON THE ART OF INTERPRETATION`,
        `SHANTIDEVA`,
        `PA'ANG T'A RA N'A`,
        `NAGARJUNA`,
        `BLO BZANG GRAGS PA`,
        `RJE TZONG KHA PA`,
    ],
}

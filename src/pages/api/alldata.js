

export const stageData = [
    {
        name: 'Germination', value: 10
    },
    {
        name: 'Leaf Development', value: 20
    },
    {
        name: 'Tillering', value: 30
    },
    {
        name: 'Max Tillering', value: 30
    },
    {
        name: 'Flowering', value: 15
    },
    {
        name: 'Milk', value: 15
    },
]



export const ideal_stages = [
    {
        "name": "Seedling",
        "ideal_days": 20,
        "analysis_more": "The field took more time than the ideal time range for Germination & Seedling stage. Possible reasons could be cold soil temperatures, poor soil conditions or insufficient water supply.",
        "analysis_less": "The field took less time than the ideal time range for Germination & Seedling stage. Possible reasons could be warm soil temperatures, good soil conditions, and adequate water supply.",
        "analysis_equal": "The field took ideal time for Germination & Seedling stage. Congratulations, you have successfully completed the first stage of rice growth."
    },
    {
        "name": "Tillering",
        "ideal_days": 40,
        "analysis_more": "The field took more time than the ideal time range for Tillering stage. Possible reasons could be poor soil conditions, lack of nutrients or water, or pests and diseases.",
        "analysis_less": "The field took less time than the ideal time range for Tillering stage. Possible reasons could be ideal soil conditions, good water and nutrient supply, and effective pest and disease control.",
        "analysis_equal": "The field took ideal time for Tillering stage. Great job, you are making good progress in rice growth!"
    },
    {
        "name": "Flowering",
        "ideal_days": 30,
        "analysis_more": "The field took more time than the ideal time range for Flowering stage. Possible reasons could be water stress, high temperatures, low light conditions, or pests and diseases.",
        "analysis_less": "The field took less time than the ideal time range for Flowering stage. Possible reasons could be ideal weather and light conditions, good water and nutrient supply, and effective pest and disease control.",
        "analysis_equal": "The field took ideal time for Flowering stage. Excellent job, you are on track to a successful harvest!"
    },
    {
        "name": "Ripening",
        "ideal_days": 30,
        "analysis_more": "The field took more time than the ideal time range for Grain Filling & Ripening stage. Possible reasons could be water stress, nutrient deficiencies, pests and diseases, or adverse weather conditions.",
        "analysis_less": "The field took less time than the ideal time range for Grain Filling & Ripening stage. Possible reasons could be ideal weather and light conditions, good water and nutrient supply, and effective pest and disease control.",
        "analysis_equal": "The field took ideal time for Grain Filling & Ripening stage. Congratulations on a successful rice crop!"
    }
]


export const mosaic_images_used = {
    "Kainat": {
        "2022-09-10": 377,
        "2022-08-27": 376,
        "2022-06-25": 470,
        "2022-07-06": 470
    },
    "Super Kernel": {
        "2022-07-06": 403,
        "2022-07-19": 359,
        "2022-08-27": 276
    },
    "Hybrid": {
        "2022-07-06": 439,
        "2022-06-11": 462,
        "2022-08-27": 486
    }
}

export const all_stages = ['Germination', 'Seedling', 'Germination', 'Tillering', 'Max Tillering', 'Flowering', 'Milk', 'Ripening', 'Milk'];

export const mosaic_data = {

    'Kainat': {
        "2022-06-25": {
            "NDVI": 0.1,
            "SAVI": 0.3,
            "MSAVI": 0.4,
            "temp": 40,
            "prec": 32,
            "stage": "Seedling",
            "timeTaken": 26,
            "mosaic": {
                "ndvi_src": "mosaics/ndvi/220625.png",
                "ndvi_legend": "mosaics/ndvi/220625legend.png",
                "savi_src": "mosaics/savi/220625.png",
                "savi_legend": "mosaics/savi/220625legend.png",
                "msavi_src": "mosaics/msavi/220625.png",
                "msavi_legend": "mosaics/msavi/220625legend.png",
                "overlayBounds": [
                    [
                        32.33925700144764,
                        72.5339985983349
                    ],
                    [
                        32.340393338283484,
                        72.53513116378589
                    ]
                ]
            },
            "healthy": [
                [
                    32.33945121236494,
                    72.53462970256807
                ],
                [
                    32.33996790027322,
                    72.53457605838777
                ]
            ],
            'unhealthy': [
                [
                    32.339471607996174,
                    72.53423541784288
                ],
                [
                    32.339575852261916,
                    72.53431320190431
                ]
            ]
        },
        "2022-07-06": {
            "NDVI": 0.3,
            "SAVI": 0.4,
            "MSAVI": 0.5,
            "temp": 35,
            "prec": 40,
            "stage": "Tillering",
            "timeTaken": 34,
            "mosaic": {
                "ndvi_src": "mosaics/ndvi/220706.png",
                "ndvi_legend": "mosaics/ndvi/220706legend.png",
                "savi_src": "mosaics/savi/220706.png",
                "savi_legend": "mosaics/savi/220706legend.png",
                "msavi_src": "mosaics/msavi/220706.png",
                "msavi_legend": "mosaics/msavi/220706legend.png",
                "overlayBounds": [
                    // [
                    //     32.34011086322847,
                    //     72.53823414753222
                    // ],
                    // [
                    //     32.341158498800944,
                    //     72.53919684062315
                    // ]
                    [
                        32.33925700144764,
                        72.5339985983349
                    ],
                    [
                        32.340393338283484,
                        72.53513116378589
                    ]
                ]
            },
            'healthy': [
                [
                    32.33987272114337,
                    72.5347262620926
                ],
                [
                    32.33996110176729,
                    72.53460824489595
                ]
            ],
            'unhealthy': [
                [
                    32.33929711189132,
                    72.5346350669861
                ],
                [
                    32.339476140358066,
                    72.53422737121583
                ]
            ]
        },
        "2022-08-27": {
            "NDVI": 0.6,
            "SAVI": 0.6,
            "MSAVI": 0.7,
            "temp": 43,
            "prec": 39,
            "stage": "Flowering",
            "timeTaken": 26,
            "mosaic": {
                "ndvi_src": "mosaics/ndvi/220827.png",
                "ndvi_legend": "mosaics/ndvi/220827legend.png",
                "savi_src": "mosaics/savi/220827.png",
                "savi_legend": "mosaics/savi/220827legend.png",
                "msavi_src": "mosaics/msavi/220827.png",
                "msavi_legend": "mosaics/msavi/220827legend.png",
                "overlayBounds": [
                    [
                        32.339026750942125,
                        72.53446255340462
                    ],
                    [
                        32.34037087740836,
                        72.53530713261662
                    ]
                ]
            },
            'healthy': [
                [
                    32.33972768608632,
                    72.5346887111664
                ],
                [
                    32.339643837587914,
                    72.53490865230562
                ]
            ],
            'unhealthy': [
                [
                    32.3391928673045,
                    72.53480941057207
                ],
                [
                    32.33920193205594,
                    72.53459215164186
                ]
            ]
        },
        "2022-09-10": {
            "NDVI": 0.8,
            "SAVI": 0.7,
            "MSAVI": 0.8,
            "temp": 27,
            "prec": 29,
            "stage": "Ripening",
            "timeTaken": 35,
            "mosaic": {
                "ndvi_src": "mosaics/ndvi/220910.png",
                "ndvi_legend": "mosaics/ndvi/220910legend.png",
                "savi_src": "mosaics/savi/220910.png",
                "savi_legend": "mosaics/savi/220910legend.png",
                "msavi_src": "mosaics/msavi/220910.png",
                "msavi_legend": "mosaics/msavi/220910legend.png",
                "overlayBounds": [
                    [
                        32.339026750942125,
                        72.53446255340462
                    ],
                    [
                        32.34037087740836,
                        72.53530713261662
                    ]
                ]
            },
            'healthy': [
                [
                    32.33939455780954,
                    72.53480404615404
                ],
                [
                    32.33974581548115,
                    72.5346001982689
                ],
                [
                    32.33908862259758,
                    72.53483623266222
                ]
            ],
            'unhealthy': [
                [
                    32.339739016958525,
                    72.5349408388138
                ],
                [
                    32.33917247161042,
                    72.5348684191704
                ]
            ]
        }
    },
    'Hybrid': {
        "2022-06-11": {
            "NDVI": 0.1,
            "SAVI": 0.4,
            "MSAVI": 0.3,
            "temp": 35,
            "prec": 32,
            "stage": "Seedling",
            "timeTaken": 35,
            "mosaic": {
                "ndvi_src": "mosaics/ndvi/220611H.png",
                "ndvi_legend": "mosaics/ndvi/220611Hlegend.png",
                "savi_src": "mosaics/savi/220611H.png",
                "savi_legend": "mosaics/savi/220611Hlegend.png",
                "msavi_src": "mosaics/msavi/220611H.png",
                "msavi_legend": "mosaics/msavi/220611Hlegend.png",
                "overlayBounds": [
                    [
                        32.3402579693849,
                        72.53620684146883
                    ],
                    [
                        32.33924725579957,
                        72.53470480442049
                    ]
                ]
            },
            'healthy': [
                [
                    32.340158258232634,
                    72.535032033920343
                ],
            ],
            'unhealthy': [
                [
                    32.340108402615314,
                    72.53594398498537
                ],
                [
                    32.33990444753112,
                    72.53565967082979
                ],
                [
                    32.33991804455103,
                    72.5352305173874
                ],
                [
                    32.33970049198724,
                    72.5356435775757
                ],
                [
                    32.33955545665416,
                    72.53535926342012
                ]
            ]
        },
        "2022-07-06": {
            "NDVI": 0.5,
            "SAVI": 0.4,
            "MSAVI": 0.5,
            "temp": 35,
            "prec": 40,
            "stage": "Tillering",
            "timeTaken": 35,
            "mosaic": {
                "ndvi_src": "mosaics/ndvi/220706H.png",
                "ndvi_legend": "mosaics/ndvi/220706Hlegend.png",
                "savi_src": "mosaics/savi/220706H.png",
                "savi_legend": "mosaics/savi/220706Hlegend.png",
                "msavi_src": "mosaics/msavi/220706H.png",
                "msavi_legend": "mosaics/msavi/220706Hlegend.png",
                "overlayBounds": [
                    [
                        32.340226412174594,
                        72.53589972050416
                    ],
                    [
                        32.3392203954754,
                        72.53474681651504
                    ]
                ]
            },
            'healthy': [
                [32.34005421582581, 72.53584742526186],
                [32.339678089402106, 72.53578305224983],
                [32.33970074766465,72.53506476526908]
            ],
            'unhealthy': [
                // [32.340124319908334, 72.53488941374354],
                // [32.33935167357029, 72.53488941374354],
                // [32.340210420851264, 72.535648246935],
                // [32.34014697805915, 72.53529966631703]
                [32.339265708032535,72.53561204466301],
                [32.34006781072752,72.53520963334395]
            ]
        },

        "2022-08-27": {
            "NDVI": 0.7,
            "SAVI": 0.5,
            "MSAVI": 0.6,
            "temp": 35,
            "prec": 40,
            "stage": "Flowering",
            "timeTaken": 34,
            "mosaic": {
                //false hybrid
                "ndvi_src": "mosaics/ndvi/220706.png",
                "ndvi_legend": "mosaics/ndvi/220706legend.png",
                "savi_src": "mosaics/savi/220706.png",
                "savi_legend": "mosaics/savi/220706legend.png",
                "msavi_src": "mosaics/msavi/220706.png",
                "msavi_legend": "mosaics/msavi/220706legend.png",
                "overlayBounds": [
                    // [
                    //     32.34011086322847,
                    //     72.53823414753222
                    // ],
                    // [
                    //     32.341158498800944,
                    //     72.53919684062315
                    // ][
                    [
                        32.34025343706219,
                        72.53622829914094
                    ],
                    [
                        32.33925178817266,
                        72.53515541553499
                    ]
                ]
            },
            'healthy': [
                [32.33983215639413, 72.53571991831618
                ],
                [32.33979590322397, 72.53587017879492
                ]
            ],
            'unhealthy': [
                [32.339424307392555, 72.53538183223897
                ], [
                    32.33927929327266, 72.53578455695339
                ]
            ]
        },
    },

    'Super Kernel': {
        "2022-07-06": {
            "temp": 35,
            "prec": 40,
            "stage": "Seedling",
            "NDVI": 0.1,
            "SAVI": 0.2,
            "MSAVI": 0.1,
            "timeTaken": 15,
            "mosaic": {
                "ndvi_src": "mosaics/ndvi/220706SK.png",
                "ndvi_legend": "mosaics/ndvi/220706SKlegend.png",
                "savi_src": "mosaics/savi/220706SK.png",
                "savi_legend": "mosaics/savi/220706SKlegend.png",
                "msavi_src": "mosaics/msavi/220706SK.png",
                "msavi_legend": "mosaics/msavi/220706SKlegend.png",
                "overlayBounds": [
                    // [32.339026750942125, 72.53446255340462],
                    // [32.34037087740836, 72.53530713261662]
                    [
                        32.34120536305653,72.5391634567959
                    ],
                    [
                        32.34015408147637,72.53822441815088
                    ]
                ]
            },
            'healthy': [
                [
                    32.34082904023126,
                    72.53850013017656
                ],
                [
                    32.340214912309904,
                    72.53845721483232
                ]
            ],
            'unhealthy': [
                [
                    32.340931016788865,
                    72.53868520259859
                ]
            ],
        },
        "2022-07-19": {
            "temp": 40,
            "prec": 32,
            "stage": "Tillering",
            "NDVI": 0.3,
            "SAVI": 0.6,
            "MSAVI": 0.4,
            "timeTaken": 45,
            "mosaic": {
                "ndvi_src": "mosaics/ndvi/220719SK.png",
                "ndvi_legend": "mosaics/ndvi/220719SKlegend.png",
                "savi_src": "mosaics/savi/220719SK.png",
                "savi_legend": "mosaics/savi/220719SKlegend.png",
                "msavi_src": "mosaics/msavi/220719SK.png",
                "msavi_legend": "mosaics/msavi/220719SKlegend.png",
                "overlayBounds": [
                    [
                        32.341300522622156,72.53916879669079
                    ],
                    [
                        32.34005887599672,72.53826736654807
                    ]
                ]
            },
            'healthy': [
                [
                    32.34060469139999,
                    72.53883808851243
                ],
                [
                    32.34107151763556,
                    72.53893196582796
                ],
                [
                    32.34024890473922,
                    72.53887832164766
                ]
            ],
            'unhealthy': [
                [
                    32.34083583867201,
                    72.53836601972581
                ]
            ],
        },
        "2022-08-27": {
            "temp": 43,
            "prec": 39,
            "stage": "Flowering",
            "NDVI": 0.7,
            "SAVI": 0.5,
            "MSAVI": 0.5,
            "timeTaken": 30,
            "mosaic": {
                "ndvi_src": "mosaics/ndvi/220827SK.png",
                "ndvi_legend": "mosaics/ndvi/220827SKlegend.png",
                "savi_src": "mosaics/savi/220827SK.png",
                "savi_legend": "mosaics/savi/220827SKlegend.png",
                "msavi_src": "mosaics/msavi/220827SK.png",
                "msavi_legend": "mosaics/msavi/220827SKlegend.png",
                "overlayBounds": [
                    [
                        32.340104538030566,
                        72.53827162640408
                    ],
                    [
                        32.341533679610755,
                        72.5394241987202
                    ],
                ]
            },
            'healthy': [
                [
                    32.3409604766619,
                    72.53884345293046
                ],
                [
                    32.34036901122062,
                    72.5386691093445
                ]
            ],
            'unhealthy': [
                [
                    32.34101486409458,
                    72.53911435604097
                ],
                [
                    32.340273832512615,
                    72.53901779651643
                ]
            ],
        }
    }
}
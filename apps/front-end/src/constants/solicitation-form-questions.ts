import { ProblemTopicType } from "../types/solicitation"

export const glassQuestions = [
  {
    questionId: 'glass-A',
    question: 'Qual problema sobre o vidro do celular se encaixa com o seu?',
    options: [
      {
        optionId: 'glass-A-1',
        text: 'O vidro está trincado'
      },
      {
        optionId: 'glass-A-2',
        text: 'O vidro está arranhado'
      },
      {
        optionId: 'glass-A-3',
        text: 'O vidro está se soltando'
      },
    ]
  },
  {
    questionId: 'glass-B',
    question: 'Quando o problema começou?',
    options: [
      {
        optionId: 'glass-B-1',
        text: 'Hoje'
      },
      {
        optionId: 'glass-B-2',
        text: 'Menos de uma semana'
      },
      {
        optionId: 'glass-A-3',
        text: 'Mais de uma semana'
      },
    ]
  },
  {
    questionId: 'glass-C',
    question: 'O celular está ligando?',
    options: [
      {
        optionId: 'glass-C-1',
        text: 'Sim'
      },
      {
        optionId: 'glass-C-2',
        text: 'Não'
      },
    ]
  },
  {
    questionId: 'glass-D',
    question: 'O problema no vidro afeta outras funções?',
    options: [
      {
        optionId: 'glass-D-1',
        text: 'Sim'
      },
      {
        optionId: 'glass-D-2',
        text: 'Não'
      },
    ]
  },
  {
    questionId: 'glass-E',
    question: 'O vidro já foi trocado anteriormente?',
    options: [
      {
        optionId: 'glass-E-1',
        text: 'Sim'
      },
      {
        optionId: 'glass-E-2',
        text: 'Não'
      },
      {
        optionId: 'glass-E-3',
        text: 'Não sei'
      },
    ]
  },
  {
    questionId: 'glass-F',
    question: 'Se houve troca, a nova tela é original?',
    options: [
      {
        optionId: 'glass-F-1',
        text: 'Sim'
      },
      {
        optionId: 'glass-F-2',
        text: 'Não'
      },
      {
        optionId: 'glass-F-3',
        text: 'Não sei'
      },
    ]
  }
]
export const batteryQuestions = [
  {
    questionId: 'battery-A',
    question: 'Qual problema sobre baterias se encaixa com o seu?',
    options: [
      {
        optionId: 'battery-A-1',
        text: 'A bateria descarrega muito rápido'
      },
      {
        optionId: 'battery-A-2',
        text: 'A bateria demora muito para ser recarregada'
      },
      {
        optionId: 'battery-A-3',
        text: 'O celular desliga mesmo com carga'
      },
      {
        optionId: 'battery-A-4',
        text: 'O celular esquenta muito durante o uso ou carregamento'
      }
    ]
  },
  {
    questionId: 'battery-B',
    question: 'O celular já teve a bateria trocada anteriormente?',
    options: [
      {
        optionId: 'battery-B-1',
        text: 'Sim'
      },
      {
        optionId: 'battery-B-2',
        text: 'Não'
      },
      {
        optionId: 'battery-B-3',
        text: 'Não sei'
      }
    ]
  },
  {
    questionId: 'battery-C',
    question: 'Você utiliza carregadores originais?',
    options: [
      {
        optionId: 'battery-C-1',
        text: 'Sim'
      },
      {
        optionId: 'battery-C-2',
        text: 'Não'
      },
      {
        optionId: 'battery-C-3',
        text: 'Não sei'
      }
    ]
  },
  {
    questionId: 'battery-D',
    question: 'Com qual frequência você carrega o celular?',
    options: [
      {
        optionId: 'battery-D-1',
        text: 'Uma vez ao dia'
      },
      {
        optionId: 'battery-D-2',
        text: 'Duas ou no máximo três vezes ao dia'
      },
      {
        optionId: 'battery-D-3',
        text: 'Várias vezes ao dia'
      }
    ]
  },
  {
    questionId: 'battery-E',
    question: 'Você percebe algum inchaço na parte traseira do celular?',
    options: [
      {
        optionId: 'battery-E-1',
        text: 'Sim'
      },
      {
        optionId: 'battery-E-2',
        text: 'Não'
      },
      {
        optionId: 'battery-E-3',
        text: 'Não sei'
      }
    ]
  },
  {
    questionId: 'battery-F',
    question: 'O celular está esquentando mais do que o normal?',
    options: [
      {
        optionId: 'battery-F-1',
        text: 'Sim'
      },
      {
        optionId: 'battery-F-2',
        text: 'Não'
      },
      {
        optionId: 'battery-F-3',
        text: 'Não sei'
      }
    ]
  }
]

export const displayQuestions = [
  {
    questionId: 'display-A',
    question: 'Qual é o defeito da tela?',
    options: [
      {
        optionId: 'display-A-1',
        text: 'A tela está quebrada ou trincada'
      },
      {
        optionId: 'display-A-2',
        text: 'O touch screen não está funcionando corretamente'
      },
      {
        optionId: 'display-A-3',
        text: 'Há manchas ou linhas na tela'
      },
      {
        optionId: 'display-A-4',
        text: 'A tela está preta ou não liga'
      }
    ]
  },
  {
    questionId: 'display-B',
    question: 'Quando o problema começou?',
    options: [
      {
        optionId: 'display-B-1',
        text: 'Hoje'
      },
      {
        optionId: 'display-B-2',
        text: 'Menos de uma semana'
      },
      {
        optionId: 'display-B-3',
        text: 'Há mais de uma semana'
      }
    ]
  },
  {
    questionId: 'display-C',
    question: 'A tela tem algum problema no brilho ou cor?',
    options: [
      {
        optionId: 'display-C-1',
        text: 'Sim'
      },
      {
        optionId: 'display-C-2',
        text: 'Não'
      },
      {
        optionId: 'display-C-3',
        text: 'Não sei'
      }
    ]
  },
  {
    questionId: 'display-D',
    question: 'A tela está ligando?',
    options: [
      {
        optionId: 'display-D-1',
        text: 'Sim'
      },
      {
        optionId: 'display-D-2',
        text: 'Não'
      }
    ]
  },
  {
    questionId: 'display-E',
    question: 'A tela do celular já foi trocada anteriormente?',
    options: [
      {
        optionId: 'display-E-1',
        text: 'Sim'
      },
      {
        optionId: 'display-E-2',
        text: 'Não'
      },
      {
        optionId: 'display-E-3',
        text: 'Não sei'
      }
    ]
  },
  {
    questionId: 'display-F',
    question: 'Se houve troca, a nova tela é original?',
    options: [
      {
        optionId: 'display-F-1',
        text: 'Sim'
      },
      {
        optionId: 'display-F-2',
        text: 'Não'
      },
      {
        optionId: 'display-F-3',
        text: 'Não sei'
      }
    ]
  },
]

export type PhoneQuestionsType = {
  questionId: 'brand' | 'model' | 'previousRepair' | 'originalHardware' | 'usageTime',
  question: string, options: { optionId: string, text: string }[]
}[]

export const phoneQuestions: PhoneQuestionsType = [
  {
    questionId: 'brand',
    question: 'Qual a marca do celular?',
    options: [
      {
        optionId: 'apple',
        text: 'Apple'
      },
      {
        optionId: 'samsung',
        text: 'Samsung'
      },
      {
        optionId: 'xiaomi',
        text: 'Xiaomi'
      },
      {
        optionId: 'motorola',
        text: 'Motorola'
      },
    ]
  },
  {
    questionId: 'model',
    question: 'Modelo',
    options: []
  },
  {
    questionId: 'previousRepair',
    question: 'O aparelho já teve algum tipo de conserto?',
    options: [
      {
        optionId: 'yes',
        text: 'Sim'
      },
      {
        optionId: 'no',
        text: 'Não'
      },
      {
        optionId: 'dontknow',
        text: 'Não sei'
      }
    ]
  },
  {
    questionId: 'originalHardware',
    question: 'O aparelho possui apenas peças originais?',
    options: [
      {
        optionId: 'yes',
        text: 'Sim'
      },
      {
        optionId: 'no',
        text: 'Não'
      },
      {
        optionId: 'dontknow',
        text: 'Não sei'
      }
    ]
  },
  {
    questionId: 'usageTime',
    question: 'Tempo de uso do aparelho',
    options: [
      {
        optionId: 'lessThanOneMounth',
        text: 'Menos de 1 mês'
      },
      {
        optionId: 'betweenOneAndElevenMounths',
        text: 'Entre 1 a 11 meses'
      },
      {
        optionId: 'betweenOneAndTwoYears',
        text: 'Entre 1 a 2 anos'
      },
      {
        optionId: 'moreThanTwoYears',
        text: 'Mais de 2 anos'
      }
    ]
  },
]

export const avaliableTopics: ProblemTopicType[] = ['battery', 'display']

export const finalQuestions = [
  {
    questionId: 'timePreference',
    question: 'Qual a preferência para o prazo de entrega do serviço?',
    options: [
      {
        optionId: 'urgent',
        text: 'Urgente'
      },
      {
        optionId: 'twoOr5days',
        text: 'De 2 a 5 dias'
      },
      {
        optionId: 'moreThan1week',
        text: 'Mais de 1 semana'
      },
      {
        optionId: 'normal',
        text: 'Sem prazo'
      },
    ]
  },
  {
    questionId: 'deliveryPreference',
    question: 'Possui prioridade por lojas que buscam o aparelho em seu local?',
    options: [
      {
        optionId: 'yes',
        text: 'Sim'
      },
      {
        optionId: 'noPriority',
        text: 'Não é prioridade'
      },

    ]
  },
  {
    questionId: 'details',
    question: 'Detalhes ou considerações importantes',
    options: []
  }
]

export const appleModels = [
  'iPhone 7',
  'iPhone 7 Plus',
  'iPhone 8',
  'iPhone 8 Plus',
  'iPhone X',
  'iPhone XR',
  'iPhone XS',
  'iPhone XS Max',
  'iPhone 11',
  'iPhone 11 Pro',
  'iPhone 11 Pro Max',
  'iPhone SE (2ª geração)',
  'iPhone 12',
  'iPhone 12 mini',
  'iPhone 12 Pro',
  'iPhone 12 Pro Max',
  'iPhone 13',
  'iPhone 13 mini',
  'iPhone 13 Pro',
  'iPhone 13 Pro Max',
  'iPhone SE (3ª geração)',
  'iPhone 14',
  'iPhone 14 Plus',
  'iPhone 14 Pro',
  'iPhone 14 Pro Max',
  'iPhone 15',
  'iPhone 15 Plus',
  'iPhone 15 Pro',
  'iPhone 15 Pro Max',
  'iPhone 16',
  'iPhone 16 Plus',
  'iPhone 16 Pro',
  'iPhone 16 Pro Max'
]

export const samsungModels = [
  "Galaxy S9", "Galaxy S9+", "Galaxy Note 9", "Galaxy A6", "Galaxy A6+", "Galaxy A7 (2018)",
  "Galaxy A8 (2018)", "Galaxy A8+ (2018)", "Galaxy A9 (2018)", "Galaxy J4", "Galaxy J4+",
  "Galaxy J6", "Galaxy J6+", "Galaxy J8", "Galaxy S10e", "Galaxy S10", "Galaxy S10+",
  "Galaxy S10 5G", "Galaxy Note 10", "Galaxy Note 10+", "Galaxy A10", "Galaxy A20",
  "Galaxy A30", "Galaxy A40", "Galaxy A50", "Galaxy A60", "Galaxy A70", "Galaxy A80",
  "Galaxy A90 5G", "Galaxy M10", "Galaxy M20", "Galaxy M30", "Galaxy Fold", "Galaxy S20",
  "Galaxy S20+", "Galaxy S20 Ultra", "Galaxy Note 20", "Galaxy Note 20 Ultra", "Galaxy Z Flip",
  "Galaxy Z Fold 2", "Galaxy A01", "Galaxy A11", "Galaxy A21", "Galaxy A31", "Galaxy A41",
  "Galaxy A51", "Galaxy A71", "Galaxy M11", "Galaxy M21", "Galaxy M31", "Galaxy M51", "Galaxy S21",
  "Galaxy S21+", "Galaxy S21 Ultra", "Galaxy Z Flip 3", "Galaxy Z Fold 3", "Galaxy A12",
  "Galaxy A22", "Galaxy A32", "Galaxy A42", "Galaxy A52", "Galaxy A72", "Galaxy M12", "Galaxy M22",
  "Galaxy M32", "Galaxy M52", "Galaxy S22", "Galaxy S22+", "Galaxy S22 Ultra", "Galaxy Z Flip 4",
  "Galaxy Z Fold 4", "Galaxy A13", "Galaxy A23", "Galaxy A33", "Galaxy A53", "Galaxy A73", "Galaxy M13",
  "Galaxy M23", "Galaxy M33", "Galaxy M53", "Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra",
  "Galaxy Z Flip 5", "Galaxy Z Fold 5", "Galaxy A14", "Galaxy A24", "Galaxy A34", "Galaxy A54",
  "Galaxy A74", "Galaxy M14", "Galaxy M24", "Galaxy M34", "Galaxy M54", "Galaxy S24", "Galaxy S24+",
  "Galaxy S24 Ultra", "Galaxy Z Flip 6", "Galaxy Z Fold 6", "Galaxy A15", "Galaxy A25", "Galaxy A35",
  "Galaxy A55", "Galaxy A75", "Galaxy M15", "Galaxy M25", "Galaxy M35", "Galaxy M55", "Galaxy S25",
  "Galaxy S25+", "Galaxy S25 Ultra"
]

export const xiaomiModels = [
  "Mi 10 5G", "Mi 10 Lite 5G", "Mi 10 Pro 5G", "Mi 10 Ultra", "Mi 10 Youth 5G",
  "Mi 10T 5G", "Mi 10T Lite 5G", "Mi 10T Pro 5G", "Mi 11", "Mi Note 10 Lite",
  "Poco C3", "Poco F2 Pro", "Poco M2", "Poco M2 Pro", "Poco M3", "Poco X2",
  "Poco X3", "Poco X3 NFC", "Redmi 10X 4G", "Redmi 10X 5G", "Redmi 10X Pro 5G",
  "Redmi 9", "Redmi 9A", "Redmi 9AT", "Redmi 9C", "Redmi K30 5G Racing", "Redmi K30 Pro",
  "Redmi K30 Pro Zoom", "Redmi K30 Ultra", "Redmi K30i 5G", "Redmi K30S", "Redmi Note 9",
  "Redmi Note 9 4G", "Redmi Note 9 5G", "Redmi Note 9 Pro", "Redmi Note 9 Pro 5G",
  "Redmi Note 9 Pro Max", "Redmi Note 9S", "2021", "Mi 11 Lite 4G", "Mi 11 Lite 5G",
  "Mi 11 Pro", "Mi 11 Ultra", "Mi 11i", "Mi 11X", "Mi 11X Pro", "Mi Mix Fold", "Mix 4",
  "Poco C31", "Poco F3", "Poco F3 GT", "Poco M2 Reloaded", "Poco M3 Pro", "Poco M3 Pro 5G",
  "Poco M4 Pro 5G", "Poco X3 GT", "Poco X3 Pro", "Redmi 10", "Redmi 10 Prime", "Redmi 9 Activ",
  "Redmi 9A Sport", "Redmi 9i Sport", "Redmi 9T", "Redmi K40", "Redmi K40 Gaming",
  "Redmi K40 Pro", "Redmi K40 Pro+", "Redmi Note 10", "Redmi Note 10 5G", "Redmi Note 10 Lite",
  "Redmi Note 10 Pro", "Redmi Note 10 Pro Max", "Redmi Note 10S", "Redmi Note 10T 5G",
  "Redmi Note 11 4G", "Redmi Note 11 5G", "Redmi Note 11 Pro 5G", "Redmi Note 11 Pro+ 5G",
  "Redmi Note 11T 5G", "Redmi Note 8 2021", "Redmi Note 9T 5G", "2022", "12", "12 Lite",
  "12 Lite NE", "12 Pro", "12 Pro (Dimensity)", "12 Ultra", "12S", "12S Pro", "12S Ultra",
  "12T", "12T Pro", "13", "13 Lite", "13 Pro", "Poco C40", "Poco F4", "Poco F4 GT", "Poco M4 5G",
  "Poco M4 Pro", "Poco M5", "Poco M5s", "Poco X4 GT", "Poco X4 NFC", "Poco X4 Pro 5G", "Redmi 10 (India)",
  "Redmi 10 2022", "Redmi 10 5G", "Redmi 10 Power", "Redmi 10 Prime 2022", "Redmi 10A", "Redmi 10C",
  "Redmi 11", "Redmi 11 Prime 4G", "Redmi 11 Prime 5G", "Redmi 11A", "Redmi 12C", "Redmi K50", "Redmi K50 Gaming",
  "Redmi K50 Pro", "Redmi K50 Ultra", "Redmi K50i", "Redmi K60", "Redmi K60 Pro", "Redmi K60E", "Redmi Note 11 4G",
  "Redmi Note 11 Pro 4G", "Redmi Note 11 Pro 5G", "Redmi Note 11 Pro+ 5G", "Redmi Note 11 SE", "Redmi Note 11E",
  "Redmi Note 11E Pro", "Redmi Note 11R", "Redmi Note 11S", "Redmi Note 11S 5G", "Redmi Note 11SE", "Redmi Note 11T Pro",
  "Redmi Note 11T Pro+", "Redmi Note 12", "Redmi Note 12 Explorer", "Redmi Note 12 Pro 5G", "Redmi Note 12 Pro Speed",
  "Redmi Note 12 Pro+", "2023", "13 Ultra", "13T", "13T Pro", "14", "14 Pro", "Civi 3", "Mix Fold 3", "Poco C50",
  "Poco C51", "Poco C55", "Poco C65", "Poco F5", "Poco F5 Pro", "Poco M6", "Poco M6 Pro 5G", "Poco X5", "Poco X5 Pro",
  "Redmi 12 4G", "Redmi 12 5G", "Redmi 13C 4G", "Redmi 13C 5G", "Redmi 13R", "Redmi A2", "Redmi A2+", "Redmi K60 Ultra",
  "Redmi K70", "Redmi K70 Pro", "Redmi K70E", "Redmi Note 12 4G", "Redmi Note 12 Pro 4G", "Redmi Note 12 Pro 5G"
]

export function getQuestionsByTopic(topic: string) {
  if (topic === 'battery') return batteryQuestions
  if (topic === 'display') return displayQuestions
  if (topic === 'glass') return glassQuestions
  return displayQuestions
}

export function getTopicFormatted(topic: string) {
  if (topic === 'battery') return 'Bateria'
  if (topic === 'display') return 'Tela'
  if (topic === 'glass') return 'Vidro do celular'
}

type DisplayFormType = {
  'display-A': 'display-A-1' | 'display-A-2' | 'display-A-3' | 'display-A-4'
  'display-B': 'display-B-1' | 'display-B-2' | 'display-B-3'
  'display-C': 'display-C-1' | 'display-C-2' | 'display-C-3'
  'display-D': 'display-D-1' | 'display-D-2' | 'display-D-3'
  'display-E': 'display-E-1' | 'display-E-2' | 'display-E-3'
  'display-F': 'display-F-1' | 'display-F-2' | 'display-F-3'
}

export type BatteryFormType = {
  "battery-A": "battery-A-1" | "battery-A-2" | "battery-A-3" | "battery-A-4"
  "battery-B": "battery-B-1" | "battery-B-2" | "battery-B-3"
  "battery-C": "battery-C-1" | "battery-C-2" | "battery-C-3"
  "battery-D": "battery-D-1" | "battery-D-2" | "battery-D-3"
  "battery-E": "battery-E-1" | "battery-E-2" | "battery-E-3"
  "battery-F": "battery-F-1" | "battery-F-2" | "battery-F-3"
}

export type GlassFormType = {
  "glass-A": "glass-A-1" | "glass-A-2" | "glass-A-3"
  "glass-B": "glass-B-1" | "glass-B-2" | "glass-B-3"
  "glass-C": "glass-C-1" | "glass-C-2"
  "glass-D": "glass-D-1" | "glass-D-2"
  "glass-E": "glass-E-1" | "glass-E-2" | "glass-E-3"
  "glass-F": "glass-F-1" | "glass-F-2" | "glass-F-3"
}

export function getStepTwoAnswersByForm(topic: string, questionsObj: DisplayFormType | BatteryFormType | GlassFormType) {
  if (questionsObj) {
    if (topic === 'battery' && 'battery-A' in questionsObj) {
      const answersFormated = [
        {
          question: batteryQuestions[0].question,
          answer: (batteryQuestions[0].options.filter((option) => option.optionId === questionsObj['battery-A']))[0].text
        },
        {
          question: batteryQuestions[1].question,
          answer: (batteryQuestions[1].options.filter((option) => option.optionId === questionsObj['battery-B']))[0].text
        },
        {
          question: batteryQuestions[2].question,
          answer: (batteryQuestions[2].options.filter((option) => option.optionId === questionsObj['battery-C']))[0].text
        },
        {
          question: batteryQuestions[3].question,
          answer: (batteryQuestions[3].options.filter((option) => option.optionId === questionsObj['battery-D']))[0].text
        },
        {
          question: batteryQuestions[4].question,
          answer: (batteryQuestions[4].options.filter((option) => option.optionId === questionsObj['battery-E']))[0].text
        },
        {
          question: batteryQuestions[5].question,
          answer: (batteryQuestions[5].options.filter((option) => option.optionId === questionsObj['battery-F']))[0].text
        }
      ]
      return answersFormated
    }
    if (topic === 'display' && 'display-A' in questionsObj) {
      const answersFormated = [
        {
          question: displayQuestions[0].question,
          answer: (displayQuestions[0].options.filter((option) => option.optionId === questionsObj['display-A']))[0].text
        },
        {
          question: displayQuestions[1].question,
          answer: (displayQuestions[1].options.filter((option) => option.optionId === questionsObj['display-B']))[0].text
        },
        {
          question: displayQuestions[2].question,
          answer: (displayQuestions[2].options.filter((option) => option.optionId === questionsObj['display-C']))[0].text
        },
        {
          question: displayQuestions[3].question,
          answer: (displayQuestions[3].options.filter((option) => option.optionId === questionsObj['display-D']))[0].text
        },
        {
          question: displayQuestions[4].question,
          answer: (displayQuestions[4].options.filter((option) => option.optionId === questionsObj['display-E']))[0].text
        },
        {
          question: displayQuestions[5].question,
          answer: questionsObj['display-F'] ? (displayQuestions[5].options.filter((option) => option.optionId === questionsObj['display-F']))[0].text : ''
        }
      ]
      return answersFormated
    }
    if (topic === 'glass' && 'glass-A' in questionsObj) {
      const answersFormated = [
        {
          question: glassQuestions[0].question,
          answer: (glassQuestions[0].options.filter((option) => option.optionId === questionsObj['glass-A']))[0].text
        },
        {
          question: glassQuestions[1].question,
          answer: (glassQuestions[1].options.filter((option) => option.optionId === questionsObj['glass-B']))[0].text
        },
        {
          question: glassQuestions[2].question,
          answer: (glassQuestions[2].options.filter((option) => option.optionId === questionsObj['glass-C']))[0].text
        },
        {
          question: glassQuestions[3].question,
          answer: (glassQuestions[3].options.filter((option) => option.optionId === questionsObj['glass-D']))[0].text
        },
        {
          question: glassQuestions[4].question,
          answer: (glassQuestions[4].options.filter((option) => option.optionId === questionsObj['glass-E']))[0].text
        },
        {
          question: glassQuestions[5].question,
          answer: (glassQuestions[5].options.filter((option) => option.optionId === questionsObj['glass-F']))[0].text
        }
      ]
      return answersFormated
    }
  }
  return []
}
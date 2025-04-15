import { ProblemTopicType } from "../types/solicitation";
import { batteryImg, brokenScreenImg, glass, water, cam, connectors, button } from "./images";

export const services: { topicImg: string, topicName: string, topicId: ProblemTopicType }[] = [
  {
    topicImg: batteryImg,
    topicName: 'Troca de Baterias',
    topicId: 'battery'
  },
  {
    topicImg: brokenScreenImg,
    topicName: 'Troca de Tela',
    topicId: 'display'
  },
  {
    topicImg: glass,
    topicName: 'Vidro do celular',
    topicId: 'glass'
  },
  {
    topicImg: water,
    topicName: 'Contato com Água/Líquido',
    topicId: 'water'
  },
  {
    topicImg: connectors,
    topicName: 'Entradas e áudio',
    topicId: 'connectors'
  },
  {
    topicImg: cam,
    topicName: 'Câmera',
    topicId: 'cam'
  },
  {
    topicImg: button,
    topicName: 'Defeitos em botões',
    topicId: 'button'
  },

]
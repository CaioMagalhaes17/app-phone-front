import { CANCELED_SOLICITATION_STATUS, DIRECT_SOLICITATION, OPEN_TO_BUDGETS_SOLICITATION_STATUS } from "../constants/solicitation-status";
import { PhoneBrandType, ProblemTopicType, Solicitation, SolicitationFormProps, SolicitationsFromApi } from "../types/solicitation";
import { formatClientProfile } from "./client-profile";

export function formatSolicitations(solicitations: SolicitationsFromApi[]): Solicitation[] {
  return solicitations.map((solicitation) => formatSolicitation(solicitation));
}

export function formatSolicitation(solicitation: SolicitationsFromApi): Solicitation {
  return {
    id: solicitation._id,
    createdAt: solicitation.props.createdAt,
    updatedAt: solicitation.props.updatedAt,
    status: solicitation.props.status,
    form: formatSolicitationForm(solicitation.props.form),
    clientProfile: formatClientProfile(solicitation.props.clientProfile),
  }
}

export function formatSolicitationForm(form: {
  props: SolicitationFormProps & { createdAt: string, updatedAt: string },
  _id: string
}): SolicitationFormProps {
  return {
    id: form._id,
    createdAt: form.props.createdAt,
    updatedAt: form.props.updatedAt,
    problemTopic: form.props.problemTopic,
    problemForm: form.props.problemForm,
    phoneForm: form.props.phoneForm,
    deliveryPreference: form.props.deliveryPreference,
    timePreference: form.props.timePreference,
    details: form.props.details,
  }
}

export function formatPhoneBrand(brand: PhoneBrandType) {
  if (brand === 'samsung') return 'Samsung'
  if (brand === 'apple') return 'Apple'
  if (brand === 'xiaomi') return 'Xiaomi'
}

export function formatTopic(topic: ProblemTopicType) {
  if (topic === 'battery') return 'Bateria'
  if (topic === 'display') return 'Tela'
}

export function getStatusColor(status: string) {
  if (status === OPEN_TO_BUDGETS_SOLICITATION_STATUS) return 'success'
  if (status === CANCELED_SOLICITATION_STATUS) return 'danger'
  if (status === DIRECT_SOLICITATION) return 'warning'
}

export function formatOriginalHardwareAnswer(originalHardware: string) {
  if (originalHardware === 'yes') return 'Sim'
  if (originalHardware === 'no') return 'Não'
  if (originalHardware === 'dontknow') return 'Não sei'
}

export function formatPreviousRepair(previousRepair: string) {
  if (previousRepair === 'yes') return 'Sim'
  if (previousRepair === 'no') return 'Não'
  if (previousRepair === 'dontknow') return 'Não sei'

}

export function formatUsageTime(usageTime: string) {
  if (usageTime === 'betweenOneAndTwoYears') return 'Entre 1 a 2 anos'
  if (usageTime === 'moreThanTwoYears') return 'Mais de 2 anos'
  if (usageTime === 'lessThanOneMounth') return 'Menos de 1 mês'
  if (usageTime === 'betweenOneAndElevenMounths') return 'Entre 1 a 11 meses'
}

export function getAnswerColor(answer: string) {
  if (answer === 'yes' || answer === 'Sim') return 'success'
  if (answer === 'no' || answer === 'Não') return 'danger'
  if (answer === 'dontknow' || answer === 'Não sei') return 'warning'
  return 'white'
}

export function getTimePreferenceColor(timePreference: string) {
  if (timePreference === 'urgent') return 'danger'
  if (timePreference === 'normal') return 'success'
}

export function formatTimePreference(timePreference: string) {
  if (timePreference === 'urgent') return 'Urgente'
  if (timePreference === 'normal') return 'Normal'

}

export function formatDeliveryPreference(deliveryPreference: string) {
  if (deliveryPreference === 'yes') return 'Sim'
  if (deliveryPreference === 'noPriority') return 'Não é prioridade'
}

export function getDeliveryPreferenceColor(deliveryPreference: string) {
  if (deliveryPreference === 'yes') return 'success'
  if (deliveryPreference === 'noPriority') return 'warning'
}
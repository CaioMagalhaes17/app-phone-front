import { ProblemTopicType, Solicitation, SolicitationFormProps, SolicitationsFromApi } from "../types/solicitation";
import { formatClientProfile } from "./client-profile";

export function formatSolicitations(solicitations: SolicitationsFromApi[]): Solicitation[] {
  return solicitations.map(({ _id, props }) => ({
    id: _id,
    createdAt: props.createdAt,
    updatedAt: props.updatedAt,
    status: props.status,
    form: formatSolicitationForm(props.form),
    clientProfile: formatClientProfile(props.clientProfile),
  }));
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

export function formatPhoneBrand(brand: string) {
  if (brand === 'samsung') return 'Samsung'
  if (brand === 'apple') return 'Apple'
}

export function formatTopic(topic: ProblemTopicType) {
  if (topic === 'battery') return 'Bateria'
  if (topic === 'display') return 'Tela'
}

export function getStatusColor(status: string) {
  if (status === 'EM ANÁLISE PELA LOJA') return 'warning'
}
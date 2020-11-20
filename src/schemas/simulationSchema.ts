import * as Yup from 'yup';

export default Yup.object().shape({
  planSlug: Yup.string().required('Plano é obrigatório'),
  origin: Yup.string().required('Origem é obrigatória'),
  destination: Yup.string().required('Destino é obrigatório'),
  duration: Yup.number()
    .positive('Duração deve ser um número positivo')
    .typeError('Duração é obrigatória')
    .required('Duração é obrigatória'),
});
